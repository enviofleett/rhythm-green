import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-drums.jpg";
import drummerImage from "@/assets/drummer.jpg";
import woodImage from "@/assets/wood.jpg";
import stick5A from "@/assets/stick-5a.jpg";
import stick5B from "@/assets/stick-5b.jpg";
import stick7A from "@/assets/stick-7a.jpg";
import stick2B from "@/assets/stick-2b.jpg";
import teamDaniel from "@/assets/team-daniel.jpg";
import teamSani from "@/assets/team-sani.jpg";
import teamGideon from "@/assets/team-gideon.jpg";
import teamDorcas from "@/assets/team-dorcas.jpg";
import teamPeace from "@/assets/team-peace.jpg";
import teamAntonia from "@/assets/team-antonia.jpg";
import { useCartStore } from "@/lib/store";
import { Cart } from "@/components/Cart";
import { ShoppingBag, User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: async () => {
    const { data: products } = await supabase.from('products').select('*').order('code');
    return { products: products || [] };
  },
  component: Index,
  head: () => ({
    meta: [
      { title: "Zenbeatz — Premium African Percussion · Drumsticks Made in Nigeria" },
      {
        name: "description",
        content:
          "Zenbeatz manufactures world-class drumsticks from premium Mangroove hardwood. Crafted in Nigeria, built for the world. Wholesale & distribution partnerships available.",
      },
    ],
  }),
});

/* ──────────────────────────── NAV ──────────────────────────── */

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Why Us", href: "#why" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const { toggleCart, items } = useCartStore();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-forest-deep/70 border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="text-white font-black tracking-[0.15em] text-xl">
          ZENBEATZ
        </a>
        <ul className="hidden md:flex items-center gap-9 text-[15px] text-white/75">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="hover:text-white transition">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCart}
            className="relative text-white hover:text-gold transition p-2"
            aria-label="Open Cart"
          >
            <ShoppingBag size={24} />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 size-5 bg-gold text-[#0A0A0A] text-[10px] font-bold flex items-center justify-center rounded-full transform translate-x-1/4 -translate-y-1/4">
                {cartItemCount}
              </span>
            )}
          </button>
          
          {session && (
            <a href="/profile" className="text-white hover:text-gold transition p-2" aria-label="Profile">
              <User size={24} />
            </a>
          )}

          <a
            href="/partner"
            className="hidden sm:inline-flex h-11 items-center px-5 text-sm font-bold rounded-md bg-gold text-[#0A0A0A] hover:bg-gold-hover transition shadow-gold"
          >
            Partner With Us
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ─────────────────────────── HERO ─────────────────────────── */

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <img
        src={heroImage}
        alt="Zenbeatz premium drumsticks"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
      {/* Layered overlays — lighter so the sticks remain visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/60 via-forest-deep/40 to-forest-deep/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--forest-deep)_95%)]" />
      {/* Glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-gold/10 blur-[120px]" />

      {/* Hairline */}
      <div className="absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 text-center pt-24 pb-16 animate-fade-in">
        <p className="text-gold text-xs sm:text-sm tracking-[0.45em] font-semibold uppercase mb-10">
          Premium African Percussion
        </p>
        <h1 className="text-white font-black leading-[0.9] tracking-tight text-[18vw] sm:text-[14vw] md:text-[11vw] lg:text-[10rem]">
          ZENBEATZ
        </h1>

        <div className="mt-10 flex items-center justify-center gap-4 text-white">
          <span className="h-px w-12 sm:w-24 bg-white/30" />
          <p className="text-lg sm:text-2xl font-light tracking-wide whitespace-nowrap">
            Crafted in Nigeria. Built for the World.
          </p>
          <span className="h-px w-12 sm:w-24 bg-white/30" />
        </div>

        <p className="mt-8 mx-auto max-w-2xl text-white/60 text-base sm:text-lg leading-relaxed">
          World-class drumsticks manufactured with premium Mangroove hardwood. Wholesale &amp;
          distribution partnerships available worldwide.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="h-14 px-8 inline-flex items-center text-sm font-bold tracking-wider rounded-md bg-gold text-[#0A0A0A] hover:bg-gold-hover transition shadow-gold hover-scale"
          >
            BECOME A PARTNER
          </a>
          <a
            href="#products"
            className="h-14 px-8 inline-flex items-center text-sm font-bold tracking-wider rounded-md bg-transparent border border-white/25 text-white hover:bg-white/10 hover:border-white/50 transition"
          >
            VIEW COLLECTION
          </a>
        </div>
      </div>

      {/* Scroll arrow */}
      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-gold transition animate-[pulse_2.4s_ease-in-out_infinite]"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}

/* ───────────────────── SECTION HEADER UTIL ───────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gold text-xs sm:text-sm tracking-[0.4em] font-semibold uppercase mb-5">
      {children}
    </p>
  );
}

/* ─────────────────────────── ABOUT ─────────────────────────── */

function About() {
  return (
    <section id="about" className="relative py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Eyebrow>Our Story</Eyebrow>
          <h2 className="text-white text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
            A Vision That
            <br />
            Took Rhythm
          </h2>
          <div className="mt-8 space-y-5 text-white/65 text-base md:text-lg leading-relaxed font-light">
            <p>
              In 2023, Zenbeatz was founded in Lagos, Nigeria, with a main office in Houston, Texas,
              with one bold mission: to become the leading drumstick manufacturer in Africa and
              place Nigeria on the global percussion map.
            </p>
            <p>
              For years, Africa has imported its drumsticks from overseas. As a professional
              drummer, I experienced this firsthand. I always dreamed of expanding my craft beyond
              performance — into creation.
            </p>
            <blockquote className="border-l-2 border-gold pl-5 text-white/90 italic">
              "So I decided to change the narrative. Zenbeatz was born to manufacture world-class
              drumsticks right here in Nigeria — drumsticks that echo our name across stages,
              studios, churches, and arenas around the world."
            </blockquote>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              { v: "2023", l: "Founded" },
              { v: "2", l: "Locations" },
              { v: "∞", l: "Ambition" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-gold text-3xl md:text-4xl font-black">{s.v}</p>
                <p className="text-white/50 text-xs tracking-widest uppercase mt-2">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-gold aspect-[3/4]">
            <iframe
              src="https://www.youtube.com/embed/q9AHROKqgyo"
              title="Zenbeatz video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-forest-deep border border-gold/40 rounded-lg px-6 py-4 shadow-gold backdrop-blur-md">
            <p className="text-3xl">🇺🇸</p>
            <p className="text-white/60 text-xs tracking-widest uppercase mt-1">Made in</p>
            <p className="text-white font-bold text-lg">USA</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── MATERIAL ─────────────────────────── */

function Material() {
  return (
    <section className="relative py-32 px-6 lg:px-10 bg-forest-deep">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="rounded-xl overflow-hidden border border-white/10">
            <img
              src={woodImage}
              alt="Premium Mangroove hardwood"
              width={1200}
              height={1500}
              loading="lazy"
              className="w-full h-[600px] object-cover"
            />
          </div>
          <div className="absolute top-6 left-6 bg-forest-deep/80 backdrop-blur-md border border-white/10 rounded-lg p-5 max-w-[240px]">
            <p className="text-2xl">🌳</p>
            <p className="text-white font-bold mt-2">Mangroove Hardwood</p>
            <p className="text-white/55 text-sm mt-1">
              Rare, premium wood sourced sustainably from Nigeria's forests.
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <Eyebrow>The Material</Eyebrow>
          <h2 className="text-white text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
            The Power of <span className="text-gold">Mangroove Wood</span>
          </h2>
          <p className="mt-8 text-white/65 text-lg leading-relaxed font-light">
            At the heart of every Zenbeatz drumstick lies rare, premium Mangroove hardwood — carefully
            selected for exceptional performance. Mangroove wood gives our sticks strength without
            sacrificing feel. The result? A drumstick that sits perfectly in your hand and responds
            with precision every time you strike.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "Superior durability",
              "Natural balance",
              "Firm, confident grip",
              "Long-lasting performance",
              "Consistent tone response",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-white/80">
                <span className="size-1.5 rounded-full bg-gold shadow-gold" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-lg border border-gold/20 bg-gold/5 p-5 text-white/70 text-sm">
            <span className="text-gold font-bold">Quality Assurance:</span> Each pair is engineered
            to meet American production standards, ensuring consistent weight, balance, and finish
            across every batch.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── PRODUCTS ─────────────────────────── */



function Products() {
  const { addItem } = useCartStore();
  const { products } = useLoaderData({ from: '/' });
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  // Map database fields to the UI structure expected
  const mappedProducts = products.map((p: any) => ({
    id: p.id,
    code: p.code,
    image: p.image_url || p.image,
    title: p.title,
    desc: p.description,
    price: p.price,
    specs: p.specs || {},
    popular: p.is_popular,
    category: p.category || 'Drumsticks',
    moq: p.moq || 1
  }));

  // Group products by category
  const groupedProducts = mappedProducts.reduce((acc: any, product: any) => {
    const cat = product.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    addItem({
      id: selectedProduct.id || selectedProduct.code,
      name: `Zenbeatz ${selectedProduct.code}`,
      price: selectedProduct.price || 15.00,
      quantity: quantity,
      imageUrl: selectedProduct.image,
      moq: selectedProduct.moq || 1
    });
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleBuyNow = () => {
    if (!selectedProduct) return;
    addItem({
      id: selectedProduct.id || selectedProduct.code,
      name: `Zenbeatz ${selectedProduct.code}`,
      price: selectedProduct.price || 15.00,
      quantity: quantity,
      imageUrl: selectedProduct.image,
      moq: selectedProduct.moq || 1
    });
    navigate({ to: "/checkout" });
  };

  return (
    <section id="products" className="relative py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Eyebrow>Our Collection</Eyebrow>
          <h2 className="text-white text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
            Built for <span className="text-gold">Every Drummer</span>
          </h2>
          <p className="mt-6 text-white/65 text-lg font-light leading-relaxed">
            Whether you're leading worship, recording in the studio, performing on stage, or
            teaching the next generation — Zenbeatz is built for you.
          </p>
        </div>

        {Object.keys(groupedProducts).length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/20 rounded-2xl bg-white/5">
            <p className="text-white/50 mb-2">No products available yet.</p>
            <p className="text-gold text-sm font-bold">Add some products in the Admin Dashboard!</p>
          </div>
        ) : (
          Object.entries(groupedProducts).map(([category, catProducts]: [string, any]) => (
            <div key={category} className="mb-20 last:mb-0">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-2xl md:text-3xl text-white font-black tracking-widest uppercase">{category}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gold/50 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {catProducts.map((p: any) => (
                  <article
                    key={p.code}
                    onClick={() => {
                      setSelectedProduct(p);
                      setQuantity(p.moq || 1);
                    }}
                    className="cursor-pointer group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent hover:border-gold/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-gold"
                  >
                    {p.popular && (
                      <span className="absolute top-5 left-5 z-10 text-[10px] tracking-[0.25em] font-bold uppercase bg-gold text-[#0A0A0A] px-3 py-1.5 rounded">
                        Most Popular
                      </span>
                    )}
                    <div className="aspect-[5/3] overflow-hidden bg-black">
                      <img
                        src={p.image}
                        alt={`Zenbeatz ${p.code}`}
                        width={900}
                        height={540}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="p-8">
                      <p className="text-gold text-xs tracking-[0.3em] font-semibold">ZENBEATZ</p>
                      <div className="flex items-baseline justify-between mt-2">
                        <p className="text-white text-5xl font-black tracking-tight">{p.code}</p>
                        <h3 className="text-white/90 text-lg font-bold">{p.title}</h3>
                      </div>

                      <p className="mt-5 text-white/60 text-sm leading-relaxed line-clamp-2">{p.desc}</p>
                      <p className="mt-4 font-bold text-gold">₦{(p.price || 15.00).toLocaleString()}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))
        )}

        <div className="mt-14 text-center rounded-xl border border-dashed border-gold/30 bg-gold/5 p-8">
          <p className="text-gold text-xs tracking-[0.3em] font-bold uppercase">Coming Soon</p>
          <p className="text-white/70 mt-3 max-w-2xl mx-auto">
            Our long-term vision includes expanding into manufacturing Zenbeatz drum sets, building
            a complete African percussion brand recognized worldwide.
          </p>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-forest-deep border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Image Header */}
            <div className="relative h-48 sm:h-64 bg-black shrink-0">
              <img 
                src={selectedProduct.image} 
                className="w-full h-full object-cover" 
                alt={selectedProduct.title} 
              />
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 size-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition backdrop-blur-md border border-white/20"
              >
                ✕
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              <p className="text-gold text-xs tracking-[0.3em] font-bold uppercase">ZENBEATZ {selectedProduct.code}</p>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 mb-2">{selectedProduct.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">{selectedProduct.desc}</p>
              
              {selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0 && (
                <dl className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5 mb-6">
                  {Object.entries(selectedProduct.specs).map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-white/40 text-[10px] tracking-widest uppercase">{k}</dt>
                      <dd className="text-white font-bold text-sm mt-1">{String(v)}</dd>
                    </div>
                  ))}
                </dl>
              )}
              
              <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 gap-4">
                <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1 w-full sm:w-auto">
                  <button 
                    onClick={() => setQuantity(Math.max(selectedProduct.moq || 1, quantity - 1))}
                    disabled={quantity <= (selectedProduct.moq || 1)}
                    className="size-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-md transition disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-white font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="size-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-md transition"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto flex-1 h-12 flex items-center justify-center gap-2 text-[#0A0A0A] bg-white font-bold text-sm tracking-widest uppercase hover:bg-gray-200 rounded-md transition-all"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full sm:w-auto flex-1 h-12 flex items-center justify-center gap-2 text-[#0A0A0A] bg-gold font-bold text-sm tracking-widest uppercase hover:bg-gold-hover rounded-md transition-all shadow-gold"
                >
                  Buy It Now - ₦{((selectedProduct.price || 15.00) * quantity).toLocaleString()}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─────────────────────────── WHY US ─────────────────────────── */

const WHY = [
  {
    icon: "🌳",
    t: "Premium Mangroove Hardwood",
    d: "Rare, sustainably sourced wood with exceptional durability and natural balance.",
  },
  {
    icon: "✓",
    t: "American Standard QC",
    d: "Every pair meets rigorous international quality control standards.",
  },
  {
    icon: "⚖",
    t: "Precision-Balanced",
    d: "Computer-matched pairs ensure perfect weight distribution.",
  },
  {
    icon: "🔥",
    t: "Performance-Tested",
    d: "Rigorously tested for durability under professional playing conditions.",
  },
  {
    icon: "🇳🇬",
    t: "Made in Nigeria",
    d: "Proudly manufactured in Lagos, supporting African excellence.",
  },
  {
    icon: "🥁",
    t: "By Drummers, For Drummers",
    d: "Designed by professional percussionists who understand your needs.",
  },
];

function Why() {
  return (
    <section id="why" className="relative py-32 px-6 lg:px-10 bg-forest-deep">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Eyebrow>Why Partner With Us</Eyebrow>
          <h2 className="text-white text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
            Why Choose <span className="text-gold">Zenbeatz?</span>
          </h2>
          <p className="mt-6 text-white/65 text-lg font-light leading-relaxed">
            We're not just selling drumsticks. We're building partnerships that bring African
            excellence to the global stage.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY.map((w) => (
            <div
              key={w.t}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-8 hover:border-gold/40 hover:bg-white/[0.05] transition-all hover:-translate-y-1"
            >
              <div className="size-12 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-2xl group-hover:bg-gold/25 transition">
                {w.icon}
              </div>
              <h3 className="mt-5 text-white text-xl font-bold">{w.t}</h3>
              <p className="mt-3 text-white/60 text-sm leading-relaxed">{w.d}</p>
            </div>
          ))}
        </div>

        <blockquote className="mt-20 max-w-4xl mx-auto text-center">
          <p className="text-white text-2xl md:text-4xl font-light italic leading-relaxed">
            "Zenbeatz is proof that Nigeria can manufacture at a global level. It is proof that
            Africa can compete. It is proof that rhythm has no borders."
          </p>
          <footer className="mt-6 text-gold text-sm tracking-[0.3em] font-bold uppercase">
            — The Zenbeatz Vision
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

/* ─────────────────────────── LEADERSHIP ─────────────────────────── */

const TEAM = [
  {
    name: "Daniel Palama",
    role: "Founder & CEO",
    bio: "Professional drummer, entrepreneur, and visionary behind Zenbeatz. Daniel's passion for percussion and African excellence drove him to build Nigeria's first world-class drumstick brand.",
    tags: ["Lagos, Nigeria", "Houston, Texas", "Professional Drummer"],
    initials: "DP",
    photo: teamDaniel,
  },
  {
    name: "Sani Sule",
    role: "Marketing Director",
    bio: "A results-driven marketing leader committed to amplifying the Zenbeatz brand globally through strategic partnerships and bold storytelling.",
    tags: ["Brand Strategy", "Global Outreach", "Wholesale Growth"],
    initials: "SS",
    photo: teamSani,
  },
  {
    name: "Gideon Monday Simon",
    role: "Chief Engineer",
    bio: "The technical mastermind behind every Zenbeatz drumstick. Gideon leads the engineering and manufacturing process to world-class standards.",
    tags: ["Manufacturing", "Quality Control", "Precision Engineering"],
    initials: "GS",
    photo: teamGideon,
  },
  {
    name: "Dorcas Adekunle",
    role: "HR / Secretary",
    bio: "The organizational backbone of Zenbeatz, Dorcas ensures seamless operations and a people-first culture across the team.",
    tags: ["People & Culture", "Operations", "Team Coordination"],
    initials: "DA",
    photo: teamDorcas,
  },
  {
    name: "Peace Palama",
    role: "Chief Accountant",
    bio: "The financial guardian of the Zenbeatz vision. Peace oversees the company's financial health as the brand grows globally.",
    tags: ["Finance", "Accounting", "Fiscal Strategy"],
    initials: "PP",
    photo: teamPeace,
  },
  {
    name: "Antonia",
    role: "Chief Legal",
    bio: "The legal compass of Zenbeatz — safeguarding the company's interests across contracts, intellectual property, and compliance.",
    tags: ["Legal Affairs", "Compliance", "Contracts"],
    initials: "AN",
    photo: teamAntonia,
  },
];

function Leadership() {
  return (
    <section id="gallery" className="relative py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Eyebrow>The Visionary</Eyebrow>
          <h2 className="text-white text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
            Meet the <span className="text-gold">Leadership</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="group rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden hover:border-gold/40 transition-all"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-forest-deep">
                <img
                  src={m.photo}
                  alt={m.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" />
              </div>
              <div className="p-7">
                <p className="text-gold text-xs tracking-[0.3em] font-semibold uppercase">
                  {m.role}
                </p>
                <h3 className="mt-2 text-white text-2xl font-bold">{m.name}</h3>
                <p className="mt-3 text-white/60 text-sm leading-relaxed">{m.bio}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-3 py-1 rounded-full border border-white/15 text-white/65"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <blockquote className="mt-20 max-w-4xl mx-auto text-center">
          <p className="text-white text-2xl md:text-4xl font-light italic leading-relaxed">
            "When you play Zenbeatz, you're not just playing a drumstick. You're playing a
            movement."
          </p>
          <footer className="mt-6 text-gold text-sm tracking-[0.3em] font-bold uppercase">
            — Daniel Palama, Founder
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

/* ─────────────────────────── CONTACT ─────────────────────────── */

function Contact() {
  const [formData, setFormData] = useState({
    business_name: "",
    full_name: "",
    email: "",
    phone: "",
    city: "",
    reason_for_partnership: "",
    expected_purchase_quantity: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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
          address: "Submitted via Contact Form",
          reason_for_partnership: formData.reason_for_partnership,
          expected_purchase_quantity: parseInt(formData.expected_purchase_quantity || "0", 10),
          status: 'pending'
        });

      if (dbError) throw dbError;
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit inquiry.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="relative py-32 px-6 lg:px-10 bg-forest-deep">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-gold/10 blur-[140px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Eyebrow>Partner With Us</Eyebrow>
          <h2 className="text-white text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
            Become a <span className="text-gold">Zenbeatz Distributor</span>
          </h2>
          <p className="mt-6 text-white/65 text-lg font-light leading-relaxed">
            Join us in bringing African excellence to drummers worldwide. We offer competitive
            wholesale pricing, reliable supply, and dedicated partner support.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { t: "Offices", lines: ["Lagos, Nigeria (Manufacturing)", "Houston, Texas (Sales)"] },
              { t: "Email", lines: ["info@zenbeatz.org"] },
              { t: "Phone", lines: ["+234 906 377 0004"] },
            ].map((b) => (
              <div key={b.t} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h4 className="text-gold text-xs tracking-[0.3em] font-bold uppercase">{b.t}</h4>
                <div className="mt-3 space-y-1 text-white/80">
                  {b.lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-2">
              {["🇳🇬 Made in Nigeria", "🇺🇸 US Office", "🌍 Global Shipping"].map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-2 rounded-full border border-gold/30 bg-gold/5 text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="lg:col-span-3 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 md:p-10 backdrop-blur-md flex flex-col items-center justify-center text-center">
              <div className="size-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6 text-3xl">✓</div>
              <h3 className="text-white text-3xl font-black mb-4">Inquiry Received</h3>
              <p className="text-white/70 max-w-md">Thank you for your interest! Our team will review your details and get back to you shortly.</p>
              <button onClick={() => setSubmitted(false)} className="mt-8 text-gold font-bold hover:text-white transition">Submit another inquiry</button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-3 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 md:p-10 backdrop-blur-md"
            >
              <h3 className="text-white text-2xl font-bold">Wholesale Inquiry</h3>
              {error && <p className="mt-4 text-red-400 text-sm font-bold bg-red-500/10 p-3 rounded">{error}</p>}
              
              <div className="mt-7 grid sm:grid-cols-2 gap-5">
                <Field label="Company Name *" placeholder="Your company" value={formData.business_name} onChange={e => setFormData({...formData, business_name: e.target.value})} required />
                <Field label="Contact Name *" placeholder="Your name" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} required />
                <Field label="Email *" placeholder="you@company.com" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                <Field label="Phone" placeholder="+1 ..." value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                <Field label="Country/City *" placeholder="Your location" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} required />
                
                <div>
                  <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">
                    Business Type *
                  </label>
                  <select className="w-full h-12 px-4 rounded-md bg-white/5 border border-white/15 text-white focus:outline-none focus:border-gold transition">
                    <option className="bg-forest-deep">Select type</option>
                    <option className="bg-forest-deep">Wholesaler</option>
                    <option className="bg-forest-deep">Retailer</option>
                    <option className="bg-forest-deep">Distributor</option>
                    <option className="bg-forest-deep">Music Store</option>
                    <option className="bg-forest-deep">Other</option>
                  </select>
                </div>
                
                <Field label="Estimated Order Quantity" placeholder="e.g. 500 pairs" value={formData.expected_purchase_quantity} onChange={e => setFormData({...formData, expected_purchase_quantity: e.target.value})} />
                
                <div className="sm:col-span-2">
                  <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">
                    Products Interested In
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["5A", "5B", "7A", "2B"].map((p) => (
                      <label key={p} className="cursor-pointer">
                        <input type="checkbox" className="peer sr-only" />
                        <span className="px-4 py-2 rounded-full border border-white/20 text-white/80 text-sm peer-checked:bg-gold peer-checked:text-[#0A0A0A] peer-checked:border-gold transition">
                          {p}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your business and partnership goals..."
                    className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition resize-none"
                    value={formData.reason_for_partnership}
                    onChange={e => setFormData({...formData, reason_for_partnership: e.target.value})}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full h-14 rounded-md bg-gold text-[#0A0A0A] font-bold tracking-widest text-sm uppercase hover:bg-gold-hover transition shadow-gold disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Wholesale Inquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  required = false
}: {
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full h-12 px-4 rounded-md bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition"
      />
    </div>
  );
}

/* ─────────────────────────── FOOTER ─────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 lg:px-10 py-12 bg-forest-deep">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <p className="text-white font-black tracking-[0.15em] text-lg">ZENBEATZ</p>
          <p className="text-white/40 text-sm mt-1">Premium African Percussion</p>
        </div>
        <p className="text-white/40 text-sm">© 2026 Zenbeatz · Lagos, Nigeria · Houston, Texas</p>
        <div className="flex gap-5 text-sm text-white/60">
          <a href="#" className="hover:text-gold transition">
            Instagram
          </a>
          <a href="#" className="hover:text-gold transition">
            YouTube
          </a>
          <a href="#" className="hover:text-gold transition">
            TikTok
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */

function Index() {
  return (
    <div className="min-h-screen bg-forest-deep text-white selection:bg-gold selection:text-[#0A0A0A]">
      <Cart />
      <Nav />
      <Hero />
      <About />
      <Material />
      <Products />
      <Why />
      <Leadership />
      <Contact />
      <Footer />
    </div>
  );
}
