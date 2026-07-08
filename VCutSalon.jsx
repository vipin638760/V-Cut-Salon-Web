import { useState, useEffect, useRef } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const BRANCHES = [
  { name: "V-Cut DLF Akshayanagar", type: "unisex", lat: 12.8731, lng: 77.6101, phone: "9836577807", timing: "9AM–9PM", area: "Akshayanagar" },
  { name: "V-Cut Hulimavu 1", type: "mens", lat: 12.8813, lng: 77.6074, phone: "9836577807", timing: "8AM–9:30PM", area: "Hulimavu" },
  { name: "V-Cut Hulimavu 2", type: "mens", lat: 12.882, lng: 77.608, phone: "9836577807", timing: "8AM–9:30PM", area: "Hulimavu" },
  { name: "V-Cut Arekere", type: "mens", lat: 12.8931, lng: 77.6145, phone: "9836577807", timing: "8AM–9:30PM", area: "Arekere" },
  { name: "V-Cut Vijay Bank Layout", type: "mens", lat: 12.8876, lng: 77.6132, phone: "9836577807", timing: "8AM–9:30PM", area: "Vijay Bank Layout" },
  { name: "V-Cut JP Nagar", type: "mens", lat: 12.9009, lng: 77.5889, phone: "9836577807", timing: "8AM–9:30PM", area: "JP Nagar" },
  { name: "V-Cut Banashankari", type: "mens", lat: 12.9542, lng: 77.5765, phone: "9836577807", timing: "8AM–9:30PM", area: "Banashankari" },
  { name: "V-Cut Yelahanka 1", type: "mens", lat: 13.1004, lng: 77.5963, phone: "9836577807", timing: "8AM–9:30PM", area: "Yelahanka" },
  { name: "V-Cut Yelahanka 2", type: "mens", lat: 13.1012, lng: 77.5971, phone: "9836577807", timing: "8AM–9:30PM", area: "Yelahanka" },
  { name: "V-Cut Kudlu Road/Harlur", type: "mens", lat: 12.8978, lng: 77.6467, phone: "9790906435", timing: "8AM–9:30PM", area: "Harlur" },
  { name: "V-Cut Marathahalli", type: "mens", lat: 12.9591, lng: 77.6974, phone: "9836577807", timing: "8AM–9:30PM", area: "Marathahalli" },
  { name: "V-Cut Hulimavu Unisex", type: "unisex", lat: 12.8815, lng: 77.6076, phone: "9836577807", timing: "9AM–9PM", area: "Hulimavu" },
  { name: "V-Cut DLF Unisex", type: "unisex", lat: 12.8729, lng: 77.6099, phone: "9836577807", timing: "9AM–9PM", area: "DLF" },
  { name: "V-Cut HSR Layout Unisex", type: "unisex", lat: 12.9116, lng: 77.6389, phone: "9836577807", timing: "9AM–9PM", area: "HSR Layout" },
  { name: "V-Cut Jayanagar Unisex", type: "unisex", lat: 12.9258, lng: 77.5832, phone: "9836577807", timing: "9AM–9PM", area: "Jayanagar" },
];

const SERVICES = [
  { id: 1, name: "Basic Haircut (Ladies)", cat: "hair", price: 400, gender: "ladies", icon: "✂️" },
  { id: 2, name: "Adv Haircut (Ladies)", cat: "hair", price: 700, gender: "ladies", icon: "✂️" },
  { id: 3, name: "Basic Haircut (Gents)", cat: "hair", price: 150, gender: "gents", icon: "✂️" },
  { id: 4, name: "Adv Haircut (Gents)", cat: "hair", price: 250, gender: "gents", icon: "✂️" },
  { id: 5, name: "Baby Haircut", cat: "hair", price: 200, gender: "both", icon: "✂️" },
  { id: 6, name: "Keratin Treatment (GK)", cat: "hair", price: 3499, gender: "both", icon: "🌊" },
  { id: 7, name: "Botox Treatment", cat: "hair", price: 3999, gender: "both", icon: "🌊" },
  { id: 8, name: "Nano Plastia", cat: "hair", price: 3999, gender: "both", icon: "🌊" },
  { id: 9, name: "Smoothening", cat: "hair", price: 2599, gender: "both", icon: "🌊" },
  { id: 10, name: "Root Touchup", cat: "colour", price: 1200, gender: "both", icon: "🎨" },
  { id: 11, name: "Global Colour (Short)", cat: "colour", price: 2500, gender: "ladies", icon: "🎨" },
  { id: 12, name: "Highlights (Per Strip)", cat: "colour", price: 3000, gender: "ladies", icon: "🎨" },
  { id: 13, name: "Balayage", cat: "colour", price: 2999, gender: "ladies", icon: "🎨" },
  { id: 14, name: "Beard Colour", cat: "colour", price: 500, gender: "gents", icon: "🎨" },
  { id: 15, name: "L'Oréal Deep Nourishing Spa", cat: "spa", price: 1200, gender: "both", icon: "💆" },
  { id: 16, name: "Keratine Restore Hair Spa", cat: "spa", price: 1500, gender: "both", icon: "💆" },
  { id: 17, name: "Anti Dandruff Spa", cat: "spa", price: 1500, gender: "both", icon: "💆" },
  { id: 18, name: "Korean Glass Skin Facial", cat: "skin", price: 1000, gender: "both", icon: "✨" },
  { id: 19, name: "VLCC Gold Facial", cat: "skin", price: 1100, gender: "both", icon: "✨" },
  { id: 20, name: "O3+ Facial", cat: "skin", price: 1500, gender: "both", icon: "✨" },
  { id: 21, name: "Rica Waxing (Full Body)", cat: "skin", price: 2500, gender: "ladies", icon: "🌿" },
  { id: 22, name: "Threading (Full Face)", cat: "skin", price: 250, gender: "ladies", icon: "🌿" },
  { id: 23, name: "Manicure", cat: "nails", price: 150, gender: "both", icon: "💅" },
  { id: 24, name: "Pedicure", cat: "nails", price: 200, gender: "both", icon: "💅" },
  { id: 25, name: "Men's Haircut", cat: "mens", price: 100, gender: "gents", icon: "💈" },
  { id: 26, name: "Shaving / Trimming", cat: "mens", price: 50, gender: "gents", icon: "💈" },
  { id: 27, name: "Head Massage", cat: "mens", price: 150, gender: "gents", icon: "💈" },
  { id: 28, name: "Combo Basic (Cut+Shave)", cat: "mens", price: 400, gender: "gents", icon: "💈" },
  { id: 29, name: "Party Makeup", cat: "bridal", price: 2500, gender: "ladies", icon: "👰" },
  { id: 30, name: "Bridal Makeup", cat: "bridal", price: 10000, gender: "ladies", icon: "👰" },
];

const HOMEPAGE_SERVICES = [
  { icon: "✂️", name: "Haircut & Styling", desc: "Precision cuts tailored to your face shape by expert stylists.", price: "Ladies from ₹400 · Gents from ₹150", cat: "hair" },
  { icon: "🎨", name: "Hair Colouring", desc: "Global colour, highlights, balayage using INOA, Masirel & Schwarzkopf.", price: "From ₹350", cat: "hair" },
  { icon: "💆", name: "Hair Spa", desc: "L'Oréal deep nourishing, keratine restore & anti-dandruff spa.", price: "Ladies from ₹1,200 · Gents from ₹700", cat: "spa" },
  { icon: "🌊", name: "Keratin & Smoothening", desc: "GK Keratin, Botox, Nano Plastia & Smoothening. S/M/L pricing.", price: "From ₹2,599", cat: "hair" },
  { icon: "✨", name: "Facials", desc: "20+ facial options — Korean Glass Skin, VLCC, Lotus, O3+, Shahnaz & more.", price: "From ₹700", cat: "skin" },
  { icon: "🌿", name: "Waxing & Threading", desc: "Rica, Rica Premium & Brazilian waxing. Threading from ₹30.", price: "Waxing from ₹50", cat: "skin" },
  { icon: "💅", name: "Manicure & Pedicure", desc: "Sea Blue, Aroma Magic, Raaga, Lotus Rose, Bombini & more.", price: "Mani from ₹150 · Pedi from ₹200", cat: "nails" },
  { icon: "👰", name: "Bridal Makeup", desc: "Eye, Day, Party, Evening & full Bridal makeup packages.", price: "From ₹700 · Bridal ₹10,000+", cat: "bridal" },
  { icon: "💈", name: "Men's Grooming", desc: "Haircut ₹100, Shaving ₹50, Head Massage ₹150, combos available.", price: "Combo from ₹400", cat: "mens" },
];

const TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"];
const CATS = ["all", "hair", "colour", "spa", "skin", "nails", "mens", "bridal"];

// ── STYLES ────────────────────────────────────────────────────────────────────
const styles = `
  /* Apple-style design system — light default; dark via :root[data-theme="dark"]. Brand red kept as the single accent. */
  :root {
    --p: #CC1111; --pd: #A30D0D; --pc: #FBE9E9; --opc: #8A0A0A;
    --s: #FFFFFF; --sv: #F5F5F7; --os: #1D1D1F; --osv: #6E6E73;
    --ol: #86868B; --olv: #D2D2D7;
    --card: #FFFFFF; --nav: rgba(255,255,255,0.72); --thead: #1D1D1F;
    --e1: 0 1px 2px rgba(0,0,0,.04), 0 1px 3px rgba(0,0,0,.05);
    --e2: 0 4px 14px rgba(0,0,0,.06), 0 2px 6px rgba(0,0,0,.04);
    --e3: 0 12px 34px rgba(0,0,0,.10), 0 4px 12px rgba(0,0,0,.06);
    --r: 18px; --rsm: 12px; --rf: 980px;
    --font-display: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif;
    --font-body: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
  }
  :root[data-theme="dark"] {
    --p: #FF453A; --pd: #FF6961; --pc: rgba(255,69,58,.16); --opc: #FF8A80;
    --s: #000000; --sv: #141416; --os: #F5F5F7; --osv: #A1A1A6;
    --ol: #8E8E93; --olv: #38383B;
    --card: #1C1C1E; --nav: rgba(22,22,23,0.72); --thead: #2C2C2E;
    --e1: 0 1px 2px rgba(0,0,0,.5);
    --e2: 0 4px 14px rgba(0,0,0,.5);
    --e3: 0 12px 34px rgba(0,0,0,.6);
  }
  /* SF display needs heavier weight than the old serif to read as Apple */
  .hero h1, .sec-title, .booking-header h1, .menu-header-title, .success-title,
  .foot-brand-name, .hero-stat-n, .about-stat-n, .price-amount, .nav-brand-name,
  .svc-nm, .loc-name, .menu-cat-title, .two-col-title, .pkg-name, .loreal-banner h3,
  .menu-header-title { font-weight: 600; letter-spacing: -.022em; }
  .hero h1 em, .sec-title em { font-style: normal; color: var(--p); }
  /* Theme toggle in the nav */
  .theme-tog { width: 38px; height: 38px; border-radius: 50%; border: 1px solid var(--olv);
    background: transparent; color: var(--os); cursor: pointer; font-size: 15px; line-height: 1;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: background .2s, border-color .2s; }
  .theme-tog:hover { background: var(--sv); }
  @media (prefers-reduced-motion: reduce) { * { animation-duration: .001ms !important; transition: none !important; } }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--s); color: var(--os); overflow-x: hidden; -webkit-font-smoothing: antialiased; transition: background .35s ease, color .35s ease; }

  /* ANIMATIONS */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes shimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }
  @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: none; opacity: 1; } }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }

  .fade-up { animation: fadeUp .6s ease both; }
  .fade-in { animation: fadeIn .4s ease both; }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--sv); }
  ::-webkit-scrollbar-thumb { background: var(--olv); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--p); }

  /* SELECTION */
  ::selection { background: var(--pc); color: var(--opc); }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 500;
    height: 68px; display: flex; align-items: center;
    padding: 0 24px; gap: 12px;
    background: var(--nav);
    backdrop-filter: blur(16px) saturate(180%);
    border-bottom: 1px solid var(--olv);
    box-shadow: var(--e1);
    transition: all .3s;
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
  .nav-logo-mark {
    width: 40px; height: 40px; border-radius: 10px;
    background: var(--p); display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,.12);
  }
  .nav-logo-mark svg { width: 26px; height: 26px; }
  .nav-brand-name { font-family: var(--font-display); font-size: 18px; color: var(--p); letter-spacing: -.3px; line-height: 1.1; }
  .nav-brand-sub { font-size: 9px; letter-spacing: 2.5px; color: var(--osv); text-transform: uppercase; margin-top: 1px; }
  .nav-links { display: flex; gap: 2px; flex: 1; justify-content: center; }
  .nav-link {
    padding: 8px 16px; border-radius: var(--rf);
    font-size: 13px; font-weight: 500; color: var(--osv);
    text-decoration: none; transition: all .2s; letter-spacing: .2px; border: none;
    background: transparent; cursor: pointer; font-family: var(--font-body);
  }
  .nav-link:hover { background: var(--sv); color: var(--os); }
  .nav-link.active { background: var(--pc); color: var(--opc); font-weight: 600; }
  .nav-cta {
    background: var(--p); color: #fff; border: none;
    border-radius: var(--rf); padding: 10px 22px;
    font-size: 13px; font-weight: 700; letter-spacing: .4px;
    cursor: pointer; text-decoration: none; font-family: var(--font-body);
    box-shadow: 0 2px 12px rgba(0,0,0,.14); transition: all .2s;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .nav-cta:hover { background: var(--pd); transform: translateY(-1px); box-shadow: 0 4px 20px rgba(0,0,0,.16); }
  .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
  .hamburger span { width: 22px; height: 2px; background: var(--os); border-radius: 2px; display: block; transition: all .3s; }

  /* HERO */
  .hero {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    text-align: center; padding: 100px 20px 60px;
    background: linear-gradient(180deg, var(--s) 0%, var(--sv) 100%);
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 60% at 50% 70%, rgba(204,17,17,.07) 0%, transparent 70%);
  }
  .hero-grid-bg {
    position: absolute; inset: 0;
    background-image: linear-gradient(var(--olv) 1px, transparent 1px), linear-gradient(90deg, var(--olv) 1px, transparent 1px);
    background-size: 48px 48px; opacity: .3;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
  }
  .hero-inner { position: relative; z-index: 2; max-width: 820px; margin: 0 auto; }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--card); border: 1.5px solid var(--olv); border-radius: var(--rf);
    padding: 8px 20px; font-size: 12px; font-weight: 600;
    letter-spacing: 1.5px; text-transform: uppercase; color: var(--p);
    margin-bottom: 28px; box-shadow: var(--e1);
    animation: fadeUp .6s ease both;
  }
  .hero-eyebrow-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--p); animation: pulse 2s ease-in-out infinite; }
  .hero h1 {
    font-family: var(--font-display); font-size: clamp(2.2rem, 6vw, 4.5rem);
    font-weight: 400; line-height: 1.1; color: var(--os);
    margin-bottom: 20px; letter-spacing: -.5px;
    animation: fadeUp .7s .1s ease both;
  }
  .hero h1 em { font-style: italic; color: var(--p); }
  .hero-desc {
    font-size: clamp(.95rem, 2vw, 1.1rem); color: var(--osv); line-height: 1.8;
    max-width: 520px; margin: 0 auto 36px;
    animation: fadeUp .7s .2s ease both;
  }
  .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 56px; animation: fadeUp .7s .3s ease both; }
  .btn-filled {
    background: var(--p); color: #fff; border: none; border-radius: var(--rf);
    padding: 15px 32px; font-size: 14px; font-weight: 700; letter-spacing: .4px;
    cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
    text-decoration: none; font-family: var(--font-body);
    box-shadow: 0 4px 20px rgba(0,0,0,.14); transition: all .25s;
  }
  .btn-filled:hover { background: var(--pd); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,.16); }
  .btn-tonal {
    background: var(--pc); color: var(--opc); border: none; border-radius: var(--rf);
    padding: 15px 32px; font-size: 14px; font-weight: 600;
    cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
    text-decoration: none; font-family: var(--font-body); transition: all .2s;
  }
  .btn-tonal:hover { filter: brightness(.95); transform: translateY(-1px); }
  .btn-outlined {
    background: transparent; color: var(--p); border: 1.5px solid var(--olv);
    border-radius: var(--rf); padding: 14px 32px; font-size: 14px; font-weight: 600;
    cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
    text-decoration: none; font-family: var(--font-body); transition: all .2s;
  }
  .btn-outlined:hover { background: var(--pc); border-color: transparent; }
  .hero-stats {
    display: grid; grid-template-columns: repeat(4, 1fr);
    background: var(--card); border-radius: var(--r); box-shadow: var(--e2);
    border: 1px solid var(--olv); overflow: hidden;
    animation: fadeUp .7s .4s ease both;
  }
  .hero-stat { padding: 24px 16px; text-align: center; border-right: 1px solid var(--olv); }
  .hero-stat:last-child { border-right: none; }
  .hero-stat-n { font-family: var(--font-display); font-size: 2.2rem; color: var(--p); line-height: 1; }
  .hero-stat-l { font-size: 11px; color: var(--osv); letter-spacing: 1px; text-transform: uppercase; margin-top: 6px; }

  /* SECTIONS */
  section { padding: 88px 20px; }
  .sec-inner { max-width: 1200px; margin: 0 auto; }
  .sec-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: var(--p); margin-bottom: 10px; }
  .sec-title { font-family: var(--font-display); font-size: clamp(1.8rem, 3.5vw, 2.8rem); color: var(--os); margin-bottom: 16px; line-height: 1.15; }
  .sec-title em { font-style: italic; color: var(--p); }
  .sec-desc { font-size: .95rem; color: var(--osv); line-height: 1.8; max-width: 480px; margin-bottom: 44px; }

  /* ABOUT */
  #about { background: var(--card); }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; max-width: 1100px; margin: 0 auto; }
  .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; }
  .about-stat { background: var(--sv); padding: 32px 20px; text-align: center; }
  .about-stat:first-child { border-radius: var(--r) 0 0 0; }
  .about-stat:nth-child(2) { border-radius: 0 var(--r) 0 0; }
  .about-stat:nth-child(3) { border-radius: 0 0 0 var(--r); }
  .about-stat:last-child { border-radius: 0 0 var(--r) 0; display: flex; align-items: center; justify-content: center; background: var(--pc); }
  .about-stat-n { font-family: var(--font-display); font-size: 2.8rem; color: var(--p); }
  .about-stat-l { font-size: 11px; color: var(--osv); letter-spacing: 1px; text-transform: uppercase; margin-top: 6px; }
  .about-feats { list-style: none; display: flex; flex-direction: column; gap: 14px; margin-top: 28px; }
  .about-feats li { display: flex; align-items: center; gap: 12px; font-size: .92rem; color: var(--osv); }
  .about-feat-dot { width: 22px; height: 22px; border-radius: 50%; background: var(--pc); border: 2px solid var(--p); flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 11px; color: var(--p); font-weight: 700; }

  /* SERVICES */
  #services { background: var(--s); }
  .svc-head { text-align: center; margin-bottom: 44px; }
  .svc-head .sec-desc { margin: 0 auto 36px; }
  .filter-chips { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 40px; }
  .fchip {
    padding: 8px 20px; border-radius: var(--rf); font-size: 13px; font-weight: 500;
    border: 1.5px solid var(--olv); color: var(--osv); background: transparent;
    cursor: pointer; transition: all .2s; font-family: var(--font-body); letter-spacing: .2px;
  }
  .fchip:hover { background: var(--sv); }
  .fchip.on { background: var(--p); color: #fff; border-color: var(--p); font-weight: 600; }
  .svc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
  .svc-card {
    background: var(--card); border-radius: var(--r); border: 1px solid var(--olv);
    padding: 26px; box-shadow: var(--e1); transition: all .3s; cursor: pointer;
    position: relative; overflow: hidden;
  }
  .svc-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--pc) 0%, transparent 60%); opacity: 0; transition: opacity .3s; }
  .svc-card:hover { box-shadow: var(--e3); transform: translateY(-5px); border-color: var(--p); }
  .svc-card:hover::after { opacity: 1; }
  .svc-ic { font-size: 1.9rem; margin-bottom: 14px; position: relative; z-index: 1; }
  .svc-nm { font-family: var(--font-display); font-size: 1.1rem; color: var(--os); margin-bottom: 8px; position: relative; z-index: 1; }
  .svc-ds { font-size: .85rem; color: var(--osv); line-height: 1.7; margin-bottom: 14px; position: relative; z-index: 1; }
  .svc-pr { font-size: .82rem; font-weight: 700; color: var(--p); position: relative; z-index: 1; }
  .loreal-banner {
    background: linear-gradient(135deg, var(--pc), var(--card));
    border: 1.5px solid var(--olv); border-radius: var(--r);
    padding: 36px; text-align: center; max-width: 720px; margin: 52px auto 0;
    box-shadow: var(--e1);
  }
  .loreal-banner h3 { font-family: var(--font-display); font-size: 1.4rem; color: var(--os); margin-bottom: 10px; }
  .loreal-banner p { font-size: .9rem; color: var(--osv); line-height: 1.75; margin-bottom: 18px; }
  .loreal-tag { display: inline-block; background: var(--p); color: #fff; border-radius: var(--rf); padding: 7px 20px; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }

  /* LOCATIONS */
  #locations { background: var(--card); }
  .loc-header { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 20px; margin-bottom: 36px; }
  .loc-filters { display: flex; gap: 8px; flex-wrap: wrap; }
  .lf-btn {
    padding: 8px 18px; border-radius: var(--rf); font-size: 13px; font-weight: 500;
    border: 1.5px solid var(--olv); background: transparent; color: var(--osv);
    cursor: pointer; transition: all .2s; font-family: var(--font-body);
  }
  .lf-btn:hover { background: var(--sv); }
  .lf-btn.on { background: var(--p); color: #fff; border-color: var(--p); }
  .loc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
  .loc-card {
    background: var(--s); border: 1px solid var(--olv); border-radius: var(--r);
    padding: 24px; position: relative; overflow: hidden; transition: all .25s;
  }
  .loc-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: var(--p); transform: scaleX(0); transform-origin: left; transition: transform .3s; }
  .loc-card:hover { box-shadow: var(--e2); border-color: var(--p); }
  .loc-card:hover::before { transform: scaleX(1); }
  .loc-type-tag { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 12px; border-radius: var(--rf); display: inline-block; margin-bottom: 10px; }
  .loc-type-tag.unisex { background: var(--pc); color: var(--opc); }
  .loc-type-tag.mens { background: #E8F0FE; color: #1A4899; }
  .loc-name { font-family: var(--font-display); font-size: 1.1rem; color: var(--os); margin-bottom: 12px; }
  .loc-meta { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--osv); margin-bottom: 6px; }
  .loc-btns { display: flex; gap: 8px; margin-top: 18px; flex-wrap: wrap; }
  .loc-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: var(--rsm); font-size: 12px; font-weight: 600; text-decoration: none; border: 1.5px solid var(--olv); color: var(--osv); transition: all .2s; font-family: var(--font-body); cursor: pointer; background: transparent; }
  .loc-btn:hover { background: var(--sv); }
  .loc-btn.primary { background: var(--p); color: #fff; border-color: var(--p); }
  .loc-btn.primary:hover { background: var(--pd); }

  /* BOOKING CTA */
  #booking-cta { background: var(--p); padding: 88px 20px; }
  .bk-inner { max-width: 680px; margin: 0 auto; text-align: center; }
  .bk-inner .sec-eyebrow { color: rgba(255,255,255,.75); }
  .bk-inner .sec-title { color: #fff; margin-bottom: 16px; }
  .bk-inner .sec-desc { color: rgba(255,255,255,.8); margin: 0 auto 40px; max-width: 480px; }
  .bk-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .bk-btns .btn-filled { background: #ffffff; color: var(--p); box-shadow: 0 4px 20px rgba(0,0,0,.15); }
  .bk-btns .btn-filled:hover { background: #f5f5f5; }
  .bk-btns .btn-outlined { border-color: rgba(255,255,255,.4); color: #fff; }
  .bk-btns .btn-outlined:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.6); }

  /* FOOTER */
  footer { background: #1A0F0F; color: #fff; padding: 60px 20px 28px; }
  .foot-inner { max-width: 1200px; margin: 0 auto; }
  .foot-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
  .foot-brand-name { font-family: var(--font-display); font-size: 1.4rem; color: var(--p); margin-bottom: 4px; }
  .foot-tagline { font-size: .85rem; color: rgba(255,255,255,.45); line-height: 1.75; max-width: 240px; margin-top: 14px; }
  .foot-col h4 { font-size: .72rem; letter-spacing: 2px; text-transform: uppercase; color: var(--p); margin-bottom: 18px; }
  .foot-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .foot-links a { color: rgba(255,255,255,.5); text-decoration: none; font-size: .88rem; transition: color .2s; }
  .foot-links a:hover { color: #fff; }
  .foot-bot { border-top: 1px solid rgba(255,255,255,.08); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
  .foot-bot p { font-size: .78rem; color: rgba(255,255,255,.35); }
  .foot-socials { display: flex; gap: 10px; }
  .foot-socials a { width: 36px; height: 36px; border: 1px solid rgba(255,255,255,.15); border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: .8rem; color: rgba(255,255,255,.5); text-decoration: none; transition: all .2s; }
  .foot-socials a:hover { border-color: var(--p); color: var(--p); }
  .wa-fab {
    position: fixed; bottom: 26px; right: 26px; z-index: 400;
    width: 54px; height: 54px; border-radius: 16px; background: #25D366;
    display: flex; align-items: center; justify-content: center; font-size: 1.5rem;
    box-shadow: 0 4px 24px rgba(37,211,102,.5); text-decoration: none;
    animation: float 3s ease-in-out infinite; transition: transform .2s;
  }
  .wa-fab:hover { transform: scale(1.1); }

  /* BOOKING PAGE */
  .booking-page { padding-top: 68px; min-height: 100vh; background: var(--s); }
  .booking-header { background: var(--p); padding: 48px 20px 60px; text-align: center; position: relative; overflow: hidden; }
  .booking-header::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 80% at 50% 100%, rgba(0,0,0,.15), transparent); }
  .booking-header-inner { position: relative; z-index: 2; max-width: 600px; margin: 0 auto; }
  .booking-header h1 { font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 2.6rem); color: #fff; margin-bottom: 10px; }
  .booking-header p { color: rgba(255,255,255,.8); font-size: 14px; margin-bottom: 22px; }
  .booking-chips { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
  .booking-chip { background: rgba(255,255,255,.15); color: #fff; border: 1px solid rgba(255,255,255,.25); border-radius: var(--rf); padding: 7px 18px; font-size: 12px; font-weight: 500; }
  .booking-form-outer { max-width: 800px; margin: -36px auto 52px; padding: 0 16px; }
  .booking-form-card { background: var(--card); border-radius: 18px; box-shadow: var(--e3); overflow: hidden; border: 1px solid var(--olv); }

  /* STEPPER */
  .stepper { display: flex; background: var(--sv); border-bottom: 1px solid var(--olv); }
  .step { flex: 1; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 18px 12px; font-size: 13px; font-weight: 500; color: var(--osv); border-bottom: 3px solid transparent; cursor: pointer; transition: all .25s; }
  .step.active { color: var(--p); border-bottom-color: var(--p); background: var(--card); }
  .step.done { color: var(--p); }
  .step-num { width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--olv); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; transition: all .2s; }
  .step.active .step-num { background: var(--p); border-color: var(--p); color: #fff; }
  .step.done .step-num { background: var(--p); border-color: var(--p); color: #fff; font-size: 0; }
  .step.done .step-num::after { content: '✓'; font-size: 13px; }
  .step-label { display: none; }
  @media(min-width: 500px) { .step-label { display: block; } }
  .panel { padding: 28px 26px; }
  .field-label { font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: var(--osv); margin-bottom: 8px; display: block; }
  .field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 18px; }
  .md-input {
    width: 100%; background: var(--sv); border: 1.5px solid var(--olv);
    border-radius: var(--rsm); padding: 13px 14px; font-size: 14px;
    font-family: var(--font-body); color: var(--os); outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .md-input:focus { border-color: var(--p); box-shadow: 0 0 0 3px rgba(204,17,17,.1); }
  .md-input::placeholder { color: var(--ol); }

  /* BRANCH SELECTOR */
  .branch-filter { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
  .bf-btn { padding: 7px 16px; border-radius: var(--rf); font-size: 12px; font-weight: 500; border: 1.5px solid var(--olv); background: transparent; color: var(--osv); cursor: pointer; transition: all .2s; font-family: var(--font-body); }
  .bf-btn:hover { background: var(--sv); }
  .bf-btn.on { background: var(--p); color: #fff; border-color: var(--p); }
  .branch-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; max-height: 340px; overflow-y: auto; }
  .branch-grid::-webkit-scrollbar { width: 4px; } .branch-grid::-webkit-scrollbar-thumb { background: var(--olv); border-radius: 4px; }
  .branch-card { border: 1.5px solid var(--olv); border-radius: var(--rsm); padding: 14px; cursor: pointer; transition: all .2s; position: relative; }
  .branch-card:hover { border-color: var(--p); background: var(--sv); }
  .branch-card.sel { border-color: var(--p); background: var(--pc); }
  .branch-card.sel::after { content: '✓'; position: absolute; top: 10px; right: 12px; width: 22px; height: 22px; border-radius: 50%; background: var(--p); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; }
  .branch-type-chip { font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 3px 10px; border-radius: var(--rf); display: inline-block; margin-bottom: 6px; }
  .branch-type-chip.unisex { background: var(--pc); color: var(--opc); }
  .branch-type-chip.mens { background: #E8F0FE; color: #1A4899; }
  .branch-card-name { font-size: 13px; font-weight: 600; color: var(--os); margin-bottom: 3px; }
  .branch-card-time { font-size: 11px; color: var(--osv); }

  /* TIME SLOTS */
  .time-slots { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 14px; }
  .time-slot { padding: 10px; border-radius: var(--rsm); border: 1.5px solid var(--olv); text-align: center; font-size: 12px; font-weight: 500; cursor: pointer; transition: all .2s; color: var(--osv); font-family: var(--font-body); background: transparent; }
  .time-slot:hover { border-color: var(--p); color: var(--p); }
  .time-slot.sel { background: var(--p); color: #fff; border-color: var(--p); }

  /* SERVICE SEARCH */
  .search-wrap { position: relative; margin-bottom: 14px; }
  .search-icon-el { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 15px; pointer-events: none; color: var(--osv); }
  .search-input {
    width: 100%; background: var(--sv); border: 2px solid var(--p);
    border-radius: var(--rsm); padding: 13px 46px 13px 42px;
    font-size: 14px; font-family: var(--font-body); color: var(--os); outline: none;
    transition: box-shadow .2s;
  }
  .search-input:focus { box-shadow: 0 0 0 3px rgba(204,17,17,.1); }
  .search-input::placeholder { color: var(--ol); }
  .search-count { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); font-size: 11px; color: var(--osv); background: var(--sv); padding: 3px 9px; border-radius: var(--rf); border: 1px solid var(--olv); }
  .cat-chips { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 14px; }
  .cchip { padding: 6px 16px; border-radius: var(--rf); font-size: 12px; font-weight: 500; border: 1.5px solid var(--olv); color: var(--osv); background: transparent; cursor: pointer; transition: all .2s; font-family: var(--font-body); }
  .cchip.on { background: var(--p); color: #fff; border-color: var(--p); }

  /* SELECTED TAGS */
  .sel-bar { background: var(--pc); border-radius: var(--rsm); padding: 14px 16px; margin-bottom: 14px; }
  .sel-bar-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .sel-bar-label { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--p); }
  .sel-bar-total { font-size: 13px; font-weight: 700; color: var(--opc); }
  .sel-tags { display: flex; flex-wrap: wrap; gap: 7px; }
  .sel-tag { display: inline-flex; align-items: center; gap: 7px; background: var(--card); border: 1.5px solid var(--p); color: var(--p); border-radius: var(--rsm); padding: 6px 12px; font-size: 12px; font-weight: 500; }
  .sel-tag-x { cursor: pointer; color: var(--p); font-size: 16px; line-height: 1; opacity: .7; transition: opacity .15s; background: none; border: none; padding: 0; font-family: var(--font-body); }
  .sel-tag-x:hover { opacity: 1; }
  .clear-all-btn { font-size: 11px; color: var(--osv); cursor: pointer; text-decoration: underline; background: none; border: none; font-family: var(--font-body); }
  .svc-list { max-height: 300px; overflow-y: auto; border-radius: var(--rsm); border: 1px solid var(--olv); }
  .svc-list::-webkit-scrollbar { width: 4px; } .svc-list::-webkit-scrollbar-thumb { background: var(--olv); border-radius: 4px; }
  .svc-item { display: flex; align-items: center; padding: 13px 16px; cursor: pointer; border-bottom: 1px solid rgba(0,0,0,.04); transition: background .12s; gap: 13px; }
  .svc-item:last-child { border-bottom: none; }
  .svc-item:hover { background: var(--sv); }
  .svc-item.sel { background: var(--pc); }
  .svc-check { width: 22px; height: 22px; border-radius: 6px; border: 2px solid var(--olv); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all .15s; font-size: 12px; font-weight: 700; }
  .svc-item.sel .svc-check { background: var(--p); border-color: var(--p); color: #fff; }
  .svc-info { flex: 1; min-width: 0; }
  .svc-nm { font-size: 13px; color: var(--os); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 500; }
  .svc-cat-label { font-size: 10px; color: var(--osv); letter-spacing: .5px; text-transform: uppercase; margin-top: 2px; }
  .svc-price-label { font-size: 14px; font-weight: 700; color: var(--p); flex-shrink: 0; }
  .no-res { padding: 32px; text-align: center; color: var(--osv); font-size: 14px; }

  /* SUMMARY */
  .summary-card { background: var(--sv); border: 1px solid var(--olv); border-radius: var(--r); padding: 22px; margin-bottom: 22px; }
  .summary-row { display: flex; justify-content: space-between; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid rgba(0,0,0,.06); font-size: 13px; gap: 12px; }
  .summary-row:last-child { border-bottom: none; }
  .summary-row.total { font-size: 16px; font-weight: 700; color: var(--p); border-top: 2px solid var(--olv); padding-top: 14px; margin-top: 4px; }
  .summary-label { color: var(--osv); font-size: 12px; font-weight: 600; letter-spacing: .5px; text-transform: uppercase; flex-shrink: 0; }
  .summary-value { color: var(--os); font-weight: 500; text-align: right; }

  /* PANEL ACTIONS */
  .panel-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 28px; padding-top: 22px; border-top: 1px solid var(--olv); }
  .btn-back { background: transparent; color: var(--osv); border: 1.5px solid var(--olv); border-radius: var(--rf); padding: 12px 24px; font-family: var(--font-body); font-size: 14px; font-weight: 600; cursor: pointer; transition: all .2s; }
  .btn-back:hover { background: var(--sv); }
  .btn-next { background: var(--p); color: #fff; border: none; border-radius: var(--rf); padding: 12px 28px; font-family: var(--font-body); font-size: 14px; font-weight: 700; cursor: pointer; transition: all .2s; box-shadow: 0 2px 12px rgba(0,0,0,.12); display: flex; align-items: center; gap: 8px; }
  .btn-next:hover { background: var(--pd); box-shadow: 0 4px 20px rgba(0,0,0,.16); }
  .btn-next:disabled { opacity: .45; cursor: not-allowed; }

  /* SUCCESS */
  .success-screen { padding: 56px 28px; text-align: center; }
  .success-ic { width: 76px; height: 76px; border-radius: 50%; background: var(--p); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 22px; box-shadow: 0 8px 32px rgba(0,0,0,.14); animation: pulse 2s ease-in-out infinite; }
  .success-title { font-family: var(--font-display); font-size: 2rem; color: var(--os); margin-bottom: 10px; }
  .success-sub { color: var(--osv); font-size: 14px; line-height: 1.8; margin-bottom: 32px; max-width: 400px; margin-left: auto; margin-right: auto; }
  .success-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

  /* MENU PAGE */
  .menu-page { padding-top: 68px; min-height: 100vh; background: var(--s); }
  .menu-header { background: var(--p); padding: 52px 20px 64px; text-align: center; position: relative; overflow: hidden; }
  .menu-header::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 80% at 50% 100%, rgba(0,0,0,.12), transparent); }
  .menu-toggle-wrap { display: inline-flex; background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.2); border-radius: var(--rf); padding: 5px; margin-bottom: 22px; position: relative; z-index: 2; }
  .menu-tt { padding: 11px 30px; border-radius: var(--rf); font-size: 13px; font-weight: 600; cursor: pointer; border: none; transition: all .25s; color: rgba(255,255,255,.75); background: transparent; font-family: var(--font-body); letter-spacing: .3px; }
  .menu-tt.on { background: #ffffff; color: var(--p); box-shadow: var(--e1); }
  .menu-header-title { font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 2.6rem); color: #fff; margin-bottom: 8px; position: relative; z-index: 2; }
  .menu-header-sub { font-size: 14px; color: rgba(255,255,255,.75); margin-bottom: 12px; position: relative; z-index: 2; }
  .menu-header-timing { font-size: 13px; color: rgba(255,255,255,.8); font-weight: 500; position: relative; z-index: 2; }
  .menu-header-badge { display: inline-block; background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.3); color: #fff; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; padding: 7px 20px; border-radius: var(--rf); margin-top: 16px; position: relative; z-index: 2; }
  .menu-content { max-width: 1080px; margin: 0 auto; padding: 44px 16px 64px; }
  .menu-sec { display: none; animation: fadeIn .4s ease; }
  .menu-sec.show { display: block; }
  .menu-cat { margin-bottom: 56px; }
  .menu-cat-hdr { display: flex; align-items: center; gap: 14px; margin-bottom: 26px; }
  .menu-cat-ic { width: 46px; height: 46px; border-radius: 50%; background: var(--pc); border: 2px solid rgba(204,17,17,.2); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; }
  .menu-cat-title { font-family: var(--font-display); font-size: 1.3rem; color: var(--os); }
  .menu-cat-line { flex: 1; height: 1px; background: linear-gradient(to right, var(--olv), transparent); }
  .price-table { width: 100%; border-collapse: collapse; border-radius: var(--r); overflow: hidden; box-shadow: var(--e1); }
  .price-table thead tr { background: var(--thead); }
  .price-table thead th { font-size: .7rem; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,.7); padding: 13px 16px; text-align: left; font-weight: 600; font-family: var(--font-body); }
  .price-table thead th:not(:first-child) { text-align: center; }
  .price-table tbody tr { border-bottom: 1px solid var(--olv); transition: background .15s; background: var(--card); }
  .price-table tbody tr:hover { background: var(--sv); }
  .price-table tbody tr:last-child { border-bottom: none; }
  .price-table tbody td { padding: 13px 16px; font-size: .88rem; color: var(--osv); vertical-align: middle; }
  .price-table tbody td:not(:first-child) { text-align: center; color: var(--p); font-weight: 700; font-size: .85rem; }
  .price-table td.dash { color: var(--ol); }
  .pt-sn { color: var(--os); font-weight: 500; }
  .price-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px; }
  .price-card { background: var(--card); border: 1px solid var(--olv); border-radius: var(--rsm); padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; transition: all .15s; box-shadow: var(--e1); }
  .price-card:hover { border-color: var(--p); background: var(--sv); }
  .price-name { font-size: .88rem; color: var(--os); font-weight: 500; }
  .price-amount { font-size: 1rem; font-weight: 700; color: var(--p); white-space: nowrap; font-family: var(--font-display); }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .two-col-card { background: var(--card); border: 1px solid var(--olv); border-radius: var(--r); padding: 22px; box-shadow: var(--e1); }
  .two-col-title { font-family: var(--font-display); font-size: 1rem; color: var(--p); margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--olv); }
  .two-col-row { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; border-bottom: 1px solid rgba(0,0,0,.04); font-size: .88rem; }
  .two-col-row:last-child { border-bottom: none; padding-bottom: 0; }
  .two-col-row-name { color: var(--osv); }
  .two-col-row-price { color: var(--p); font-weight: 700; font-size: .85rem; white-space: nowrap; margin-left: 12px; }
  .pkg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; }
  .pkg-card { background: var(--card); border: 1px solid var(--olv); border-radius: var(--r); padding: 22px; position: relative; overflow: hidden; box-shadow: var(--e1); transition: all .2s; }
  .pkg-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: var(--p); }
  .pkg-card:hover { box-shadow: var(--e2); border-color: var(--p); }
  .pkg-name { font-family: var(--font-display); font-size: 1rem; color: var(--os); margin-bottom: 7px; }
  .pkg-desc { font-size: .82rem; color: var(--osv); line-height: 1.55; margin-bottom: 14px; }
  .pkg-sizes { display: flex; gap: 7px; flex-wrap: wrap; }
  .pkg-size { background: var(--pc); border: 1px solid rgba(204,17,17,.2); border-radius: var(--rsm); padding: 7px 13px; font-size: .82rem; color: var(--opc); text-align: center; }
  .pkg-size strong { color: var(--p); display: block; font-size: .92rem; }
  .menu-note { background: linear-gradient(135deg, #FFFDE7, #FFF8E1); border: 1px solid #F9A825; border-radius: var(--rsm); padding: 14px 18px; font-size: .85rem; color: #5D4037; margin-bottom: 22px; line-height: 1.65; }
  .menu-footer { background: var(--os); padding: 40px 16px; text-align: center; }
  .menu-footer p { color: rgba(255,255,255,.45); font-size: .86rem; margin-bottom: 6px; }
  .menu-footer a { color: var(--p); text-decoration: none; }
  .menu-cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 24px; }
  .menu-cta-btn { padding: 12px 26px; border-radius: var(--r); font-weight: 700; font-size: .88rem; letter-spacing: .5px; text-transform: uppercase; text-decoration: none; transition: opacity .2s; border: none; cursor: pointer; font-family: var(--font-body); }
  .menu-cta-btn:hover { opacity: .85; }
  .cta-wa { background: #25D366; color: #fff; }
  .cta-call { background: var(--p); color: #fff; }
  .cta-back { border: 1px solid rgba(255,255,255,.25); color: rgba(255,255,255,.8); background: transparent; }

  /* MOBILE NAV DRAWER */
  .mob-menu { position: fixed; top: 68px; left: 0; right: 0; background: var(--card); border-bottom: 1px solid var(--olv); z-index: 499; padding: 16px; display: flex; flex-direction: column; gap: 4px; box-shadow: var(--e2); animation: slideIn .25s ease; }
  .mob-link { color: var(--os); text-decoration: none; font-size: 15px; padding: 12px 16px; border-radius: var(--rsm); font-weight: 500; background: none; border: none; font-family: var(--font-body); cursor: pointer; text-align: left; width: 100%; transition: background .2s; }
  .mob-link:hover { background: var(--sv); }
  .mob-link.cta { background: var(--p); color: #fff; border-radius: var(--rf); text-align: center; font-weight: 700; margin-top: 8px; padding: 14px; }

  /* RESPONSIVE */
  @media (max-width: 960px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .about-grid { grid-template-columns: 1fr; }
    .foot-grid { grid-template-columns: 1fr 1fr; }
    .loc-header { flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 600px) {
    section { padding: 64px 16px; }
    .hero-stats { grid-template-columns: 1fr 1fr; }
    .field-grid { grid-template-columns: 1fr; }
    .branch-grid { grid-template-columns: 1fr; }
    .time-slots { grid-template-columns: repeat(3, 1fr); }
    .two-col { grid-template-columns: 1fr; }
    .foot-grid { grid-template-columns: 1fr; }
    .panel-actions { flex-direction: column-reverse; }
    .btn-back, .btn-next { width: 100%; justify-content: center; }
  }
`;

// ── SVG LOGO ──────────────────────────────────────────────────────────────────
const VCutLogo = ({ size = 26 }) => (
  <svg viewBox="0 0 300 320" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <polygon points="20,10 80,10 155,178 120,178" fill="#fff" />
    <polygon points="280,10 220,10 145,178 180,178" fill="#fff" />
    <polygon points="92,200 128,200 150,258 172,200 208,200 150,272" fill="#fff" />
  </svg>
);

// ── USE SCROLL REVEAL ─────────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("fade-up"); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── NAV ───────────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [mob, setMob] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => { document.documentElement.setAttribute("data-theme", dark ? "dark" : "light"); }, [dark]);
  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "locations", label: "Locations" },
    { id: "menu", label: "Menu" },
  ];
  const nav = (id) => { setPage(id); setMob(false); window.scrollTo(0, 0); };
  return (
    <>
      <nav className="nav">
        <button className="nav-logo" onClick={() => nav("home")} style={{ background: "none", border: "none", cursor: "pointer", font: "inherit" }}>
          <div className="nav-logo-mark"><VCutLogo /></div>
          <div>
            <div className="nav-brand-name">V-Cut</div>
            <div className="nav-brand-sub">Unisex Salon</div>
          </div>
        </button>
        <div className="nav-links">
          {links.map(l => (
            <button key={l.id} className={`nav-link${page === l.id ? " active" : ""}`} onClick={() => nav(l.id)}>{l.label}</button>
          ))}
        </div>
        <button className="theme-tog" onClick={() => setDark(d => !d)} aria-label="Toggle dark mode" title="Toggle dark mode">{dark ? "\u2600" : "\u263E"}</button>
        <button className="nav-cta" onClick={() => nav("booking")}>Book Now</button>
        <button className="hamburger" onClick={() => setMob(!mob)}>
          <span style={mob ? { transform: "rotate(45deg) translate(5px, 5px)" } : {}} />
          <span style={mob ? { opacity: 0 } : {}} />
          <span style={mob ? { transform: "rotate(-45deg) translate(5px, -5px)" } : {}} />
        </button>
      </nav>
      {mob && (
        <div className="mob-menu">
          {links.map(l => <button key={l.id} className="mob-link" onClick={() => nav(l.id)}>{l.label}</button>)}
          <button className="mob-link cta" onClick={() => nav("booking")}>Book Now</button>
        </div>
      )}
    </>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const [svcFilter, setSvcFilter] = useState("all");
  const [locFilter, setLocFilter] = useState("all");
  const svcRef = useScrollReveal();
  const locRef = useScrollReveal();
  const aboutRef = useScrollReveal();

  const filteredSvcs = svcFilter === "all" ? HOMEPAGE_SERVICES : HOMEPAGE_SERVICES.filter(s => s.cat === svcFilter);
  const filteredLocs = locFilter === "all" ? BRANCHES : BRANCHES.filter(b => b.type === locFilter);

  return (
    <div style={{ paddingTop: 68 }}>
      {/* HERO */}
      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-dot" />
            L'Oréal Professionnel Partner · Bangalore
          </div>
          <h1>Bangalore's Most<br /><em>Trusted Salon</em> Chain</h1>
          <p className="hero-desc">Premium hair, skin & beauty services for men and women across Bangalore — 15 branches, 8+ years of excellence.</p>
          <div className="hero-btns">
            <button className="btn-filled" onClick={() => setPage("booking")}>Book Appointment →</button>
            <button className="btn-tonal" onClick={() => document.getElementById("locations")?.scrollIntoView({ behavior: "smooth" })}>Find Branch</button>
            <button className="btn-outlined" onClick={() => setPage("menu")}>View Prices</button>
          </div>
          <div className="hero-stats">
            {[["15", "Branches"], ["8+", "Years"], ["20K+", "Clients"], ["4.8★", "Rating"]].map(([n, l]) => (
              <div key={l} className="hero-stat"><div className="hero-stat-n">{n}</div><div className="hero-stat-l">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="about-grid" ref={aboutRef} style={{ opacity: 0 }}>
          <div className="about-stats">
            {[["15", "Branches in Bangalore"], ["8+", "Years of Excellence"], ["20K+", "Happy Clients"]].map(([n, l]) => (
              <div key={l} className="about-stat"><div className="about-stat-n">{n}</div><div className="about-stat-l">{l}</div></div>
            ))}
            <div className="about-stat">
              <svg viewBox="0 0 300 320" width="72" xmlns="http://www.w3.org/2000/svg" opacity=".5">
                <polygon points="20,10 80,10 155,178 120,178" fill="#CC1111" />
                <polygon points="280,10 220,10 145,178 180,178" fill="#CC1111" />
                <text x="150" y="112" textAnchor="middle" fontFamily="Georgia,serif" fontSize="30" fontWeight="900" fill="#86868B" letterSpacing="5">V-CUT</text>
                <polygon points="92,200 128,200 150,258 172,200 208,200 150,272" fill="#CC1111" />
              </svg>
            </div>
          </div>
          <div>
            <div className="sec-eyebrow">About V-Cut</div>
            <h2 className="sec-title">Crafting Confidence,<br /><em>One Cut at a Time</em></h2>
            <p className="sec-desc">V-Cut is Bangalore's most trusted salon chain with 15 branches across the city. As an authorised L'Oréal Professionnel partner, every treatment uses the finest products available.</p>
            <ul className="about-feats">
              {["Certified & experienced stylists at every branch", "Exclusive L'Oréal Professionnel products", "Separate Men's & Unisex branches", "Modern, hygienic & comfortable ambience", "Services for men, women & kids"].map((f, i) => (
                <li key={i}><div className="about-feat-dot">✓</div>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="sec-inner">
          <div className="svc-head" ref={svcRef} style={{ opacity: 0 }}>
            <div className="sec-eyebrow">What We Offer</div>
            <h2 className="sec-title">Our <em>Services</em></h2>
            <p className="sec-desc">From precision cuts to luxury spa treatments — all under one roof at every branch.</p>
          </div>
          <div className="filter-chips">
            {["all", "hair", "spa", "skin", "nails", "mens", "bridal"].map(c => (
              <button key={c} className={`fchip${svcFilter === c ? " on" : ""}`} onClick={() => setSvcFilter(c)}>{c.charAt(0).toUpperCase() + c.slice(1)}</button>
            ))}
          </div>
          <div className="svc-grid">
            {filteredSvcs.map((s, i) => (
              <div key={i} className="svc-card" onClick={() => setPage("booking")}>
                <div className="svc-ic">{s.icon}</div>
                <div className="svc-nm">{s.name}</div>
                <div className="svc-ds">{s.desc}</div>
                <div className="svc-pr">{s.price}</div>
              </div>
            ))}
          </div>
          <div className="loreal-banner" style={{ opacity: 0, animation: "fadeUp .7s .3s ease both" }}>
            <h3>Official L'Oréal Professionnel Partner</h3>
            <p>We exclusively use L'Oréal Professionnel products across all 15 branches for world-class quality in every treatment.</p>
            <span className="loreal-tag">✦ Authorised L'Oréal Salon · Bangalore</span>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="locations">
        <div className="sec-inner">
          <div className="loc-header" ref={locRef} style={{ opacity: 0 }}>
            <div>
              <div className="sec-eyebrow">Find Us</div>
              <h2 className="sec-title">Our <em>15 Branches</em></h2>
              <p className="sec-desc" style={{ marginBottom: 0 }}>Click "Directions" to get navigation to any branch.</p>
            </div>
            <div className="loc-filters">
              {[["all", "All (15)"], ["unisex", "Unisex (5)"], ["mens", "Men's (10)"]].map(([v, l]) => (
                <button key={v} className={`lf-btn${locFilter === v ? " on" : ""}`} onClick={() => setLocFilter(v)}>{l}</button>
              ))}
            </div>
          </div>
          <div className="loc-grid">
            {filteredLocs.map((b, i) => (
              <div key={i} className="loc-card">
                <span className={`loc-type-tag ${b.type}`}>{b.type === "unisex" ? "Unisex" : "Men's"}</span>
                <div className="loc-name">{b.name}</div>
                <div className="loc-meta">📍 {b.area}, Bangalore</div>
                <div className="loc-meta">🕐 {b.timing} · 📞 {b.phone}</div>
                <div className="loc-btns">
                  <a href={`https://maps.google.com/?q=${b.lat},${b.lng}`} target="_blank" rel="noreferrer" className="loc-btn primary">Directions</a>
                  <a href={`tel:+91${b.phone}`} className="loc-btn">Call</a>
                  <button className="loc-btn" onClick={() => setPage("booking")}>Book</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section id="booking-cta">
        <div className="bk-inner">
          <div className="sec-eyebrow">Ready to book?</div>
          <h2 className="sec-title" style={{ color: "#fff" }}>Book Your Appointment<br /><em>Online Now</em></h2>
          <p className="sec-desc" style={{ color: "rgba(255,255,255,.8)", maxWidth: 480 }}>Choose your branch, pick your services, and confirm instantly. No prepayment needed.</p>
          <div className="bk-btns">
            <button className="btn-filled" onClick={() => setPage("booking")}>Book Appointment</button>
            <a href="https://wa.me/919836577807" target="_blank" rel="noreferrer" className="btn-outlined" style={{ border: "1.5px solid rgba(255,255,255,.4)", color: "#fff" }}>💬 WhatsApp Us</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-inner">
          <div className="foot-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 38, height: 38, borderRadius: 9, background: "var(--p)", display: "flex", alignItems: "center", justifyContent: "center" }}><VCutLogo size={24} /></div>
                <div className="foot-brand-name">V-Cut Unisex Salon</div>
              </div>
              <p className="foot-tagline">Bangalore's most trusted salon chain with 15 branches. L'Oréal Professionnel Partner.</p>
            </div>
            <div className="foot-col">
              <h4>Services</h4>
              <ul className="foot-links">
                {["Haircut & Styling", "Hair Colouring", "Keratin Treatment", "Facials & Skin", "Full Menu →"].map(s => <li key={s}><a href="#">{s}</a></li>)}
              </ul>
            </div>
            <div className="foot-col">
              <h4>Quick Links</h4>
              <ul className="foot-links">
                {["About Us", "All Branches", "Book Now", "Price Menu"].map(s => <li key={s}><a href="#">{s}</a></li>)}
              </ul>
            </div>
            <div className="foot-col">
              <h4>Contact</h4>
              <ul className="foot-links">
                <li><a href="tel:+919836577807">+91 98365 77807</a></li>
                <li><a href="tel:+919790906435">+91 97909 06435</a></li>
                <li><a href="mailto:vcutsalonindia@gmail.com">vcutsalonindia@gmail.com</a></li>
                <li><a href="https://www.instagram.com/v_cut_unisex_salon" target="_blank" rel="noreferrer">@v_cut_unisex_salon</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bot">
            <p>© 2025 V-Cut Salon · vcutsalon.in · 15 Branches Across Bangalore</p>
            <div className="foot-socials">
              <a href="https://www.instagram.com/v_cut_unisex_salon" target="_blank" rel="noreferrer">IG</a>
              <a href="https://wa.me/919836577807" target="_blank" rel="noreferrer">WA</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── BOOKING PAGE ──────────────────────────────────────────────────────────────
function BookingPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selBranch, setSelBranch] = useState(null);
  const [branchFilter, setBranchFilter] = useState("all");
  const [date, setDate] = useState("");
  const [selTime, setSelTime] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [cat, setCat] = useState("all");
  const [searchQ, setSearchQ] = useState("");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const filteredBranches = branchFilter === "all" ? BRANCHES : BRANCHES.filter(b => b.type === branchFilter);
  const filteredSvcs = SERVICES.filter(s => {
    const mc = cat === "all" || s.cat === cat;
    const mq = !searchQ || s.name.toLowerCase().includes(searchQ.toLowerCase()) || s.cat.toLowerCase().includes(searchQ.toLowerCase());
    return mc && mq;
  });
  const selectedItems = SERVICES.filter(s => selected.has(s.id));
  const total = selectedItems.reduce((a, s) => a + s.price, 0);
  const fmt = n => "₹" + n.toLocaleString("en-IN");

  const toggleSvc = id => {
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const goNext = (n) => { window.scrollTo(0, 0); setStep(n); };

  const submit = () => {
    setDone(true);
    window.scrollTo(0, 0);
  };

  if (done) {
    const b = selBranch !== null ? BRANCHES[selBranch] : null;
    const msg = `Hi V-Cut Salon! I'd like to confirm my booking:\n\nName: ${name}\nMobile: ${phone}\nBranch: ${b?.name || ""}\nDate: ${date || "Flexible"} ${selTime || ""}\nServices: ${selectedItems.map(s => s.name).join(", ")}\nEst. Total: ${fmt(total)}`;
    return (
      <div className="booking-page">
        <div className="booking-form-outer" style={{ marginTop: 36 }}>
          <div className="booking-form-card">
            <div className="success-screen">
              <div className="success-ic">✓</div>
              <div className="success-title">Booking Confirmed!</div>
              <p className="success-sub">Your appointment has been booked at {b?.name}. We'll see you soon!</p>
              <div className="success-actions">
                <a href={`https://wa.me/91${b?.phone || "9836577807"}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer" className="btn-filled" style={{ textDecoration: "none" }}>💬 WhatsApp Confirmation</a>
                <button className="btn-back" onClick={() => { setDone(false); setStep(1); setSelected(new Set()); setSelBranch(null); }}>Book Again</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-header">
        <div className="booking-header-inner">
          <h1>Book Your Appointment</h1>
          <p>Instant confirmation · No prepayment needed · Walk-ins welcome</p>
          <div className="booking-chips">
            <span className="booking-chip">📍 15 Branches</span>
            <span className="booking-chip">⚡ Instant Confirmation</span>
            <span className="booking-chip">✂️ Expert Stylists</span>
          </div>
        </div>
      </div>

      <div className="booking-form-outer">
        <div className="booking-form-card">
          {/* STEPPER */}
          <div className="stepper">
            {[["1", "Details"], ["2", "Branch"], ["3", "Services"], ["4", "Confirm"]].map(([n, l], i) => (
              <div key={n} className={`step${step === i + 1 ? " active" : ""}${step > i + 1 ? " done" : ""}`}>
                <div className="step-num">{n}</div>
                <span className="step-label">{l}</span>
              </div>
            ))}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="panel fade-in">
              <div className="field-grid">
                <div>
                  <label className="field-label">Your Name *</label>
                  <input className="md-input" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                  <label className="field-label">Mobile Number *</label>
                  <input className="md-input" placeholder="+91 XXXXX XXXXX" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="field-label">Email (optional)</label>
                <input className="md-input" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{ marginBottom: 0 }} />
              </div>
              <div className="panel-actions">
                <button className="btn-next" onClick={() => { if (!name || !phone) { alert("Please enter your name and mobile number."); return; } goNext(2); }}>Next: Choose Branch →</button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="panel fade-in">
              <div>
                <label className="field-label">Filter Branches</label>
                <div className="branch-filter">
                  {[["all", "All (15)"], ["unisex", "Unisex (5)"], ["mens", "Men's (10)"]].map(([v, l]) => (
                    <button key={v} className={`bf-btn${branchFilter === v ? " on" : ""}`} onClick={() => setBranchFilter(v)}>{l}</button>
                  ))}
                </div>
                <div className="branch-grid">
                  {filteredBranches.map((b, i) => {
                    const ri = BRANCHES.indexOf(b);
                    return (
                      <div key={i} className={`branch-card${selBranch === ri ? " sel" : ""}`} onClick={() => setSelBranch(ri)}>
                        <span className={`branch-type-chip ${b.type}`}>{b.type === "unisex" ? "Unisex" : "Men's"}</span>
                        <div className="branch-card-name">{b.name}</div>
                        <div className="branch-card-time">🕐 {b.timing} · 📞 {b.phone}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="field-grid" style={{ marginTop: 24 }}>
                <div>
                  <label className="field-label">Date *</label>
                  <input className="md-input" type="date" min={today} value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div>
                  <label className="field-label">Preferred Time</label>
                  <div className="time-slots">
                    {TIMES.map(t => (
                      <button key={t} className={`time-slot${selTime === t ? " sel" : ""}`} onClick={() => setSelTime(t)}>{t}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="panel-actions">
                <button className="btn-back" onClick={() => goNext(1)}>← Back</button>
                <button className="btn-next" onClick={() => { if (selBranch === null) { alert("Please select a branch."); return; } goNext(3); }}>Next: Select Services →</button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="panel fade-in">
              {selected.size > 0 && (
                <div className="sel-bar">
                  <div className="sel-bar-top">
                    <span className="sel-bar-label">Selected: {selected.size} service(s)</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span className="sel-bar-total">Est. {fmt(total)}</span>
                      <button className="clear-all-btn" onClick={() => setSelected(new Set())}>Clear all</button>
                    </span>
                  </div>
                  <div className="sel-tags">
                    {selectedItems.map(s => (
                      <div key={s.id} className="sel-tag">
                        {s.name}
                        <button className="sel-tag-x" onClick={() => toggleSvc(s.id)}>×</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="search-wrap">
                <span className="search-icon-el">🔍</span>
                <input className="search-input" placeholder="Search services e.g. haircut, facial, keratin..." value={searchQ} onChange={e => setSearchQ(e.target.value)} />
                <span className="search-count">{filteredSvcs.length} services</span>
              </div>
              <div className="cat-chips">
                {CATS.map(c => (
                  <button key={c} className={`cchip${cat === c ? " on" : ""}`} onClick={() => setCat(c)}>{c.charAt(0).toUpperCase() + c.slice(1)}</button>
                ))}
              </div>
              <div className="svc-list">
                {filteredSvcs.length === 0 ? (
                  <div className="no-res">No services found for "{searchQ}"</div>
                ) : filteredSvcs.map(s => (
                  <div key={s.id} className={`svc-item${selected.has(s.id) ? " sel" : ""}`} onClick={() => toggleSvc(s.id)}>
                    <div className="svc-check">{selected.has(s.id) ? "✓" : ""}</div>
                    <div className="svc-info">
                      <div className="svc-nm">{s.name}</div>
                      <div className="svc-cat-label">{s.cat}{s.gender !== "both" ? ` · ${s.gender}` : ""}</div>
                    </div>
                    <div className="svc-price-label">{fmt(s.price)}</div>
                  </div>
                ))}
              </div>
              <div className="panel-actions">
                <button className="btn-back" onClick={() => goNext(2)}>← Back</button>
                <button className="btn-next" disabled={selected.size === 0} onClick={() => goNext(4)}>Next: Confirm →</button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="panel fade-in">
              <div className="summary-card">
                {[
                  ["Name", name],
                  ["Mobile", phone],
                  ["Email", email || "—"],
                  ["Branch", selBranch !== null ? BRANCHES[selBranch].name : "—"],
                  ["Date & Time", `${date || "Flexible"} ${selTime || ""}`],
                  ["Services", selectedItems.map(s => s.name).join(", ")],
                ].map(([l, v]) => (
                  <div key={l} className="summary-row">
                    <span className="summary-label">{l}</span>
                    <span className="summary-value">{v}</span>
                  </div>
                ))}
                <div className="summary-row total">
                  <span>Estimated Total</span>
                  <span>{fmt(total)}</span>
                </div>
              </div>
              <div>
                <label className="field-label">Special Requests (optional)</label>
                <textarea className="md-input" rows={3} placeholder="Any special requests or notes..." value={notes} onChange={e => setNotes(e.target.value)} style={{ resize: "vertical" }} />
              </div>
              <div className="panel-actions">
                <button className="btn-back" onClick={() => goNext(3)}>← Back</button>
                <button className="btn-next" onClick={submit}>Confirm Booking ✓</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MENU PAGE ─────────────────────────────────────────────────────────────────
function MenuPage({ setPage }) {
  const [tab, setTab] = useState("unisex");

  return (
    <div className="menu-page">
      <div className="menu-header" style={{ paddingTop: 84 }}>
        <div className="menu-toggle-wrap">
          <button className={`menu-tt${tab === "unisex" ? " on" : ""}`} onClick={() => setTab("unisex")}>Unisex Salon</button>
          <button className={`menu-tt${tab === "mens" ? " on" : ""}`} onClick={() => setTab("mens")}>Men's Salon</button>
        </div>
        <div className="menu-header-title">Services & Price Menu</div>
        <div className="menu-header-sub">{tab === "unisex" ? "V-Cut Unisex Salon" : "V-Cut Men's Salon"} — Complete Price List</div>
        <div className="menu-header-timing">🕐 <strong>Timing: {tab === "unisex" ? "9:00 AM – 9:00 PM" : "8:00 AM – 9:30 PM"}</strong> · Open All Days</div>
        <div className="menu-header-badge">✦ All Prices Inclusive · Walk-ins Welcome · +91 98365 77807</div>
      </div>

      <div className="menu-content">
        {tab === "unisex" ? (
          <div className="menu-sec show">
            {/* HAIR STYLING */}
            <div className="menu-cat">
              <div className="menu-cat-hdr"><div className="menu-cat-ic">✂️</div><div className="menu-cat-title">Hair — Styling</div><div className="menu-cat-line" /></div>
              <table className="price-table"><thead><tr><th style={{ width: "50%" }}>Service</th><th>Ladies</th><th>Gents</th></tr></thead><tbody>
                {[["Basic Hair Cut", "₹400", "₹150"], ["Adv Hair Cut", "₹700", "₹250"], ["Fringe / Bangs", "₹200", "—"], ["Shaving", "—", "₹100"], ["Beard Trimming", "—", "₹100"], ["Baby's Basic Haircut", "₹500", "₹200"], ["Hair Wash with Conditioner", "₹500", "₹100"], ["Head Shave", "—", "₹400"]].map(([s, l, g]) => (
                  <tr key={s}><td className="pt-sn">{s}</td><td className={l === "—" ? "dash" : ""}>{l}</td><td className={g === "—" ? "dash" : ""}>{g}</td></tr>
                ))}
              </tbody></table>
            </div>
            {/* HAIR COLOUR */}
            <div className="menu-cat">
              <div className="menu-cat-hdr"><div className="menu-cat-ic">🎨</div><div className="menu-cat-title">Hair Colour</div><div className="menu-cat-line" /></div>
              <table className="price-table"><thead><tr><th style={{ width: "40%" }}>Service</th><th>INOA</th><th>Masirel</th><th>Schwarzkopf</th></tr></thead><tbody>
                {[["Essensity Root Touchup", "₹400", "₹350", "₹450"], ["Root Touchup (2 inch)", "₹1,200", "₹1,000", "₹1,400"], ["Global Colour Short", "₹2,500", "₹4,000", "₹5,000"], ["Highlights (Per Strip)", "₹3,000", "₹3,500", "₹4,000"], ["Balayage", "₹2,999", "₹3,499", "₹3,899"]].map(([s, a, b, c]) => (
                  <tr key={s}><td className="pt-sn">{s}</td><td>{a}</td><td>{b}</td><td>{c}</td></tr>
                ))}
              </tbody></table>
            </div>
            {/* KERATIN */}
            <div className="menu-cat">
              <div className="menu-cat-hdr"><div className="menu-cat-ic">🌊</div><div className="menu-cat-title">Hair Textures</div><div className="menu-cat-line" /></div>
              <div className="menu-note"><strong>S = Short | M = Medium | L = Long</strong> — Price varies by hair length</div>
              <div className="pkg-grid">
                {[["Keratin Treatment (GK)", "Protein-based treatment for frizzy-free hair", ["₹3,499", "₹4,999", "₹5,999"]], ["Botox Treatment", "Advanced hair smoothing & shine restoration", ["₹3,999", "₹4,999", "₹6,999"]], ["Nano Plastia", "Premium nano hair repair & smoothing", ["₹3,999", "₹4,999", "₹6,999"]], ["Smoothening / Straightening", "Long-lasting silky smooth hair", ["₹2,599", "₹3,199", "₹4,999"]]].map(([n, d, prices]) => (
                  <div key={n} className="pkg-card"><div className="pkg-name">{n}</div><div className="pkg-desc">{d}</div><div className="pkg-sizes">{prices.map((p, i) => <div key={i} className="pkg-size"><strong>{p}</strong>{["Short", "Medium", "Long"][i]}</div>)}</div></div>
                ))}
              </div>
            </div>
            {/* HAIR SPA */}
            <div className="menu-cat">
              <div className="menu-cat-hdr"><div className="menu-cat-ic">💆</div><div className="menu-cat-title">Hair Spa</div><div className="menu-cat-line" /></div>
              <table className="price-table"><thead><tr><th>Service</th><th>Ladies (S/M/L)</th><th>Gents</th></tr></thead><tbody>
                {[["L'Oréal Deep Nourishing", "₹1,200 / ₹1,400 / ₹1,600", "₹700"], ["Keratine Restore Hair Spa", "₹1,500 / ₹1,700 / ₹1,800", "₹900"], ["Anti Dandruff + Hair Spa", "₹1,500 / ₹1,700 / ₹1,800", "₹1,000"]].map(([s, l, g]) => (
                  <tr key={s}><td className="pt-sn">{s}</td><td>{l}</td><td>{g}</td></tr>
                ))}
              </tbody></table>
            </div>
            {/* FACIALS */}
            <div className="menu-cat">
              <div className="menu-cat-hdr"><div className="menu-cat-ic">✨</div><div className="menu-cat-title">Facials</div><div className="menu-cat-line" /></div>
              <div className="price-grid">
                {[["Nature Gentle Facial", "₹700"], ["Fruit Facial", "₹900"], ["Korean Glass Skin Facial", "₹1,000"], ["VLCC Gold", "₹1,100"], ["Lotus Diamond", "₹1,200"], ["Herbal Wine", "₹1,300"], ["O3+ Shine & Glow", "₹2,200"], ["Shahnaz Husain Diamond", "₹2,300"], ["O3+ Bridal", "₹2,700"]].map(([n, p]) => (
                  <div key={n} className="price-card"><span className="price-name">{n}</span><span className="price-amount">{p}</span></div>
                ))}
              </div>
            </div>
            {/* WAXING */}
            <div className="menu-cat">
              <div className="menu-cat-hdr"><div className="menu-cat-ic">🌿</div><div className="menu-cat-title">Waxing</div><div className="menu-cat-line" /></div>
              <div className="two-col">
                <div className="two-col-card">
                  <div className="two-col-title">Rica Wax</div>
                  {[["Chin / Upper Lip", "₹50 each"], ["Under Arms", "₹150"], ["Half Leg", "₹350"], ["Full Hand", "₹450"], ["Full Face", "₹400"], ["Full Leg", "₹550"], ["Full Body", "₹2,500"]].map(([n, p]) => (
                    <div key={n} className="two-col-row"><span className="two-col-row-name">{n}</span><span className="two-col-row-price">{p}</span></div>
                  ))}
                </div>
                <div className="two-col-card">
                  <div className="two-col-title">Threading</div>
                  {[["Chin", "₹30"], ["Upper Lip", "₹30"], ["Forehead", "₹40"], ["Eyebrows", "₹50"], ["Full Face", "₹250"]].map(([n, p]) => (
                    <div key={n} className="two-col-row"><span className="two-col-row-name">{n}</span><span className="two-col-row-price">{p}</span></div>
                  ))}
                </div>
              </div>
            </div>
            {/* MANICURE */}
            <div className="menu-cat">
              <div className="menu-cat-hdr"><div className="menu-cat-ic">💅</div><div className="menu-cat-title">Manicure & Pedicure</div><div className="menu-cat-line" /></div>
              <table className="price-table"><thead><tr><th>Service</th><th>Manicure</th><th>Pedicure</th></tr></thead><tbody>
                {[["Cut & File", "₹150", "₹200"], ["Cut, File & Polish", "₹200", "₹250"], ["Sea Blue", "₹500", "₹700"], ["Aroma Magic", "₹600", "₹800"], ["Raaga", "₹600", "₹1,000"], ["Lotus Rose", "₹700", "₹1,000"], ["Bombini", "₹800", "₹1,500"]].map(([s, m, p]) => (
                  <tr key={s}><td className="pt-sn">{s}</td><td>{m}</td><td>{p}</td></tr>
                ))}
              </tbody></table>
            </div>
            {/* MAKEUP */}
            <div className="menu-cat">
              <div className="menu-cat-hdr"><div className="menu-cat-ic">💄</div><div className="menu-cat-title">Make-Up</div><div className="menu-cat-line" /></div>
              <div className="price-grid">
                {[["Eye Makeup", "₹700"], ["Day Makeup", "₹1,500"], ["Party Makeup", "₹2,500"], ["Evening Makeup", "₹3,000"], ["Bridal Makeup", "₹10,000+"]].map(([n, p]) => (
                  <div key={n} className="price-card"><span className="price-name">{n}</span><span className="price-amount">{p}</span></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="menu-sec show">
            <div className="menu-cat">
              <div className="menu-cat-hdr"><div className="menu-cat-ic">💈</div><div className="menu-cat-title">Hair & Beard</div><div className="menu-cat-line" /></div>
              <div className="price-grid">
                {[["Hair Cut", "₹100"], ["Shaving / Trimming", "₹50"], ["Head Massage", "₹150"], ["Hair Spa (L'Oréal)", "₹500"]].map(([n, p]) => (
                  <div key={n} className="price-card"><span className="price-name">{n}</span><span className="price-amount">{p}</span></div>
                ))}
              </div>
            </div>
            <div className="menu-cat">
              <div className="menu-cat-hdr"><div className="menu-cat-ic">🎨</div><div className="menu-cat-title">Hair Colour</div><div className="menu-cat-line" /></div>
              <div className="price-grid">
                {[["Streax Hair Colour", "₹350"], ["L'Oréal Masirel", "₹450"], ["L'Oréal INOA", "₹500"]].map(([n, p]) => (
                  <div key={n} className="price-card"><span className="price-name">{n}</span><span className="price-amount">{p}</span></div>
                ))}
              </div>
            </div>
            <div className="menu-cat">
              <div className="menu-cat-hdr"><div className="menu-cat-ic">✨</div><div className="menu-cat-title">Facial</div><div className="menu-cat-line" /></div>
              <div className="price-grid">
                {[["Lotus Anti Tan", "₹700"], ["Lotus Gold Facial", "₹850"], ["Herbal Facial", "₹800"], ["Lotus Diamond Facial", "₹1,200"], ["O3+ Facial", "₹1,500"]].map(([n, p]) => (
                  <div key={n} className="price-card"><span className="price-name">{n}</span><span className="price-amount">{p}</span></div>
                ))}
              </div>
            </div>
            <div className="menu-cat">
              <div className="menu-cat-hdr"><div className="menu-cat-ic">⭐</div><div className="menu-cat-title">Special Combos</div><div className="menu-cat-line" /></div>
              <div className="pkg-grid">
                {[["Combo Basic", "Hair Cut + Shaving + Face Massage", "₹400"], ["Combo Premium", "Hair Cut + Shaving + Face Massage (Premium)", "₹500"]].map(([n, d, p]) => (
                  <div key={n} className="pkg-card"><div className="pkg-name">{n}</div><div className="pkg-desc">{d}</div><div className="pkg-sizes"><div className="pkg-size"><strong>{p}</strong>Combo</div></div></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="menu-footer">
        <p>© 2025 V-Cut Salon · <a href="https://vcutsalon.in">vcutsalon.in</a> · 15 Branches Across Bangalore</p>
        <p style={{ marginTop: 4, fontSize: ".76rem" }}>Prices subject to change · Contact your nearest branch for current offers</p>
        <div className="menu-cta-row">
          <a href="https://wa.me/919836577807" target="_blank" rel="noreferrer" className="menu-cta-btn cta-wa">💬 WhatsApp</a>
          <a href="tel:+919836577807" className="menu-cta-btn cta-call">📞 +91 98365 77807</a>
          <button className="menu-cta-btn cta-back" onClick={() => setPage("home")}>🏠 Home</button>
        </div>
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <>
      <style>{styles}</style>
      <Nav page={page} setPage={setPage} />
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "booking" && <BookingPage />}
      {page === "menu" && <MenuPage setPage={setPage} />}
      <a href="https://wa.me/919836577807" className="wa-fab" target="_blank" rel="noreferrer">💬</a>
    </>
  );
}
