import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Package } from "lucide-react";

export const Route = createFileRoute("/account/orders")({
  component: CustomerOrders,
});

function CustomerOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSessionAndFetch();
  }, []);

  async function checkSessionAndFetch() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate({ to: "/login" });
      return;
    }

    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          quantity,
          price_at_purchase,
          products ( title, code )
        )
      `)
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-24 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-black tracking-tight">My Orders</h1>
          <div className="flex gap-4">
            <Link to="/" className="text-white/50 hover:text-white transition">Back to Store</Link>
            <button onClick={handleLogout} className="text-gold hover:text-gold-hover transition">Log Out</button>
          </div>
        </div>

        {loading ? (
          <p className="text-white/50">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
            <Package size={48} className="mx-auto text-white/20 mb-4" />
            <h2 className="text-xl font-bold mb-2">No orders yet</h2>
            <p className="text-white/50 mb-6">You haven't placed any orders with us.</p>
            <Link to="/" className="inline-flex h-12 px-6 items-center bg-gold text-[#0A0A0A] font-bold rounded-md uppercase tracking-widest text-sm hover:bg-gold-hover transition">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex flex-wrap gap-6 items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Order Number</p>
                    <p className="font-mono text-white/90">{order.id.split('-')[0]}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Date</p>
                    <p className="text-white/90">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Total</p>
                    <p className="text-gold font-bold">${order.total_amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-widest font-bold ${
                      order.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                      order.status === 'delivered' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-white/10 text-white/60'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Items</p>
                  {order.order_items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center bg-black/40 px-4 py-3 rounded-lg border border-white/5">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs font-bold">{item.quantity}x</span>
                        <span className="text-white/80">{item.products?.title || item.products?.code || 'Product'}</span>
                      </div>
                      <span className="text-white/60">${item.price_at_purchase.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
