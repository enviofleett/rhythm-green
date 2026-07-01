import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Check, X, Building } from "lucide-react";

export const Route = createFileRoute("/admin/partners")({
  component: AdminPartners,
});

function AdminPartners() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    setLoading(true);
    const { data, error } = await supabase
      .from("partner_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setApplications(data);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from("partner_applications")
      .update({ status })
      .eq("id", id);
    
    if (!error) {
      setApplications(applications.map(app => app.id === id ? { ...app, status } : app));
    } else {
      alert("Failed to update status");
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/50">
          <Building size={24} />
        </div>
        <h1 className="text-3xl font-black">Partner Applications</h1>
      </div>

      {loading ? (
        <p className="text-white/50">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-white/50">No applications found.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    {app.business_name ? `${app.business_name} (${app.full_name})` : app.full_name}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-white/50">
                    <span>{app.email}</span>
                    <span>•</span>
                    <span>{app.phone}</span>
                    <span>•</span>
                    <span>📍 {app.city}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded text-xs uppercase tracking-widest font-bold ${
                  app.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                  app.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {app.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Full Address</p>
                  <p className="text-sm text-white/80">{app.address}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Expected Monthly Qty</p>
                  <p className="text-sm font-bold text-gold">{app.expected_purchase_quantity} pairs</p>
                </div>
                <div className="md:col-span-2 bg-black/30 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Reason for Partnership</p>
                  <p className="text-sm text-white/80 leading-relaxed">"{app.reason_for_partnership}"</p>
                </div>
              </div>

              {app.status === 'pending' && (
                <div className="flex items-center justify-end gap-4 border-t border-white/10 pt-4">
                  <button
                    onClick={() => updateStatus(app.id, 'rejected')}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-400 hover:bg-red-500/10 rounded-md transition"
                  >
                    <X size={16} /> Reject
                  </button>
                  <button
                    onClick={() => updateStatus(app.id, 'approved')}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-md transition"
                  >
                    <Check size={16} /> Approve
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
