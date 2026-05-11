import { createFileRoute } from "@tanstack/react-router";
import heroImage from "@/assets/hero-drums.jpg";
import craftImage from "@/assets/craft.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Zenbeatz — Crafted African Percussion" },
      {
        name: "description",
        content:
          "Premium handcrafted African percussion instruments. Djembes, talking drums, and shekeres made by master artisans.",
      },
    ],
  }),
});

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-forest-deep/40 border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-white font-bold tracking-tight text-xl">
          <span className="size-2 rounded-full bg-gold" />
          ZENBEATZ
        </a>
        <ul className="hidden md:flex items-center gap-10 text-sm text-white/80">
          <li><a href="#collection" className="hover:text-white transition">Collection</a></li>
          <li><a href="#craft" className="hover:text-white transition">Craft</a></li>
          <li><a href="#heritage" className="hover:text-white transition">Heritage</a></li>
          <li><a href="#journal" className="hover:text-white transition">Journal</a></li>
        </ul>
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex h-10 px-4 text-sm text-white/90 hover:text-white border border-white/20 hover:border-white/40 rounded transition">
            Sign in
          </button>
          <button className="h-10 px-5 text-sm font-bold rounded bg-gold text-[#0A0A0A] hover:bg-gold-hover transition shadow-elegant">
            Shop now
          </button>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <img
        src={heroImage}
        alt="African percussion drums"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-forest-deep/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-24 pt-40 w-full">
        <div className="max-w-3xl">
          <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-8">
            Made in Lagos · Heard worldwide
          </p>
          <h1 className="text-white font-bold leading-[0.95] tracking-tight text-6xl md:text-8xl lg:text-[8rem]">
            The pulse<br />of a continent.
          </h1>
          <p className="mt-10 text-white/70 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
            Hand-carved percussion instruments crafted by master artisans —
            built to last generations, tuned for the global stage.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <button className="h-14 px-8 text-base font-bold rounded bg-gold text-[#0A0A0A] hover:bg-gold-hover transition shadow-elegant">
              Explore the collection
            </button>
            <button className="h-14 px-8 text-base rounded bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/[0.08] text-white transition">
              Our story
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-end gap-2 text-white/40 text-xs tracking-widest uppercase">
        <span>Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}

const products = [
  { name: "Djembé Classique", origin: "Mali · Guinea", price: "₦185,000", image: product1 },
  { name: "Dùndún Talking Drum", origin: "Yorubaland", price: "₦240,000", image: product2 },
  { name: "Shekere Vessel", origin: "West Africa", price: "₦95,000", image: product3 },
];

function Collection() {
  return (
    <section id="collection" className="py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
          <div>
            <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-4">
              The Collection
            </p>
            <h2 className="text-white text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Instruments built<br />for a lifetime.
            </h2>
          </div>
          <a href="#" className="text-white font-bold text-lg hover:text-gold transition inline-flex items-center gap-2">
            View all instruments
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <article
              key={p.name}
              className="group relative overflow-hidden rounded-md bg-forest-accent/20 border border-white/5 hover:border-gold/40 transition-all duration-500"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  width={900}
                  height={1100}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-7 flex items-start justify-between">
                <div>
                  <h3 className="text-white text-xl font-bold">{p.name}</h3>
                  <p className="text-white/50 text-sm mt-1">{p.origin}</p>
                </div>
                <span className="text-gold font-bold">{p.price}</span>
              </div>
              <div className="absolute top-5 right-5 size-10 rounded-full bg-forest-deep/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-gold group-hover:text-[#0A0A0A] group-hover:border-gold transition">
                +
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Craft() {
  return (
    <section id="craft" className="py-32 px-6 lg:px-10 bg-forest-deep">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img
            src={craftImage}
            alt="Artisan crafting a djembe"
            width={1024}
            height={1280}
            loading="lazy"
            className="rounded-md w-full"
          />
          <div className="absolute -bottom-6 -right-6 hidden md:block bg-gold text-[#0A0A0A] p-6 rounded-md max-w-[220px]">
            <p className="text-4xl font-bold leading-none">42</p>
            <p className="text-sm mt-2 font-medium">Master artisans across West Africa</p>
          </div>
        </div>
        <div>
          <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-6">
            The Craft
          </p>
          <h2 className="text-white text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Every drum tells<br />a story of hands.
          </h2>
          <p className="mt-8 text-white/70 text-xl font-light leading-relaxed">
            From the carving of Lenké wood to the stretching of goatskin,
            every instrument passes through the hands of artisans whose
            craft has been refined across generations.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8">
            {[
              { label: "Years of heritage", value: "120+" },
              { label: "Workshop locations", value: "8" },
              { label: "Instruments shipped", value: "12K" },
              { label: "Countries reached", value: "47" },
            ].map((s) => (
              <div key={s.label} className="border-l-2 border-gold pl-4">
                <p className="text-white text-3xl font-bold">{s.value}</p>
                <p className="text-white/50 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Heritage() {
  return (
    <section id="heritage" className="py-32 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-6">
          Heritage
        </p>
        <blockquote className="text-white text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
          "Rhythm is the heartbeat of a people.<br />
          <span className="text-white/40">We build instruments to carry it forward."</span>
        </blockquote>
        <div className="mt-12 inline-flex items-center gap-4 text-white/60">
          <div className="size-12 rounded-full bg-gold/20 border border-gold/40" />
          <div className="text-left">
            <p className="text-white font-bold">Adewale Okonkwo</p>
            <p className="text-sm">Founder, Master Drum Maker</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-forest-accent/40 to-forest-deep border border-white/10 rounded-md px-10 py-20 lg:py-28 text-center">
        <h2 className="text-white text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
          Find your rhythm.
        </h2>
        <p className="mt-6 text-white/70 text-xl font-light max-w-2xl mx-auto">
          Join thousands of musicians, schools, and collectors who play instruments
          crafted by Zenbeatz artisans.
        </p>
        <form className="mt-12 max-w-md mx-auto flex gap-3">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 h-12 rounded px-4 bg-white/5 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-gold transition"
          />
          <button className="h-12 px-6 text-sm font-bold rounded bg-gold text-[#0A0A0A] hover:bg-gold-hover transition shadow-elegant">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 lg:px-10 py-14">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-2 text-white font-bold tracking-tight text-xl">
          <span className="size-2 rounded-full bg-gold" />
          ZENBEATZ
        </div>
        <p className="text-white/40 text-sm">
          © 2026 Zenbeatz Percussion Co. · Lagos, Nigeria
        </p>
        <div className="flex gap-6 text-sm text-white/60">
          <a href="#" className="hover:text-white">Instagram</a>
          <a href="#" className="hover:text-white">YouTube</a>
          <a href="#" className="hover:text-white">Spotify</a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-forest-deep">
      <Nav />
      <Hero />
      <Collection />
      <Craft />
      <Heritage />
      <CTA />
      <Footer />
    </div>
  );
}
