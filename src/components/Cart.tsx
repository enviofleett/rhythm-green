import { useCartStore } from "@/lib/store";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

export function Cart() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, total } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={toggleCart}
      />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-forest-deep shadow-2xl border-l border-white/10 flex flex-col animate-in slide-in-from-right">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-gold" />
            <h2 className="text-xl font-bold text-white">Your Cart</h2>
          </div>
          <button
            onClick={toggleCart}
            className="text-white/60 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-white/50 space-y-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="w-20 h-20 bg-black rounded-lg overflow-hidden shrink-0 border border-white/10">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-gold text-sm font-semibold">₦{item.price.toLocaleString()}</p>
                    {item.moq && item.moq > 1 && (
                      <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70 uppercase tracking-wider">
                        Min. {item.moq}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= (item.moq || 1)}
                      className="size-7 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/10"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-white text-sm w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="size-7 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-white/40 hover:text-red-400 transition"
                >
                  <X size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-white/[0.02]">
            <div className="flex items-center justify-between mb-6">
              <span className="text-white/70">Subtotal</span>
              <span className="text-white text-xl font-bold">₦{total.toLocaleString()}</span>
            </div>
            <p className="text-white/40 text-xs text-center mb-4">Shipping and taxes calculated at checkout.</p>
            <a
              href="/checkout"
              className="w-full h-14 rounded-md bg-gold text-[#0A0A0A] font-bold tracking-widest text-sm uppercase hover:bg-gold-hover transition shadow-gold flex items-center justify-center"
            >
              Proceed to Checkout
            </a>
          </div>
        )}
      </div>
    </>
  );
}
