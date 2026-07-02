import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCartStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ShoppingBag, Tag, Check, X } from "lucide-react";
import { usePaystackPayment } from 'react-paystack';

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

function Checkout() {
  const { items, clearCart, pendingOrderId } = useCartStore();
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const total = mounted ? items.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;
  const navigate = useNavigate({ from: "/checkout" });
  
  if (!mounted) return null;
  
  const [shippingRates, setShippingRates] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [shippingFee, setShippingFee] = useState(0);
  
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  // Auth states
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authCity, setAuthCity] = useState("");
  const [authAddress, setAuthAddress] = useState("");

  const [isSignUp, setIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Discount states
  const [discountInput, setDiscountInput] = useState("");
  const [discountApplied, setDiscountApplied] = useState<any | null>(null);
  const [discountError, setDiscountError] = useState("");
  const [discountLoading, setDiscountLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function init() {
      // Fetch shipping rates first so they are available
      let fetchedRates: any[] = [];
      const { data: rateData } = await supabase.from("shipping_rates").select("*");
      if (rateData) {
        fetchedRates = rateData;
        setShippingRates(rateData);
        if (rateData.length > 0) {
          setSelectedCity(rateData[0].city);
          setShippingFee(rateData[0].fee);
          // Set default auth city to the first one available
          setAuthCity(rateData[0].city);
        }
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await loadUserProfile(session.user.id, session.user.email || "", fetchedRates);
      }
      setIsCheckingSession(false);
    }
    init();

    // Listen to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        await loadUserProfile(session.user.id, session.user.email || "", shippingRates);
      } else {
        setUserId(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadUserProfile(uid: string, userEmail: string, currentRates: any[]) {
    setUserId(uid);
    setEmail(userEmail);
    
    // Fetch from profiles
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', uid).single();
    if (profile) {
      if (profile.full_name) setName(profile.full_name);
      if (profile.phone) setPhone(profile.phone);
      if (profile.delivery_address) setAddress(profile.delivery_address);
      if (profile.city) {
        setSelectedCity(profile.city);
        const rate = currentRates.find((r: any) => r.city === profile.city);
        if (rate) setShippingFee(rate.fee);
      }
    }
  }

  useEffect(() => {
    if (!isCheckingSession && items.length === 0) {
      navigate({ to: "/" });
    }
  }, [items, navigate, isCheckingSession]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
          options: {
            data: {
              full_name: authName,
              phone: authPhone,
              city: authCity,
              delivery_address: authAddress
            }
          }
        });
        if (error) throw error;
        
        // Sometimes the trigger handles the profile insertion, but to be safe and immediate:
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData?.session?.user) {
          // Attempt to update the profile just in case the trigger didn't catch the extra fields
          await supabase.from('profiles').update({
            email: authEmail,
            full_name: authName,
            phone: authPhone,
            city: authCity,
            delivery_address: authAddress
          }).eq('id', sessionData.session.user.id);
        }
        alert("Sign up successful! Continuing to checkout...");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      alert(err.message || "Authentication failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
    const rate = shippingRates.find((r) => r.city === city);
    if (rate) setShippingFee(rate.fee);
  };

  const applyDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!discountInput.trim()) return;
    
    setDiscountLoading(true);
    setDiscountError("");
    
    try {
      const { data, error } = await supabase
        .from('discount_codes')
        .select('*')
        .ilike('code', discountInput.trim())
        .eq('is_active', true)
        .single();
        
      if (error || !data) {
        setDiscountError("Invalid or expired discount code");
        setDiscountApplied(null);
      } else {
        setDiscountApplied(data);
        setDiscountInput("");
      }
    } catch (err) {
      setDiscountError("Error verifying code");
    } finally {
      setDiscountLoading(false);
    }
  };

  const removeDiscount = () => {
    setDiscountApplied(null);
  };

  // Calculate totals
  let discountAmount = 0;
  if (discountApplied) {
    if (discountApplied.discount_type === 'percentage') {
      discountAmount = total * (discountApplied.discount_value / 100);
    } else {
      discountAmount = discountApplied.discount_value;
    }
  }

  // Ensure discount doesn't exceed total
  discountAmount = Math.min(discountAmount, total);
  
  const grandTotal = total - discountAmount + shippingFee;

  // Paystack config
  const paystackConfig = {
    reference: (new Date()).getTime().toString(),
    email: email,
    amount: grandTotal * 100, // amount in kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_placeholder',
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const onSuccess = async (reference: any) => {
    setLoading(true);
    try {
      let orderId = pendingOrderId;
      let orderError = null;

      if (orderId) {
        // Update existing pending order
        const { error } = await supabase.from('orders').update({
          status: 'paid',
          user_id: userId,
          total_amount: grandTotal,
          shipping_city: selectedCity,
          shipping_fee: shippingFee,
          shipping_address: address,
          stripe_session_id: reference?.reference || reference?.transaction || null,
          discount_code_id: discountApplied?.id || null,
        }).eq('id', orderId);
        orderError = error;
      } else {
        const { data: order, error } = await supabase.from('orders').insert({
          user_id: userId,
          status: 'paid',
          total_amount: grandTotal,
          shipping_city: selectedCity,
          shipping_fee: shippingFee,
          shipping_address: address,
          stripe_session_id: reference?.reference || reference?.transaction || null,
          discount_code_id: discountApplied?.id || null,
        }).select().single();
        
        orderId = order?.id;
        orderError = error;
        
        if (orderId && !error) {
          // If we had to insert a new one, we must insert order_items
          for (const item of items) {
             await supabase.from('order_items').insert({
               order_id: orderId,
               product_id: item.id, 
               quantity: item.quantity,
               price_at_purchase: item.price
             });
          }
        }
      }

      if (orderError) throw orderError;

      clearCart();
      alert(`Payment successful! Order placed.`);
      navigate({ to: "/profile" });
    } catch (err) {
      console.error(err);
      alert('Order completion failed after payment. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    alert('Payment cancelled');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !phone || !address || !selectedCity) {
      alert("Please fill in all delivery details.");
      return;
    }
    // @ts-ignore
    initializePayment({ onSuccess, onClose });
  };

  if (isCheckingSession) return null;

  return (
    <div className="min-h-screen bg-forest-deep text-white py-24 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-8">Checkout</h1>
          
          {!userId ? (
            <div className="bg-white/5 p-8 rounded-xl border border-white/10 shadow-xl backdrop-blur-md">
              <h2 className="text-xl font-bold mb-6 text-gold">
                {isSignUp ? "Create an Account" : "Log in to Checkout"}
              </h2>
              <form onSubmit={handleAuth} className="space-y-4">
                {isSignUp && (
                  <>
                    <div>
                      <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Full Name</label>
                      <input required value={authName} onChange={e => setAuthName(e.target.value)} type="text" className="w-full h-12 px-4 rounded-md bg-black border border-white/15 focus:border-gold outline-none text-white transition" />
                    </div>
                    <div>
                      <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Phone Number</label>
                      <input required value={authPhone} onChange={e => setAuthPhone(e.target.value)} type="tel" className="w-full h-12 px-4 rounded-md bg-black border border-white/15 focus:border-gold outline-none text-white transition" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">City</label>
                        <select required value={authCity} onChange={e => setAuthCity(e.target.value)} className="w-full h-12 px-4 rounded-md bg-black border border-white/15 focus:border-gold outline-none text-white transition">
                          {shippingRates.map(r => (
                            <option key={r.id} value={r.city} className="bg-forest-deep">{r.city}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Delivery Address</label>
                        <input required value={authAddress} onChange={e => setAuthAddress(e.target.value)} type="text" className="w-full h-12 px-4 rounded-md bg-black border border-white/15 focus:border-gold outline-none text-white transition" placeholder="Street name, house no." />
                      </div>
                    </div>
                  </>
                )}
                
                <div>
                  <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Email</label>
                  <input required value={authEmail} onChange={e => setAuthEmail(e.target.value)} type="email" className="w-full h-12 px-4 rounded-md bg-black border border-white/15 focus:border-gold outline-none text-white transition" />
                </div>
                <div>
                  <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Password</label>
                  <input required value={authPassword} onChange={e => setAuthPassword(e.target.value)} type="password" minLength={6} className="w-full h-12 px-4 rounded-md bg-black border border-white/15 focus:border-gold outline-none text-white transition" />
                </div>
                <button disabled={authLoading} type="submit" className="w-full h-12 rounded-md bg-gold text-[#0A0A0A] font-bold uppercase tracking-widest hover:bg-gold-hover transition shadow-gold disabled:opacity-50 mt-6">
                  {authLoading ? "Processing..." : (isSignUp ? "Register & Continue" : "Log In & Continue")}
                </button>
              </form>
              <div className="mt-6 text-center border-t border-white/10 pt-4">
                <button onClick={() => setIsSignUp(!isSignUp)} className="text-white/50 hover:text-gold transition text-sm">
                  {isSignUp ? "Already have an account? Log in" : "Don't have an account? Sign up"}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex justify-between items-center mb-6">
                <span className="text-white/70 text-sm">Logged in as <strong className="text-white">{email}</strong></span>
                <button type="button" onClick={() => supabase.auth.signOut()} className="text-xs text-white/50 hover:text-white underline">Sign out</button>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
                <h3 className="font-bold text-lg mb-4">Delivery Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Full Name</label>
                    <input required value={name} onChange={e => setName(e.target.value)} type="text" className="w-full h-12 px-4 rounded-md bg-black border border-white/15 focus:border-gold outline-none text-white transition" />
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Phone</label>
                    <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" className="w-full h-12 px-4 rounded-md bg-black border border-white/15 focus:border-gold outline-none text-white transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Shipping Address</label>
                  <input required value={address} onChange={e => setAddress(e.target.value)} type="text" className="w-full h-12 px-4 rounded-md bg-black border border-white/15 focus:border-gold outline-none text-white transition" />
                </div>
                <div>
                  <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">City</label>
                  <select value={selectedCity} onChange={handleCityChange} className="w-full h-12 px-4 rounded-md bg-black border border-white/15 focus:border-gold outline-none text-white transition">
                    {shippingRates.map(r => (
                      <option key={r.id} value={r.city} className="bg-forest-deep">{r.city} (+₦{r.fee.toLocaleString()})</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button disabled={loading} type="submit" className="w-full h-14 rounded-md bg-gold text-[#0A0A0A] font-bold text-lg tracking-widest shadow-gold hover:bg-gold-hover transition disabled:opacity-50 mt-4">
                {loading ? 'Processing...' : `Pay ₦${grandTotal.toLocaleString()} with Paystack`}
              </button>
            </form>
          )}
        </div>

        <div>
          <div className="bg-white/5 p-8 rounded-xl border border-white/10 sticky top-24 shadow-xl backdrop-blur-md">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-6 text-gold">
              <ShoppingBag /> Order Summary
            </h2>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded border border-white/10 overflow-hidden flex-shrink-0">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-white/90 font-bold block">{item.name}</span>
                      <span className="text-white/50 text-xs">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-semibold text-white/90">₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            {/* Discount Section */}
            <div className="border-t border-white/10 py-5">
              {!discountApplied ? (
                <form onSubmit={applyDiscount} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input 
                      type="text" 
                      value={discountInput}
                      onChange={e => setDiscountInput(e.target.value.toUpperCase())}
                      placeholder="Discount code" 
                      className="w-full h-10 pl-10 pr-4 rounded-md bg-black border border-white/15 focus:border-gold outline-none text-sm text-white uppercase transition"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={discountLoading || !discountInput}
                    className="h-10 px-4 rounded-md bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition disabled:opacity-50"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between bg-gold/10 border border-gold/20 rounded-md px-4 py-2">
                  <div className="flex items-center gap-2 text-gold">
                    <Check size={16} />
                    <span className="font-bold text-sm tracking-widest">{discountApplied.code}</span>
                  </div>
                  <button onClick={removeDiscount} className="text-white/50 hover:text-white transition" title="Remove code">
                    <X size={16} />
                  </button>
                </div>
              )}
              {discountError && <p className="text-red-400 text-xs mt-2">{discountError}</p>}
            </div>

            {/* Totals */}
            <div className="border-t border-white/10 pt-5 space-y-3 text-sm">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              
              {discountApplied && (
                <div className="flex justify-between text-gold font-medium">
                  <span>Discount</span>
                  <span>-₦{discountAmount.toLocaleString()}</span>
                </div>
              )}
              
              <div className="flex justify-between text-white/60">
                <span>Shipping ({selectedCity || 'Pending'})</span>
                <span>₦{shippingFee.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-white font-black text-2xl pt-4 border-t border-white/10 mt-2">
                <span>Total</span>
                <span className="text-gold">₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

