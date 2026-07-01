import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User, MapPin, Phone, Mail, Package, CreditCard, CheckCircle2, Truck, Clock } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate({ from: "/profile" });
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  
  // Edit states
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [shippingRates, setShippingRates] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate({ to: "/checkout" });
        return;
      }

      const userId = session.user.id;

      // Load Profile
      const { data: profData } = await supabase.from("profiles").select("*").eq("id", userId).single();
      if (profData) {
        setProfile(profData);
        setEditName(profData.full_name || "");
        setEditPhone(profData.phone || "");
        setEditCity(profData.city || "");
        setEditAddress(profData.delivery_address || "");
      }

      // Load Orders and Items
      const { data: ordersData } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            quantity,
            price_at_purchase,
            products (
              title,
              image_url
            )
          )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (ordersData) {
        setOrders(ordersData);
      }

      // Load Shipping Rates for Edit City Dropdown
      const { data: rates } = await supabase.from("shipping_rates").select("*");
      if (rates) setShippingRates(rates);

      setLoading(false);
    }

    loadData();
  }, [navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    setLoading(true);
    const { error } = await supabase.from("profiles").update({
      full_name: editName,
      phone: editPhone,
      city: editCity,
      delivery_address: editAddress
    }).eq("id", profile.id);

    if (!error) {
      setProfile({
        ...profile,
        full_name: editName,
        phone: editPhone,
        city: editCity,
        delivery_address: editAddress
      });
      setEditing(false);
    } else {
      alert("Failed to update profile");
    }
    setLoading(false);
  };

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'pending':
        return { label: 'Order Received', icon: <Clock size={16} />, color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
      case 'paid':
        return { label: 'Payment Confirmed', icon: <CreditCard size={16} />, color: 'text-blue-500', bg: 'bg-blue-500/10' };
      case 'shipped':
        return { label: 'Shipped', icon: <Truck size={16} />, color: 'text-purple-500', bg: 'bg-purple-500/10' };
      case 'delivered':
        return { label: 'Delivered', icon: <CheckCircle2 size={16} />, color: 'text-green-500', bg: 'bg-green-500/10' };
      case 'cancelled':
        return { label: 'Cancelled', icon: <X size={16} />, color: 'text-red-500', bg: 'bg-red-500/10' };
      default:
        return { label: status, icon: <Package size={16} />, color: 'text-white/50', bg: 'bg-white/5' };
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-forest-deep flex items-center justify-center text-gold font-bold">Loading Profile...</div>;
  }

  return (
    <div className="min-h-screen bg-forest-deep text-white py-24 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
        
        {/* Left Column: Personal Information */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sticky top-24">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2"><User className="text-gold" /> My Profile</h2>
              {!editing && (
                <button onClick={() => setEditing(true)} className="text-xs text-white/50 hover:text-gold uppercase tracking-widest font-bold transition">
                  Edit
                </button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-white/50 text-xs tracking-widest uppercase mb-1">Full Name</label>
                  <input required value={editName} onChange={e => setEditName(e.target.value)} className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-gold transition" />
                </div>
                <div>
                  <label className="block text-white/50 text-xs tracking-widest uppercase mb-1">Phone</label>
                  <input required value={editPhone} onChange={e => setEditPhone(e.target.value)} type="tel" className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-gold transition" />
                </div>
                <div>
                  <label className="block text-white/50 text-xs tracking-widest uppercase mb-1">City</label>
                  <select required value={editCity} onChange={e => setEditCity(e.target.value)} className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-gold transition">
                    {shippingRates.map(r => (
                      <option key={r.id} value={r.city} className="bg-forest-deep">{r.city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/50 text-xs tracking-widest uppercase mb-1">Delivery Address</label>
                  <input required value={editAddress} onChange={e => setEditAddress(e.target.value)} className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-gold transition" />
                </div>
                <div className="flex gap-2 pt-4">
                  <button type="submit" className="flex-1 bg-gold text-[#0A0A0A] font-bold py-2 rounded transition hover:bg-gold-hover">Save</button>
                  <button type="button" onClick={() => setEditing(false)} className="flex-1 bg-white/10 text-white font-bold py-2 rounded transition hover:bg-white/20">Cancel</button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-white/50">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 tracking-widest uppercase mb-1">Full Name</p>
                    <p className="font-bold text-lg">{profile?.full_name || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-white/50">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 tracking-widest uppercase mb-1">Email Address</p>
                    <p className="font-medium text-white/90">{profile?.email || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-white/50">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 tracking-widest uppercase mb-1">Phone Number</p>
                    <p className="font-medium text-white/90">{profile?.phone || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-white/50">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 tracking-widest uppercase mb-1">Delivery Details</p>
                    <p className="font-medium text-white/90">{profile?.delivery_address || "No address"}</p>
                    <p className="text-white/50 text-sm">{profile?.city || "No city"}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-10 pt-6 border-t border-white/10">
              <button 
                onClick={() => {
                  supabase.auth.signOut();
                  navigate({ to: "/" });
                }} 
                className="text-red-400 hover:text-red-300 text-sm font-bold uppercase tracking-widest transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Order History & Tracking */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
            <Package className="text-gold" size={32} /> My Orders
          </h1>

          {orders.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <Package size={48} className="mx-auto text-white/20 mb-4" />
              <h3 className="text-xl font-bold mb-2">No orders yet</h3>
              <p className="text-white/50 mb-6">You haven't placed any orders. Start shopping to see them here.</p>
              <button onClick={() => navigate({ to: "/#shop" })} className="bg-gold text-[#0A0A0A] px-8 py-3 rounded font-bold uppercase tracking-widest hover:bg-gold-hover transition">
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const status = getStatusDisplay(order.status);
                const orderDate = new Date(order.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });

                return (
                  <div key={order.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition hover:border-white/20">
                    {/* Order Header */}
                    <div className="bg-black/30 p-6 flex flex-wrap justify-between items-center gap-4 border-b border-white/10">
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Order Date</p>
                        <p className="font-bold">{orderDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Total Amount</p>
                        <p className="font-bold text-gold">₦{order.total_amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Order ID</p>
                        <p className="font-mono text-sm text-white/70">{order.id.split('-')[0]}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${status.bg} ${status.color} font-bold text-sm tracking-wide`}>
                        {status.icon}
                        {status.label}
                      </div>
                    </div>
                    
                    {/* Order Items */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {order.order_items?.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-black rounded border border-white/10 overflow-hidden flex-shrink-0">
                              {item.products?.image_url ? (
                                <img src={item.products.image_url} alt={item.products.title} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/20">
                                  <Package size={24} />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-white/90">{item.products?.title || 'Unknown Product'}</h4>
                              <p className="text-white/50 text-sm">Qty: {item.quantity}</p>
                            </div>
                            <div className="font-semibold">
                              ₦{(item.price_at_purchase * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
