import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ShoppingBag, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminAnalytics,
});

function AdminAnalytics() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrder: 0,
    recentOrders: [] as any[],
  });

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true);
      
      const { data: orders, error } = await supabase
        .from("orders")
        .select(`
          id,
          total_amount,
          status,
          created_at,
          profiles:user_id ( full_name )
        `)
        .order("created_at", { ascending: false });

      if (!error && orders) {
        // Filter only successful orders (paid, shipped, delivered)
        const successfulOrders = orders.filter(
          o => o.status === "paid" || o.status === "shipped" || o.status === "delivered"
        );
        
        const totalRev = successfulOrders.reduce((sum, order) => sum + order.total_amount, 0);
        const orderCount = successfulOrders.length;
        const avg = orderCount > 0 ? totalRev / orderCount : 0;
        
        setStats({
          totalRevenue: totalRev,
          totalOrders: orderCount,
          averageOrder: avg,
          recentOrders: orders.slice(0, 5), // show 5 most recent overall
        });
      }
      
      setLoading(false);
    }
    
    fetchAnalytics();
  }, []);

  if (loading) {
    return <p className="text-white/50 animate-pulse">Calculating metrics...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Store Analytics</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Total Revenue</p>
            <p className="text-3xl font-black text-gold">₦{stats.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
            <span className="text-2xl font-sans font-bold">₦</span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Total Orders</p>
            <p className="text-3xl font-black text-white">{stats.totalOrders}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
            <ShoppingBag size={24} />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Average Order Value</p>
            <p className="text-3xl font-black text-white">₦{stats.averageOrder.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          {stats.recentOrders.length === 0 ? (
            <p className="p-6 text-white/50">No activity yet.</p>
          ) : (
            <div className="divide-y divide-white/5">
              {stats.recentOrders.map(order => (
                <div key={order.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-white/10 text-white/50">
                      <Users size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white">
                        {order.profiles?.full_name || 'Guest User'}
                      </p>
                      <p className="text-xs text-white/50">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gold">₦{order.total_amount.toLocaleString()}</p>
                    <span className={`text-[10px] uppercase tracking-widest font-bold ${
                      order.status === 'paid' ? 'text-green-400' :
                      order.status === 'cancelled' ? 'text-red-400' :
                      'text-blue-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
