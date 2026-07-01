import { j as jsxRuntimeExports } from "../_libs/react.mjs";
const heroImage = "/assets/hero-drums-Cp4wmMFb.jpg";
const woodImage = "/assets/wood-CJYYtfeM.jpg";
const stick5A = "/assets/stick-5a-CjvNRltU.jpg";
const stick5B = "/assets/stick-5b-CBXquBhC.jpg";
const stick7A = "/assets/stick-7a-DNoxoCuW.jpg";
const stick2B = "/assets/stick-2b-C-6Fvyez.jpg";
const teamDaniel = "/assets/team-daniel-B5yfvHYZ.jpg";
const teamSani = "/assets/team-sani-DWKAFg2O.jpg";
const teamGideon = "/assets/team-gideon-sfTUwUNP.jpg";
const teamDorcas = "/assets/team-dorcas-rUMzlL3p.jpg";
const teamPeace = "/assets/team-peace-Bjgew2oj.jpg";
const teamAntonia = "/assets/team-antonia-CC3CheQ9.jpg";
const NAV_LINKS = [{
  label: "About",
  href: "#about"
}, {
  label: "Products",
  href: "#products"
}, {
  label: "Why Us",
  href: "#why"
}, {
  label: "Gallery",
  href: "#gallery"
}, {
  label: "Contact",
  href: "#contact"
}];
function Nav() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-forest-deep/70 border-b border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#top", className: "text-white font-black tracking-[0.15em] text-xl", children: "ZENBEATZ" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "hidden md:flex items-center gap-9 text-[15px] text-white/75", children: NAV_LINKS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: l.href, className: "hover:text-white transition", children: l.label }) }, l.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contact", className: "h-11 inline-flex items-center px-5 text-sm font-bold rounded-md bg-gold text-[#0A0A0A] hover:bg-gold-hover transition shadow-gold", children: "Partner With Us" })
  ] }) });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "top", className: "relative min-h-screen flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImage, alt: "Zenbeatz premium drumsticks", width: 1920, height: 1280, className: "absolute inset-0 w-full h-full object-cover opacity-90" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-forest-deep/60 via-forest-deep/40 to-forest-deep/90" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--forest-deep)_95%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-gold/10 blur-[120px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-6xl mx-auto px-6 text-center pt-24 pb-16 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gold text-xs sm:text-sm tracking-[0.45em] font-semibold uppercase mb-10", children: "Premium African Percussion" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-white font-black leading-[0.9] tracking-tight text-[18vw] sm:text-[14vw] md:text-[11vw] lg:text-[10rem]", children: "ZENBEATZ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex items-center justify-center gap-4 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-12 sm:w-24 bg-white/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg sm:text-2xl font-light tracking-wide whitespace-nowrap", children: "Crafted in Nigeria. Built for the World." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-12 sm:w-24 bg-white/30" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 mx-auto max-w-2xl text-white/60 text-base sm:text-lg leading-relaxed", children: "World-class drumsticks manufactured with premium Mangroove hardwood. Wholesale & distribution partnerships available worldwide." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-wrap justify-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contact", className: "h-14 px-8 inline-flex items-center text-sm font-bold tracking-wider rounded-md bg-gold text-[#0A0A0A] hover:bg-gold-hover transition shadow-gold hover-scale", children: "BECOME A PARTNER" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#products", className: "h-14 px-8 inline-flex items-center text-sm font-bold tracking-wider rounded-md bg-transparent border border-white/25 text-white hover:bg-white/10 hover:border-white/50 transition", children: "VIEW COLLECTION" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#about", "aria-label": "Scroll to about", className: "absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-gold transition animate-[pulse_2.4s_ease-in-out_infinite]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 9l6 6 6-6", strokeLinecap: "round", strokeLinejoin: "round" }) }) })
  ] });
}
function Eyebrow({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gold text-xs sm:text-sm tracking-[0.4em] font-semibold uppercase mb-5", children });
}
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "about", className: "relative py-32 px-6 lg:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "Our Story" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-white text-4xl md:text-6xl font-black tracking-tight leading-[1.05]", children: [
        "A Vision That",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Took Rhythm"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-5 text-white/65 text-base md:text-lg leading-relaxed font-light", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "In 2023, Zenbeatz was founded in Lagos, Nigeria, with a main office in Houston, Texas, with one bold mission: to become the leading drumstick manufacturer in Africa and place Nigeria on the global percussion map." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "For years, Africa has imported its drumsticks from overseas. As a professional drummer, I experienced this firsthand. I always dreamed of expanding my craft beyond performance — into creation." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "border-l-2 border-gold pl-5 text-white/90 italic", children: '"So I decided to change the narrative. Zenbeatz was born to manufacture world-class drumsticks right here in Nigeria — drumsticks that echo our name across stages, studios, churches, and arenas around the world."' })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8", children: [{
        v: "2023",
        l: "Founded"
      }, {
        v: "2",
        l: "Locations"
      }, {
        v: "∞",
        l: "Ambition"
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gold text-3xl md:text-4xl font-black", children: s.v }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs tracking-widest uppercase mt-2", children: s.l })
      ] }, s.l)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-xl overflow-hidden border border-white/10 shadow-gold aspect-[3/4]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { src: "https://www.youtube.com/embed/q9AHROKqgyo", title: "Zenbeatz video", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", allowFullScreen: true, className: "w-full h-full" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-6 -left-6 bg-forest-deep border border-gold/40 rounded-lg px-6 py-4 shadow-gold backdrop-blur-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl", children: "🇺🇸" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-xs tracking-widest uppercase mt-1", children: "Made in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-lg", children: "USA" })
      ] })
    ] })
  ] }) });
}
function Material() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-32 px-6 lg:px-10 bg-forest-deep", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative order-2 lg:order-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: woodImage, alt: "Premium Mangroove hardwood", width: 1200, height: 1500, loading: "lazy", className: "w-full h-[600px] object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-6 left-6 bg-forest-deep/80 backdrop-blur-md border border-white/10 rounded-lg p-5 max-w-[240px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl", children: "🌳" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold mt-2", children: "Mangroove Hardwood" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/55 text-sm mt-1", children: "Rare, premium wood sourced sustainably from Nigeria's forests." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order-1 lg:order-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "The Material" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-white text-4xl md:text-6xl font-black tracking-tight leading-[1.05]", children: [
          "The Power of ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Mangroove Wood" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-white/65 text-lg leading-relaxed font-light", children: "At the heart of every Zenbeatz drumstick lies rare, premium Mangroove hardwood — carefully selected for exceptional performance. Mangroove wood gives our sticks strength without sacrificing feel. The result? A drumstick that sits perfectly in your hand and responds with precision every time you strike." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 space-y-3", children: ["Superior durability", "Natural balance", "Firm, confident grip", "Long-lasting performance", "Consistent tone response"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 text-white/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-gold shadow-gold" }),
          t
        ] }, t)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-lg border border-gold/20 bg-gold/5 p-5 text-white/70 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold font-bold", children: "Quality Assurance:" }),
          " Each pair is engineered to meet American production standards, ensuring consistent weight, balance, and finish across every batch."
        ] })
      ] })
    ] })
  ] });
}
const PRODUCTS = [{
  code: "5A",
  image: stick5A,
  title: "Versatile & Balanced",
  desc: "The industry standard. Perfect for all genres and playing styles. Ideal for worship, studio, and live performance.",
  specs: {
    Length: '16"',
    Diameter: '.565"',
    Weight: "Medium"
  },
  popular: true
}, {
  code: "5B",
  image: stick5B,
  title: "Powerful & Bold",
  desc: "Extra thickness for more power and projection. Great for rock, gospel, and high-energy performances.",
  specs: {
    Length: '16"',
    Diameter: '.595"',
    Weight: "Medium-Heavy"
  }
}, {
  code: "7A",
  image: stick7A,
  title: "Light & Fast",
  desc: "Thinner profile for speed and finesse. Perfect for jazz, acoustic sets, and intricate patterns.",
  specs: {
    Length: '15.5"',
    Diameter: '.540"',
    Weight: "Light"
  }
}, {
  code: "2B",
  image: stick2B,
  title: "Heavy & Commanding",
  desc: "Maximum weight and reach. Built for power drummers, marching, and stadium-sized sound.",
  specs: {
    Length: '16.25"',
    Diameter: '.630"',
    Weight: "Heavy"
  }
}];
function Products() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "products", className: "relative py-32 px-6 lg:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-3xl mx-auto mb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "Our Collection" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-white text-4xl md:text-6xl font-black tracking-tight leading-[1.05]", children: [
        "Built for ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Every Drummer" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-white/65 text-lg font-light leading-relaxed", children: "Whether you're leading worship, recording in the studio, performing on stage, or teaching the next generation — Zenbeatz is built for you." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-7", children: PRODUCTS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent hover:border-gold/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-gold", children: [
      p.popular && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-5 left-5 z-10 text-[10px] tracking-[0.25em] font-bold uppercase bg-gold text-[#0A0A0A] px-3 py-1.5 rounded", children: "Most Popular" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[5/3] overflow-hidden bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: `Zenbeatz ${p.code}`, width: 900, height: 540, loading: "lazy", className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gold text-xs tracking-[0.3em] font-semibold", children: "ZENBEATZ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-5xl font-black tracking-tight", children: p.code }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white/90 text-lg font-bold", children: p.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-white/60 text-sm leading-relaxed", children: p.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5", children: Object.entries(p.specs).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-white/40 text-[10px] tracking-widest uppercase", children: k }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-white font-bold text-sm mt-1", children: v })
        ] }, k)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#contact", className: "mt-6 inline-flex items-center gap-2 text-gold font-bold text-sm hover:gap-3 transition-all", children: [
          "Request Wholesale Quote",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "→" })
        ] })
      ] })
    ] }, p.code)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 text-center rounded-xl border border-dashed border-gold/30 bg-gold/5 p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gold text-xs tracking-[0.3em] font-bold uppercase", children: "Coming Soon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 mt-3 max-w-2xl mx-auto", children: "Our long-term vision includes expanding into manufacturing Zenbeatz drum sets, building a complete African percussion brand recognized worldwide." })
    ] })
  ] }) });
}
const WHY = [{
  icon: "🌳",
  t: "Premium Mangroove Hardwood",
  d: "Rare, sustainably sourced wood with exceptional durability and natural balance."
}, {
  icon: "✓",
  t: "American Standard QC",
  d: "Every pair meets rigorous international quality control standards."
}, {
  icon: "⚖",
  t: "Precision-Balanced",
  d: "Computer-matched pairs ensure perfect weight distribution."
}, {
  icon: "🔥",
  t: "Performance-Tested",
  d: "Rigorously tested for durability under professional playing conditions."
}, {
  icon: "🇳🇬",
  t: "Made in Nigeria",
  d: "Proudly manufactured in Lagos, supporting African excellence."
}, {
  icon: "🥁",
  t: "By Drummers, For Drummers",
  d: "Designed by professional percussionists who understand your needs."
}];
function Why() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "why", className: "relative py-32 px-6 lg:px-10 bg-forest-deep", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "Why Partner With Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-white text-4xl md:text-6xl font-black tracking-tight leading-[1.05]", children: [
          "Why Choose ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Zenbeatz?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-white/65 text-lg font-light leading-relaxed", children: "We're not just selling drumsticks. We're building partnerships that bring African excellence to the global stage." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: WHY.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-xl border border-white/10 bg-white/[0.03] p-8 hover:border-gold/40 hover:bg-white/[0.05] transition-all hover:-translate-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-2xl group-hover:bg-gold/25 transition", children: w.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-white text-xl font-bold", children: w.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-white/60 text-sm leading-relaxed", children: w.d })
      ] }, w.t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "mt-20 max-w-4xl mx-auto text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-2xl md:text-4xl font-light italic leading-relaxed", children: '"Zenbeatz is proof that Nigeria can manufacture at a global level. It is proof that Africa can compete. It is proof that rhythm has no borders."' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-6 text-gold text-sm tracking-[0.3em] font-bold uppercase", children: "— The Zenbeatz Vision" })
      ] })
    ] })
  ] });
}
const TEAM = [{
  name: "Daniel Palama",
  role: "Founder & CEO",
  bio: "Professional drummer, entrepreneur, and visionary behind Zenbeatz. Daniel's passion for percussion and African excellence drove him to build Nigeria's first world-class drumstick brand.",
  tags: ["Lagos, Nigeria", "Houston, Texas", "Professional Drummer"],
  initials: "DP",
  photo: teamDaniel
}, {
  name: "Sani Sule",
  role: "Marketing Director",
  bio: "A results-driven marketing leader committed to amplifying the Zenbeatz brand globally through strategic partnerships and bold storytelling.",
  tags: ["Brand Strategy", "Global Outreach", "Wholesale Growth"],
  initials: "SS",
  photo: teamSani
}, {
  name: "Gideon Monday Simon",
  role: "Chief Engineer",
  bio: "The technical mastermind behind every Zenbeatz drumstick. Gideon leads the engineering and manufacturing process to world-class standards.",
  tags: ["Manufacturing", "Quality Control", "Precision Engineering"],
  initials: "GS",
  photo: teamGideon
}, {
  name: "Dorcas Adekunle",
  role: "HR / Secretary",
  bio: "The organizational backbone of Zenbeatz, Dorcas ensures seamless operations and a people-first culture across the team.",
  tags: ["People & Culture", "Operations", "Team Coordination"],
  initials: "DA",
  photo: teamDorcas
}, {
  name: "Peace Palama",
  role: "Chief Accountant",
  bio: "The financial guardian of the Zenbeatz vision. Peace oversees the company's financial health as the brand grows globally.",
  tags: ["Finance", "Accounting", "Fiscal Strategy"],
  initials: "PP",
  photo: teamPeace
}, {
  name: "Antonia",
  role: "Chief Legal",
  bio: "The legal compass of Zenbeatz — safeguarding the company's interests across contracts, intellectual property, and compliance.",
  tags: ["Legal Affairs", "Compliance", "Contracts"],
  initials: "AN",
  photo: teamAntonia
}];
function Leadership() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "gallery", className: "relative py-32 px-6 lg:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "The Visionary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-white text-4xl md:text-6xl font-black tracking-tight leading-[1.05]", children: [
        "Meet the ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Leadership" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-7", children: TEAM.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden hover:border-gold/40 transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[4/3] relative overflow-hidden bg-forest-deep", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: m.photo, alt: m.name, loading: "lazy", className: "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gold text-xs tracking-[0.3em] font-semibold uppercase", children: m.role }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-white text-2xl font-bold", children: m.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-white/60 text-sm leading-relaxed", children: m.bio }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex flex-wrap gap-2", children: m.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] px-3 py-1 rounded-full border border-white/15 text-white/65", children: t }, t)) })
      ] })
    ] }, m.name)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "mt-20 max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-2xl md:text-4xl font-light italic leading-relaxed", children: `"When you play Zenbeatz, you're not just playing a drumstick. You're playing a movement."` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-6 text-gold text-sm tracking-[0.3em] font-bold uppercase", children: "— Daniel Palama, Founder" })
    ] })
  ] }) });
}
function Contact() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "contact", className: "relative py-32 px-6 lg:px-10 bg-forest-deep", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-gold/10 blur-[140px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "Partner With Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-white text-4xl md:text-6xl font-black tracking-tight leading-[1.05]", children: [
          "Become a ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Zenbeatz Distributor" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-white/65 text-lg font-light leading-relaxed", children: "Join us in bringing African excellence to drummers worldwide. We offer competitive wholesale pricing, reliable supply, and dedicated partner support." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
          [{
            t: "Offices",
            lines: ["Lagos, Nigeria (Manufacturing)", "Houston, Texas (Sales)"]
          }, {
            t: "Email",
            lines: ["info@zenbeatz.org"]
          }, {
            t: "Phone",
            lines: ["+234 906 377 0004"]
          }].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-white/[0.03] p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-gold text-xs tracking-[0.3em] font-bold uppercase", children: b.t }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-1 text-white/80", children: b.lines.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: l }, l)) })
          ] }, b.t)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["🇳🇬 Made in Nigeria", "🇺🇸 US Office", "🌍 Global Shipping"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-3 py-2 rounded-full border border-gold/30 bg-gold/5 text-white/80", children: t }, t)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => e.preventDefault(), className: "lg:col-span-3 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 md:p-10 backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white text-2xl font-bold", children: "Wholesale Inquiry" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 grid sm:grid-cols-2 gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Company Name *", placeholder: "Your company" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Contact Name *", placeholder: "Your name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email *", placeholder: "you@company.com", type: "email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone", placeholder: "+1 ..." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Country *", placeholder: "Country" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-white/70 text-xs tracking-widest uppercase mb-2", children: "Business Type *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "w-full h-12 px-4 rounded-md bg-white/5 border border-white/15 text-white focus:outline-none focus:border-gold transition", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: "bg-forest-deep", children: "Select type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: "bg-forest-deep", children: "Wholesaler" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: "bg-forest-deep", children: "Retailer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: "bg-forest-deep", children: "Distributor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: "bg-forest-deep", children: "Music Store" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: "bg-forest-deep", children: "Other" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Estimated Order Quantity", placeholder: "e.g. 500 pairs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-white/70 text-xs tracking-widest uppercase mb-2", children: "Products Interested In" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["5A", "5B", "7A", "2B"].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "peer sr-only" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-2 rounded-full border border-white/20 text-white/80 text-sm peer-checked:bg-gold peer-checked:text-[#0A0A0A] peer-checked:border-gold transition", children: p })
              ] }, p)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-white/70 text-xs tracking-widest uppercase mb-2", children: "Message" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, placeholder: "Tell us about your business and partnership goals...", className: "w-full px-4 py-3 rounded-md bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition resize-none" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "mt-8 w-full h-14 rounded-md bg-gold text-[#0A0A0A] font-bold tracking-widest text-sm uppercase hover:bg-gold-hover transition shadow-gold", children: "Submit Wholesale Inquiry" })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  placeholder,
  type = "text"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-white/70 text-xs tracking-widest uppercase mb-2", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, placeholder, className: "w-full h-12 px-4 rounded-md bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition" })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-white/10 px-6 lg:px-10 py-12 bg-forest-deep", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-black tracking-[0.15em] text-lg", children: "ZENBEATZ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-sm mt-1", children: "Premium African Percussion" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-sm", children: "© 2026 Zenbeatz · Lagos, Nigeria · Houston, Texas" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5 text-sm text-white/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-gold transition", children: "Instagram" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-gold transition", children: "YouTube" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-gold transition", children: "TikTok" })
    ] })
  ] }) });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-forest-deep text-white selection:bg-gold selection:text-[#0A0A0A]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Material, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Products, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Why, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Leadership, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Index as component
};
