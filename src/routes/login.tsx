import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert("Sign up successful! You can now log in.");
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (email === "toolbuxdev@gmail.com") {
          navigate({ to: "/admin" });
        } else {
          navigate({ to: "/account/orders" });
        }
      }
    } catch (err: any) {
      alert(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest-deep flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-md">
        <h1 className="text-3xl font-black text-white text-center mb-8">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h1>
        
        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-md bg-black border border-white/15 text-white focus:border-gold outline-none"
            />
          </div>
          <div>
            <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-md bg-black border border-white/15 text-white focus:border-gold outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-gold text-[#0A0A0A] font-bold uppercase tracking-widest rounded-md hover:bg-gold-hover transition shadow-gold disabled:opacity-50"
          >
            {loading ? "Processing..." : (isSignUp ? "Sign Up" : "Log In")}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-white/50 hover:text-gold transition text-sm"
          >
            {isSignUp ? "Already have an account? Log in" : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
