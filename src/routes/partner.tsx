import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, ArrowRight, Building } from "lucide-react";

export const Route = createFileRoute("/partner")({
  component: PartnerRegistration,
});

function PartnerRegistration() {
  const [formData, setFormData] = useState({
    full_name: "",
    business_name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    reason_for_partnership: "",
    expected_purchase_quantity: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: dbError } = await supabase
        .from('partner_applications')
        .insert({
          full_name: formData.full_name,
          business_name: formData.business_name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
          reason_for_partnership: formData.reason_for_partnership,
          expected_purchase_quantity: parseInt(formData.expected_purchase_quantity, 10),
          status: 'pending'
        });

      if (dbError) throw dbError;
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-32 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="mb-12 text-center">
          <div className="inline-flex w-16 h-16 rounded-full bg-gold/20 items-center justify-center text-gold mb-6 shadow-gold">
            <Building size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-widest text-white">
            Partner With Us
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Join the Zenbeatz distribution network. Fill out the form below and our team will review your application.
          </p>
        </div>

        {submitted ? (
          <div className="bg-forest-light border border-white/10 rounded-2xl p-12 text-center shadow-2xl">
            <div className="inline-flex w-20 h-20 bg-green-500/20 text-green-400 rounded-full items-center justify-center mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-3xl font-black mb-4">Application Received!</h2>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              Thank you for your interest in partnering with Zenbeatz. Our administrative team will review your details and get back to you shortly.
            </p>
            <a href="/" className="inline-flex items-center gap-2 text-gold font-bold hover:text-white transition group">
              Return Home <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-forest-light border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl space-y-6">
            
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm font-bold">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Full Name <span className="text-gold">*</span></label>
                <input required type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-gold transition" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Business Name</label>
                <input type="text" name="business_name" value={formData.business_name} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-gold transition" placeholder="Optional" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Email Address <span className="text-gold">*</span></label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-gold transition" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Phone Number <span className="text-gold">*</span></label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-gold transition" placeholder="+234..." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/80 uppercase tracking-wider">City <span className="text-gold">*</span></label>
                <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-gold transition" placeholder="Lagos" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Expected Purchase Qty (Monthly) <span className="text-gold">*</span></label>
                <input required type="number" min="1" name="expected_purchase_quantity" value={formData.expected_purchase_quantity} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-gold transition" placeholder="100" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Full Address <span className="text-gold">*</span></label>
              <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-gold transition" placeholder="123 Rhythm Street" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Reason for Partnership <span className="text-gold">*</span></label>
              <textarea required name="reason_for_partnership" value={formData.reason_for_partnership} onChange={handleChange} rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-gold transition resize-none" placeholder="Tell us how you plan to distribute or use our products..." />
            </div>

            <button disabled={loading} type="submit" className="w-full h-14 bg-gold text-[#0A0A0A] font-black uppercase tracking-widest rounded-lg hover:bg-gold-hover transition shadow-gold disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
