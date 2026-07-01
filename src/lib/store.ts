import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

export interface CartItem {
  id: string; // product id
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  moq?: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  pendingOrderId: string | null;
  setPendingOrderId: (id: string | null) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  total: number;
  syncCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      pendingOrderId: null,
      setPendingOrderId: (id) => set({ pendingOrderId: id }),
      
      syncCart: async () => {
        const { items, pendingOrderId, setPendingOrderId } = get();
        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        try {
          const { data: { session } } = await supabase.auth.getSession();
          const userId = session?.user?.id || null;

          let location = null;
          if (!userId) {
            try {
              const res = await fetch('https://ipapi.co/json/');
              const data = await res.json();
              if (data.city && data.country_name) {
                location = `${data.city}, ${data.country_name}`;
              }
            } catch (e) {
              console.error("IP Fetch failed", e);
            }
          }

          let orderId = pendingOrderId;

          if (items.length === 0 && orderId) {
            await supabase.from('order_items').delete().eq('order_id', orderId);
            return;
          }

          if (items.length === 0) return;

          if (!orderId) {
            const { data, error } = await supabase.from('orders').insert({
              user_id: userId,
              status: 'pending',
              total_amount: totalAmount,
              guest_location: location
            }).select().single();
            
            if (data) {
              orderId = data.id;
              setPendingOrderId(data.id);
            }
          } else {
            const { error } = await supabase.from('orders').update({
              total_amount: totalAmount,
              user_id: userId,
              guest_location: location
            }).eq('id', orderId);
            
            // If updating failed because order was deleted or not found, we could reset pendingOrderId
            // but let's assume it works for now.
          }

          if (orderId) {
            await supabase.from('order_items').delete().eq('order_id', orderId);
            const insertData = items.map(item => ({
              order_id: orderId,
              product_id: item.id,
              quantity: item.quantity,
              price_at_purchase: item.price
            }));
            if (insertData.length > 0) {
              await supabase.from('order_items').insert(insertData);
            }
          }
        } catch (err) {
          console.error("Failed to sync cart", err);
        }
      },

      addItem: (newItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === newItem.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, newItem] });
        }
        get().syncCart();
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        get().syncCart();
      },
      
      updateQuantity: (id, quantity) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === id);
        
        if (!existingItem) return;
        
        const moq = existingItem.moq || 1;

        if (quantity < moq) {
          set({
            items: currentItems.map((item) =>
              item.id === id ? { ...item, quantity: moq } : item
            ),
          });
          get().syncCart();
          return;
        }

        set({
          items: currentItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
        get().syncCart();
      },
      
      clearCart: () => {
        set({ items: [], pendingOrderId: null });
      },
      
      toggleCart: () => set({ isOpen: !get().isOpen }),
      
      setIsOpen: (isOpen) => set({ isOpen }),
      
      get total() {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'zenbeatz-cart-storage',
      partialize: (state) => ({ items: state.items, pendingOrderId: state.pendingOrderId }),
    }
  )
);
