import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function ShippingSettings() {
  const [rates, setRates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCity, setNewCity] = useState("");
  const [newFee, setNewFee] = useState("");

  useEffect(() => {
    fetchRates();
  }, []);

  async function fetchRates() {
    setLoading(true);
    const { data, error } = await supabase.from("shipping_rates").select("*").order("city");
    if (!error && data) {
      setRates(data);
    }
    setLoading(false);
  }

  async function updateFee(id: string, newFee: string) {
    const fee = parseFloat(newFee);
    if (isNaN(fee)) return;

    const { error } = await supabase.from("shipping_rates").update({ fee }).eq("id", id);
    if (!error) {
      setRates(rates.map(r => r.id === id ? { ...r, fee } : r));
    } else {
      alert("Failed to update shipping fee");
    }
  }

  async function addCity(e: React.FormEvent) {
    e.preventDefault();
    const fee = parseFloat(newFee);
    if (isNaN(fee) || !newCity) return;

    const { data, error } = await supabase
      .from("shipping_rates")
      .insert([{ city: newCity, fee }])
      .select()
      .single();

    if (!error && data) {
      setRates([...rates, data].sort((a, b) => a.city.localeCompare(b.city)));
      setNewCity("");
      setNewFee("");
    } else {
      alert("Failed to add city. Row Level Security might be blocking inserts!");
    }
  }

  async function deleteCity(id: string) {
    if (!confirm("Are you sure you want to delete this shipping region?")) return;
    
    const { error } = await supabase.from("shipping_rates").delete().eq("id", id);
    if (!error) {
      setRates(rates.filter(r => r.id !== id));
    } else {
      alert("Failed to delete");
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-black mb-6 border-b border-white/10 pb-4">Shipping Zones & Rates</h2>

      <div className="bg-white/5 border border-white/10 p-6 rounded-xl mb-8">
        <h3 className="text-lg font-bold mb-4">Add New Region</h3>
        <form onSubmit={addCity} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">City / Region Name</label>
            <input
              required
              value={newCity}
              onChange={e => setNewCity(e.target.value)}
              className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-gold transition"
              placeholder="e.g. Lagos"
            />
          </div>
          <div className="w-48">
            <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Flat Fee (₦)</label>
            <input
              required
              type="number"
              step="0.01"
              value={newFee}
              onChange={e => setNewFee(e.target.value)}
              className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-gold transition"
              placeholder="5000"
            />
          </div>
          <button type="submit" className="h-[42px] px-6 bg-gold text-[#0A0A0A] font-bold rounded hover:bg-gold-hover transition">
            Add
          </button>
        </form>
      </div>

      {loading ? (
        <p className="text-white/50">Loading rates...</p>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 border-b border-white/10 text-white/50 uppercase tracking-wider text-xs">
              <tr>
                <th className="p-4">Region / City</th>
                <th className="p-4 w-48">Shipping Fee (₦)</th>
                <th className="p-4 w-24 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rates.map((rate) => (
                <tr key={rate.id} className="hover:bg-white/5 transition">
                  <td className="p-4 font-bold text-white">{rate.city}</td>
                  <td className="p-4">
                    <input
                      type="number"
                      step="0.01"
                      defaultValue={rate.fee}
                      onBlur={(e) => updateFee(rate.id, e.target.value)}
                      className="w-full bg-black border border-white/20 rounded px-2 py-1 text-white outline-none focus:border-gold transition"
                    />
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => deleteCity(rate.id)} className="text-red-400 hover:text-red-300 text-xs font-bold uppercase tracking-wider">
                      Remove
                    </button>
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

function DiscountSettings() {
  const [codes, setCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCode, setNewCode] = useState("");
  const [newType, setNewType] = useState("percentage");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    fetchCodes();
  }, []);

  async function fetchCodes() {
    setLoading(true);
    const { data, error } = await supabase.from("discount_codes").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      setCodes(data);
    }
    setLoading(false);
  }

  async function addCode(e: React.FormEvent) {
    e.preventDefault();
    const value = parseFloat(newValue);
    if (isNaN(value) || !newCode) return;

    const { data, error } = await supabase
      .from("discount_codes")
      .insert([{ code: newCode.toUpperCase(), discount_type: newType, discount_value: value }])
      .select()
      .single();

    if (!error && data) {
      setCodes([data, ...codes]);
      setNewCode("");
      setNewValue("");
    } else {
      alert("Failed to add discount code. Make sure you've run the SQL to create the discount_codes table!");
    }
  }

  async function toggleActive(id: string, currentStatus: boolean) {
    const { error } = await supabase.from("discount_codes").update({ is_active: !currentStatus }).eq("id", id);
    if (!error) {
      setCodes(codes.map(c => c.id === id ? { ...c, is_active: !currentStatus } : c));
    }
  }

  async function deleteCode(id: string) {
    if (!confirm("Are you sure you want to delete this discount code?")) return;
    const { error } = await supabase.from("discount_codes").delete().eq("id", id);
    if (!error) {
      setCodes(codes.filter(c => c.id !== id));
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-black mb-6 border-b border-white/10 pb-4">Discount Codes</h2>

      <div className="bg-white/5 border border-white/10 p-6 rounded-xl mb-8">
        <h3 className="text-lg font-bold mb-4">Create New Code</h3>
        <form onSubmit={addCode} className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Code</label>
            <input
              required
              value={newCode}
              onChange={e => setNewCode(e.target.value.toUpperCase())}
              className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-gold transition uppercase"
              placeholder="e.g. SUMMER20"
            />
          </div>
          <div className="w-40">
            <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Type</label>
            <select
              value={newType}
              onChange={e => setNewType(e.target.value)}
              className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-gold transition h-[42px]"
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount (₦)</option>
            </select>
          </div>
          <div className="w-32">
            <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Value</label>
            <input
              required
              type="number"
              step="0.01"
              min="0"
              value={newValue}
              onChange={e => setNewValue(e.target.value)}
              className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-gold transition"
              placeholder={newType === 'percentage' ? "20" : "5000"}
            />
          </div>
          <button type="submit" className="h-[42px] px-6 bg-gold text-[#0A0A0A] font-bold rounded hover:bg-gold-hover transition">
            Create
          </button>
        </form>
      </div>

      {loading ? (
        <p className="text-white/50">Loading codes...</p>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 border-b border-white/10 text-white/50 uppercase tracking-wider text-xs">
              <tr>
                <th className="p-4">Code</th>
                <th className="p-4">Discount</th>
                <th className="p-4 text-center">Usage</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {codes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-white/50">No discount codes created yet.</td>
                </tr>
              ) : codes.map((code) => (
                <tr key={code.id} className="hover:bg-white/5 transition">
                  <td className="p-4 font-bold text-gold tracking-widest">{code.code}</td>
                  <td className="p-4">
                    {code.discount_type === 'percentage' ? `${code.discount_value}% OFF` : `₦${code.discount_value.toLocaleString()} OFF`}
                  </td>
                  <td className="p-4 text-center font-bold">{code.usage_count || 0}</td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => toggleActive(code.id, code.is_active)}
                      className={`text-xs px-2 py-1 rounded border ${code.is_active ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-red-500/50 text-red-400 bg-red-500/10'}`}
                    >
                      {code.is_active ? 'ACTIVE' : 'INACTIVE'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => deleteCode(code.id)} className="text-red-400 hover:text-red-300 text-xs font-bold uppercase tracking-wider">
                      Delete
                    </button>
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

function AdminSettings() {
  return (
    <div className="max-w-[1400px]">
      <div>
        <h1 className="text-3xl font-black mb-2">Store Settings</h1>
        <p className="text-white/50 mb-8">Manage shipping, discount codes, and general configuration here.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ShippingSettings />
          <DiscountSettings />
        </div>
      </div>
    </div>
  );
}
