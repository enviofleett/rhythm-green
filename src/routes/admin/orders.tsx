import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'confirmed' | 'pending'>('confirmed');

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        profiles:user_id ( full_name, email ),
        order_items ( quantity, price_at_purchase, products ( title ) )
      `)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  }

  async function updateStatus(orderId: string, status: string) {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);
    
    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    } else {
      alert("Failed to update status");
    }
  }

  const filteredOrders = orders.filter(o => 
    activeTab === 'pending' ? o.status === 'pending' : o.status !== 'pending'
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black">Manage Orders</h1>
        
        <div className="flex bg-white/5 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('confirmed')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeTab === 'confirmed' ? 'bg-gold text-black' : 'text-white/60 hover:text-white'}`}
          >
            Confirmed Orders
          </button>
          <button 
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeTab === 'pending' ? 'bg-gold text-black' : 'text-white/60 hover:text-white'}`}
          >
            Live Carts
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-white/50">Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-white/50">No {activeTab === 'pending' ? 'live carts' : 'confirmed orders'} found.</p>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 border-b border-white/10 text-white/50 uppercase tracking-wider text-xs">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition">
                  <td className="p-4 font-mono text-white/80">{order.id.split('-')[0]}</td>
                  <td className="p-4">
                    <p className="font-bold text-white">
                      {order.profiles?.full_name || 'Guest'}
                    </p>
                    {order.profiles?.email && (
                      <p className="text-xs text-white/50">{order.profiles.email}</p>
                    )}
                    {(order.guest_location || order.shipping_city) && (
                      <p className="text-xs text-gold mt-1">
                        📍 {order.guest_location || order.shipping_city}
                      </p>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      {order.order_items?.map((item: any, idx: number) => (
                        <div key={idx} className="text-xs text-white/70">
                          {item.quantity}x {item.products?.title || 'Unknown Product'}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-bold text-gold">₦{order.total_amount}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs uppercase tracking-widest font-bold ${
                      order.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                      order.status === 'delivered' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-white/10 text-white/60'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="bg-black border border-white/20 rounded px-2 py-1 text-sm outline-none focus:border-gold"
                      disabled={order.status === 'pending' && activeTab === 'pending'}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
