import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { Package, Truck, Settings, LayoutDashboard, Building, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  useEffect(() => {
    async function checkAdmin() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate({ to: "/login" });
        return;
      }
      
      // HARD BYPASS: Instantly grant admin access to this email regardless of database state
      if (session.user.email === "toolbuxdev@gmail.com") {
        setIsAuthorized(true);
        
        // Attempt to update profile in background, ignore failures
        supabase.from("profiles").update({ 
          role: "admin" 
        }).eq("id", session.user.id).then();
        
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();
        
      if (profile?.role !== "admin") {
        alert("Unauthorized. Admin access required.");
        navigate({ to: "/" });
        return;
      }
      
      setIsAuthorized(true);
    }
    
    checkAdmin();
  }, [navigate]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-forest-deep text-white flex items-center justify-center">
        <p className="animate-pulse text-gold uppercase tracking-widest text-sm font-bold">Verifying Access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest-deep text-white flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-6 md:px-10 py-5">
          <Link to="/" className="text-white font-black tracking-[0.15em] text-lg md:text-xl">
            ZENBEATZ <span className="text-gold text-xs">ADMIN</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/70 hover:text-white hover:text-gold text-sm tracking-wider uppercase font-bold transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Footer Nav */}
      <footer className="fixed bottom-0 w-full bg-forest-deep border-t border-white/10 flex flex-col items-center pb-safe z-50">
        <nav className="flex w-full max-w-lg justify-around p-3 bg-forest-deep">
          <Link
            to="/admin"
            activeOptions={{ exact: true }}
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition [&.active]:text-gold"
          >
            <LayoutDashboard size={20} />
            <span className="text-[10px] tracking-widest uppercase font-bold">Metrics</span>
          </Link>
          <Link
            to="/admin/orders"
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition [&.active]:text-gold"
          >
            <Truck size={20} />
            <span className="text-[10px] tracking-widest uppercase font-bold">Orders</span>
          </Link>
          <Link
            to="/admin/products"
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition [&.active]:text-gold"
          >
            <Package size={20} />
            <span className="text-[10px] tracking-widest uppercase font-bold">Products</span>
          </Link>
          <Link
            to="/admin/partners"
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition [&.active]:text-gold"
          >
            <Building size={20} />
            <span className="text-[10px] tracking-widest uppercase font-bold">Partners</span>
          </Link>
          <Link
            to="/admin/settings"
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition [&.active]:text-gold"
          >
            <Settings size={20} />
            <span className="text-[10px] tracking-widest uppercase font-bold">Settings</span>
          </Link>
        </nav>
      </footer>
    </div>
  );
}
