/* ================================================================
   1САЙТ — DESIGN SYSTEM
   ================================================================ */
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;overflow-x:hidden;width:100%;}
body{overflow-x:hidden;width:100%;}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto;}}

/* safety net: grid/flex items can refuse to shrink below their content's
   natural width by default, which pushes the whole page wider than the
   screen on mobile — this forces every layout child to respect its track */
.hero-grid > *,.about-grid > *,.problem-grid > *,.case-grid > *,
.services-grid > *,.why-grid > *,.process-list > *,.footer-inner > *,
.contacts-grid > *,.price-head > *{min-width:0;}
img,pre,table,svg{max-width:100%;}

:root{
  /* --- palette (dark, default) --- */
  --bg:#0a0b0d;
  --bg-raised:#121317;
  --bg-card:#15171c;
  --line:rgba(255,255,255,.09);
  --line-strong:rgba(255,255,255,.16);
  --ink:#f2f3f5;
  --ink-dim:rgba(242,243,245,.66);
  --ink-faint:rgba(242,243,245,.4);
  --accent:#3ddc84;
  --accent-ink:#04140c;
  --accent-dim:rgba(61,220,132,.13);
  --accent-glow:rgba(61,220,132,.28);
  --danger:#e05555;

  /* --- type --- */
  --font-body:'Manrope',system-ui,sans-serif;
  --font-mono:'JetBrains Mono',ui-monospace,monospace;

  /* --- spacing / radius --- */
  --radius-sm:6px;
  --radius-md:10px;
  --radius-lg:16px;
  --container:1220px;

  /* --- motion --- */
  --fast:.18s;
  --medium:.35s;
  --slow:.6s;
  --ease-out:cubic-bezier(.16,.84,.44,1);
  --ease-spring:cubic-bezier(.34,1.56,.64,1);
}

[data-theme="light"]{
  --bg:#f6f5f1;
  --bg-raised:#ffffff;
  --bg-card:#ffffff;
  --line:rgba(10,11,13,.1);
  --line-strong:rgba(10,11,13,.18);
  --ink:#0e0f11;
  --ink-dim:rgba(14,15,17,.66);
  --ink-faint:rgba(14,15,17,.42);
  --accent:#0f9d58;
  --accent-ink:#f6f5f1;
  --accent-dim:rgba(15,157,88,.1);
  --accent-glow:rgba(15,157,88,.22);
}

body{
  font-family:var(--font-body);
  background:var(--bg);
  color:var(--ink);
  line-height:1.6;
  overflow-x:hidden;
  transition:background var(--medium) var(--ease-out), color var(--medium) var(--ease-out);
}
a{text-decoration:none;color:inherit;}
img{max-width:100%;display:block;}
button{font-family:inherit;cursor:pointer;}
ul,ol{list-style:none;}
.container{max-width:var(--container);margin:0 auto;padding:0 24px;}
.section-pad{padding:120px 0;}

/* ---- skip link ---- */
.skip-link{
  position:fixed;top:-100%;left:16px;z-index:2000;
  background:var(--accent);color:var(--accent-ink);
  padding:12px 20px;border-radius:var(--radius-sm);font-weight:700;font-size:14px;
  transition:top var(--fast) var(--ease-out);
}
.skip-link:focus{top:16px;}

/* ---- focus ---- */
a:focus-visible,button:focus-visible,summary:focus-visible{
  outline:2px solid var(--accent);outline-offset:3px;border-radius:4px;
}

/* ---- scroll progress ---- */
.progress{position:fixed;top:0;left:0;height:2px;width:0%;background:var(--accent);z-index:1100;}

/* ---- aurora background depth ---- */
body::before,body::after{
  content:'';position:fixed;z-index:-1;border-radius:50%;pointer-events:none;
  filter:blur(80px);opacity:.5;will-change:transform;
}
body::before{top:-10%;left:-10%;width:44vw;height:44vw;max-width:560px;max-height:560px;background:var(--accent-dim);animation:aurora-a 22s ease-in-out infinite alternate;}
body::after{bottom:-15%;right:-8%;width:38vw;height:38vw;max-width:480px;max-height:480px;background:var(--accent-dim);animation:aurora-b 26s ease-in-out infinite alternate;}
@keyframes aurora-a{from{transform:translate(0,0);}to{transform:translate(6vw,8vh);}}
@keyframes aurora-b{from{transform:translate(0,0);}to{transform:translate(-5vw,-6vh);}}
@media (prefers-reduced-motion:reduce){body::before,body::after{animation:none;}}
@media (max-width:768px){body::before,body::after{opacity:.3;filter:blur(60px);}}

/* ---- marquee ticker ---- */
.marquee{background:var(--accent);color:var(--accent-ink);padding:13px 0;overflow:hidden;white-space:nowrap;}
.marquee-track{display:inline-flex;gap:36px;animation:marquee-scroll 26s linear infinite;}
.marquee span{font-family:var(--font-mono);font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;display:inline-flex;align-items:center;gap:36px;}
.marquee span::after{content:'●';font-size:6px;opacity:.6;}
@keyframes marquee-scroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
@media (prefers-reduced-motion:reduce){.marquee-track{animation:none;}}

/* ================================================================
   TYPOGRAPHY
   ================================================================ */
.eyebrow{
  display:inline-block;font-family:var(--font-mono);font-size:12px;
  letter-spacing:.14em;text-transform:uppercase;color:var(--accent);
  margin-bottom:14px;font-weight:500;
}
.h2{font-size:clamp(1.9rem,4vw,2.7rem);font-weight:800;letter-spacing:-.02em;line-height:1.12;position:relative;}
.h2::after{content:'';position:absolute;left:1px;bottom:-12px;height:3px;width:46px;background:var(--accent);transform-origin:left;transform:scaleX(0);transition:transform .8s var(--ease-out) .1s;}
.reveal.visible .h2::after{transform:scaleX(1);}
@media (prefers-reduced-motion:reduce){.h2::after{transition:none;transform:scaleX(1);}}
.lead{font-size:1.06rem;color:var(--ink-dim);max-width:520px;margin-top:16px;}
.accent{color:var(--accent);}
.section-head{max-width:620px;margin-bottom:56px;}

/* ================================================================
   BUTTONS
   ================================================================ */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:13px 26px;border-radius:var(--radius-sm);font-size:14.5px;font-weight:700;
  transition:transform var(--fast) var(--ease-out), background var(--fast), box-shadow var(--fast), color var(--fast), border-color var(--fast);
  white-space:nowrap;
}
.btn-lg{padding:16px 32px;font-size:15px;}
.btn-primary{background:var(--accent);color:var(--accent-ink);position:relative;overflow:hidden;isolation:isolate;}
.btn-primary::after{
  content:'';position:absolute;inset:0;z-index:-1;
  background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.55) 48%,transparent 66%);
  transform:translateX(-130%);transition:transform .7s var(--ease-out);
}
.btn-primary:hover::after{transform:translateX(130%);}
.btn-primary:hover{box-shadow:0 10px 30px var(--accent-glow);transform:translateY(-2px);}
.btn-ghost{border:1px solid var(--line-strong);color:var(--ink);}
.btn-ghost:hover{border-color:var(--accent);color:var(--accent);background:var(--accent-dim);}

/* ================================================================
   HEADER
   ================================================================ */
.header{position:fixed;top:0;left:0;width:100%;z-index:1000;padding:22px 0;transition:padding var(--medium) var(--ease-out), background var(--medium), border-color var(--medium);border-bottom:1px solid transparent;}
.header.scrolled{padding:12px 0;background:color-mix(in srgb, var(--bg) 86%, transparent);backdrop-filter:blur(14px);border-color:var(--line);}
.header-inner{display:flex;align-items:center;justify-content:space-between;max-width:var(--container);margin:0 auto;padding:0 24px;gap:24px;}

.brand{display:flex;align-items:center;gap:10px;font-family:var(--font-mono);font-weight:600;font-size:16px;letter-spacing:.02em;}
.brand-mark{border-radius:6px;flex-shrink:0;}
.brand-cursor{animation:blink 1.1s step-end infinite;}
@keyframes blink{0%,45%{opacity:1;}50%,95%{opacity:0;}100%{opacity:1;}}

.nav-list{display:flex;gap:28px;}
.nav-list a{font-size:13.5px;color:var(--ink-dim);transition:color var(--fast);position:relative;}
.nav-list a:hover{color:var(--ink);}

.header-actions{display:flex;align-items:center;gap:14px;}
.theme-toggle{
  width:38px;height:38px;border-radius:50%;border:1px solid var(--line);
  display:flex;align-items:center;justify-content:center;color:var(--ink-dim);
  transition:border-color var(--fast),color var(--fast);flex-shrink:0;
}
.theme-toggle:hover{border-color:var(--accent);color:var(--accent);}
.theme-toggle svg{width:17px;height:17px;}
.theme-toggle .icon-moon{display:none;}
[data-theme="light"] .theme-toggle .icon-sun{display:none;}
[data-theme="light"] .theme-toggle .icon-moon{display:block;}

.hamburger{display:none;flex-direction:column;gap:5px;padding:6px;z-index:1001;}
.hamburger span{width:22px;height:1.6px;background:var(--ink);transition:transform var(--fast) var(--ease-out),opacity var(--fast);}
.hamburger.active span:nth-child(1){transform:translateY(6.5px) rotate(45deg);}
.hamburger.active span:nth-child(2){opacity:0;}
.hamburger.active span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg);}

.mobile-nav{
  position:fixed;inset:0 0 0 auto;top:0;right:-100%;width:100%;max-width:340px;height:100dvh;
  background:var(--bg-raised);border-left:1px solid var(--line);padding:100px 32px 40px;
  transition:right var(--medium) var(--ease-out);z-index:999;overflow-y:auto;
  display:flex;flex-direction:column;
}
.mobile-nav.open{right:0;}
.mobile-nav-list{display:flex;flex-direction:column;gap:4px;margin-bottom:36px;}
.mobile-nav-list a{font-size:22px;font-weight:700;padding:10px 0;color:var(--ink);opacity:0;transform:translateX(16px);transition:opacity var(--medium) var(--ease-out),transform var(--medium) var(--ease-out);}
.mobile-nav.open .mobile-nav-list a{opacity:1;transform:translateX(0);}
.mobile-nav.open .mobile-nav-list li:nth-child(1) a{transition-delay:.05s;}
.mobile-nav.open .mobile-nav-list li:nth-child(2) a{transition-delay:.1s;}
.mobile-nav.open .mobile-nav-list li:nth-child(3) a{transition-delay:.15s;}
.mobile-nav.open .mobile-nav-list li:nth-child(4) a{transition-delay:.2s;}
.mobile-nav.open .mobile-nav-list li:nth-child(5) a{transition-delay:.25s;}
body.nav-open{overflow:hidden;}

/* ================================================================
   HERO
   ================================================================ */
.hero{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:130px 0 40px;overflow:hidden;}
.hero-glow{position:absolute;top:-20%;right:-10%;width:60vw;height:60vw;max-width:800px;max-height:800px;background:radial-gradient(circle,var(--accent-dim) 0%,transparent 70%);pointer-events:none;z-index:0;}
.hero-grid{position:relative;z-index:1;display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:center;}

.hero-stagger > *{opacity:0;transform:translateY(16px);animation:hero-in var(--slow) var(--ease-out) forwards;}
.hero-stagger .badge{animation-delay:.05s;}
.hero-stagger .eyebrow{animation-delay:.15s;}
.hero-stagger .hero-title{animation-delay:.25s;}
.hero-stagger .hero-text{animation-delay:.38s;}
.hero-stagger .hero-actions{animation-delay:.5s;}
.hero-stagger .hero-trust{animation-delay:.6s;}
@keyframes hero-in{to{opacity:1;transform:translateY(0);}}
@media (prefers-reduced-motion:reduce){.hero-stagger > *{animation:none;opacity:1;transform:none;}}

.badge{
  display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border-radius:100px;
  border:1px solid var(--line-strong);font-size:12.5px;color:var(--ink-dim);margin-bottom:22px;
}
.badge-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 3px var(--accent-dim);}

.hero-title{font-size:clamp(2.4rem,5.4vw,4rem);font-weight:800;line-height:1.05;letter-spacing:-.025em;margin:0 0 22px;}
.hero-text{font-size:clamp(1rem,1.15vw,1.14rem);color:var(--ink-dim);max-width:480px;margin-bottom:34px;}
.hero-actions{display:flex;flex-wrap:wrap;gap:14px;margin-bottom:38px;}
.hero-trust{display:flex;flex-wrap:wrap;gap:10px 22px;}
.hero-trust li{font-family:var(--font-mono);font-size:11.5px;letter-spacing:.04em;color:var(--ink-faint);display:flex;align-items:center;gap:8px;}
.hero-trust li::before{content:'';width:5px;height:5px;background:var(--accent);border-radius:1px;}

/* code window visual */
.hero-visual{position:relative;}
.code-window{
  background:var(--bg-card);border:1px solid var(--line);border-radius:var(--radius-lg);
  overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.35);position:relative;
  max-width:100%;
}
[data-theme="light"] .code-window{box-shadow:0 30px 60px rgba(20,20,10,.12);}
.code-window::before{
  content:'';position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity var(--fast);
  background:radial-gradient(320px circle at var(--mx,50%) var(--my,0%), var(--accent-dim), transparent 70%);
}
.code-window:hover::before{opacity:1;}
.code-bar{display:flex;align-items:center;gap:8px;padding:14px 16px;border-bottom:1px solid var(--line);}
.dot{width:10px;height:10px;border-radius:50%;}
.dot.red{background:#ff5f57;}.dot.yellow{background:#febc2e;}.dot.green{background:#28c840;}
.code-filename{margin-left:8px;font-family:var(--font-mono);font-size:12px;color:var(--ink-faint);}
.code-body{padding:26px 22px;font-family:var(--font-mono);font-size:13.5px;line-height:1.9;overflow-x:auto;color:var(--ink-dim);}
.code-body .c-com{color:var(--ink-faint);font-style:italic;}
.code-body .c-kw{color:#c792ea;}
.code-body .c-str{color:var(--accent);}
.code-body .c-fn{color:#82aaff;}
[data-theme="light"] .code-body .c-kw{color:#8b3fbf;}
[data-theme="light"] .code-body .c-fn{color:#1f5fd6;}
.visual-tag{margin-top:16px;font-family:var(--font-mono);font-size:11.5px;color:var(--ink-faint);text-align:right;letter-spacing:.04em;}

.scroll-cue{position:relative;z-index:1;margin:56px auto 0;display:flex;flex-direction:column;align-items:center;gap:10px;font-family:var(--font-mono);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-faint);width:fit-content;}
.scroll-line{width:1px;height:34px;background:linear-gradient(var(--accent),transparent);}

/* ================================================================
   PROBLEM
   ================================================================ */
.problem{border-top:1px solid var(--line);}
.problem-grid{display:grid;grid-template-columns:.85fr 1.15fr;gap:60px;}
.problem-side h2{margin-top:6px;}
.problem-list{display:flex;flex-direction:column;gap:0;}
.problem-item{display:flex;gap:20px;padding:22px 0;border-bottom:1px solid var(--line);}
.problem-item .num{font-family:var(--font-mono);font-size:13px;color:var(--ink-faint);flex-shrink:0;padding-top:2px;}
.problem-item p{color:var(--ink-dim);font-size:1rem;max-width:480px;}
.problem-item.highlight{border-bottom:none;}
.problem-item.highlight .num{color:var(--accent);}
.problem-item.highlight p{color:var(--ink);font-weight:600;}

/* ================================================================
   ABOUT
   ================================================================ */
.about{border-top:1px solid var(--line);}
.about-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:70px;}
.about-grid p{color:var(--ink-dim);margin-top:16px;max-width:520px;}
.about-facts{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:var(--radius-md);overflow:hidden;align-content:start;}
.fact{background:var(--bg-card);padding:26px 22px;}
.fact-value{display:block;font-family:var(--font-mono);font-size:1.7rem;font-weight:600;color:var(--accent);margin-bottom:8px;}
.fact-value .count{font-variant-numeric:tabular-nums;}
.fact-label{font-size:12.5px;color:var(--ink-faint);line-height:1.5;}

/* ================================================================
   WORK
   ================================================================ */
.work{border-top:1px solid var(--line);}
.case-featured{
  display:grid;grid-template-columns:1.15fr 1fr;gap:0;background:var(--bg-card);
  border:1px solid var(--line);border-radius:var(--radius-lg);overflow:hidden;margin-bottom:24px;
  transition:border-color var(--medium),transform var(--medium) var(--ease-out);
}
.case-featured:hover{border-color:var(--line-strong);transform:translateY(-4px);}
.case-featured-media{position:relative;overflow:hidden;min-height:320px;}
.case-featured-media img{width:100%;height:100%;object-fit:cover;transition:transform var(--slow) var(--ease-out);filter:saturate(.9);}
.case-featured:hover .case-featured-media img{transform:scale(1.035);}
.case-arrow{position:absolute;top:20px;right:20px;width:42px;height:42px;border-radius:50%;background:var(--bg);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:18px;transition:transform var(--medium) var(--ease-spring),background var(--fast),color var(--fast);}
.case-featured:hover .case-arrow{transform:translate(4px,-4px);background:var(--accent);color:var(--accent-ink);}
.case-featured-info{padding:40px;display:flex;flex-direction:column;}
.case-status{font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);display:inline-flex;align-items:center;gap:6px;margin-bottom:14px;}
.case-status::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--accent);}
.case-status.open{color:var(--ink-faint);}
.case-status.open::before{background:var(--ink-faint);}
.case-featured-info h3{font-size:1.5rem;font-weight:700;margin-bottom:14px;}
.case-context{font-size:14px;color:var(--ink-dim);margin-bottom:10px;line-height:1.7;}
.case-context strong{color:var(--ink);}
.case-stack{display:flex;gap:8px;margin:16px 0 20px;flex-wrap:wrap;}
.case-stack span{font-family:var(--font-mono);font-size:11px;padding:5px 10px;border:1px solid var(--line-strong);border-radius:100px;color:var(--ink-faint);}
.case-link{font-family:var(--font-mono);font-size:13px;color:var(--ink);font-weight:600;margin-top:auto;display:inline-flex;align-items:center;gap:6px;}

.case-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
.case-card{
  background:var(--bg-card);border:1px solid var(--line);border-radius:var(--radius-lg);
  padding:34px;display:flex;flex-direction:column;min-height:220px;position:relative;overflow:hidden;
  transition:border-color var(--medium),transform var(--medium) var(--ease-out);
}
.case-card > *{position:relative;z-index:1;}
.case-card:hover{border-color:var(--line-strong);transform:translateY(-4px);}
.case-card-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;}
.case-icon{font-family:var(--font-mono);color:var(--ink-faint);font-size:14px;}
.case-card h3{font-size:1.2rem;font-weight:700;margin-bottom:10px;}
.case-card p{color:var(--ink-dim);font-size:14px;line-height:1.7;margin-bottom:16px;}
.case-card-open{border-style:dashed;justify-content:center;align-items:flex-start;}
.case-card-open .service-link{margin-top:auto;}

/* ================================================================
   SERVICES
   ================================================================ */
.services{border-top:1px solid var(--line);}
.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
.service-card{
  background:var(--bg-card);border:1px solid var(--line);border-radius:var(--radius-lg);
  padding:34px;display:flex;flex-direction:column;position:relative;overflow:hidden;
  transition:border-color var(--medium),transform var(--medium) var(--ease-out),box-shadow var(--medium);
  transform-style:preserve-3d;will-change:transform;
}
.service-card::before,.case-card::before,.why-item::before{
  content:'';position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity var(--fast);z-index:0;
  background:radial-gradient(260px circle at var(--mx,50%) var(--my,50%), var(--accent-dim), transparent 70%);
}
.service-card:hover::before,.case-card:hover::before,.why-item:hover::before{opacity:1;}
.service-card > *{position:relative;z-index:1;}
.service-card:hover{border-color:var(--accent);transform:translateY(-5px);box-shadow:0 20px 44px rgba(0,0,0,.22);}
.service-card.featured{background:linear-gradient(180deg,var(--bg-card),var(--bg-raised));border-color:var(--line-strong);}
.service-num{font-family:var(--font-mono);color:var(--accent);font-size:13px;margin-bottom:16px;display:block;}
.service-card h3{font-size:1.28rem;font-weight:700;margin-bottom:6px;}
.service-price{font-family:var(--font-mono);font-size:1.05rem;font-weight:600;color:var(--accent);margin-bottom:14px;}
.service-for{font-size:12.5px;color:var(--ink-faint);margin-bottom:12px;}
.service-card > p:not(.service-for){color:var(--ink-dim);font-size:14.5px;line-height:1.7;margin-bottom:18px;}
.service-includes{display:flex;flex-direction:column;gap:8px;margin-bottom:24px;}
.service-includes li{font-size:13px;color:var(--ink-dim);padding-left:16px;position:relative;}
.service-includes li::before{content:'—';position:absolute;left:0;color:var(--accent);}
.service-link{margin-top:auto;font-family:var(--font-mono);font-size:13px;font-weight:600;color:var(--ink);display:inline-flex;align-items:center;gap:6px;transition:gap var(--fast);}
.service-card:hover .service-link,.case-card:hover .service-link{gap:10px;color:var(--accent);}

/* ================================================================
   PROCESS
   ================================================================ */
.process{border-top:1px solid var(--line);}
.process-list{position:relative;display:grid;grid-template-columns:repeat(6,1fr);gap:0;counter-reset:none;}
.process-list::before{content:'';position:absolute;top:14px;left:0;right:0;height:1px;background:var(--line);}
.process-step{position:relative;padding:0 18px 0 0;opacity:0;transform:translateY(14px);transition:opacity var(--slow) var(--ease-out),transform var(--slow) var(--ease-out);}
.process-step.visible{opacity:1;transform:translateY(0);}
.process-num{
  display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;
  background:var(--bg);border:1px solid var(--line-strong);font-family:var(--font-mono);font-size:11px;
  color:var(--ink-dim);margin-bottom:20px;position:relative;z-index:1;
}
.process-step.visible .process-num{background:var(--accent);color:var(--accent-ink);border-color:var(--accent);}
.process-step h3{font-size:1.02rem;font-weight:700;margin-bottom:8px;}
.process-step p{font-size:13px;color:var(--ink-dim);line-height:1.65;}

/* ================================================================
   PRICE
   ================================================================ */
.price{border-top:1px solid var(--line);}
.price-box{
  position:relative;background:var(--bg-card);border:1px solid var(--line);border-radius:var(--radius-lg);
  padding:56px;overflow:hidden;
}
.price-box::before{
  content:'';position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity var(--fast);
  background:radial-gradient(400px circle at var(--mx,50%) var(--my,0%), var(--accent-dim), transparent 70%);
}
.price-box:hover::before{opacity:1;}
.price-box > *{position:relative;z-index:1;}
.price-head{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:end;}
.price-tiers{display:flex;flex-direction:column;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:var(--radius-md);overflow:hidden;}
.price-tier{background:var(--bg-raised);padding:18px 22px;display:flex;justify-content:space-between;align-items:center;gap:12px;}
.price-tier.featured{background:var(--accent-dim);}
.price-tier-value{font-family:var(--font-mono);font-weight:700;font-size:1.1rem;color:var(--accent);}
.price-tier-label{font-size:13px;color:var(--ink-dim);text-align:right;}
.price-points{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin:40px 0 36px;padding-top:36px;border-top:1px solid var(--line);}
.price-point h4{font-size:14.5px;font-weight:700;margin-bottom:8px;}
.price-point p{font-size:13.5px;color:var(--ink-dim);line-height:1.7;}

/* ================================================================
   WHY
   ================================================================ */
.why{border-top:1px solid var(--line);}
.why-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:var(--radius-md);overflow:hidden;}
.why-item{background:var(--bg-card);padding:30px 22px;position:relative;overflow:hidden;}
.why-item > *{position:relative;z-index:1;}
.why-item .num{display:block;font-family:var(--font-mono);color:var(--accent);font-size:12px;margin-bottom:14px;}
.why-item h4{font-size:1rem;font-weight:700;margin-bottom:8px;}
.why-item p{font-size:13px;color:var(--ink-dim);line-height:1.65;}

/* ================================================================
   FAQ
   ================================================================ */
.faq{border-top:1px solid var(--line);}
.faq-list{max-width:760px;}
.faq-item{border-bottom:1px solid var(--line);padding:22px 0;}
.faq-item summary{
  cursor:pointer;font-weight:700;font-size:1.02rem;list-style:none;display:flex;justify-content:space-between;
  align-items:center;gap:20px;
}
.faq-item summary::-webkit-details-marker{display:none;}
.faq-item summary::after{content:'+';font-family:var(--font-mono);font-size:20px;color:var(--accent);flex-shrink:0;transition:transform var(--fast) var(--ease-out);}
.faq-item[open] summary::after{transform:rotate(45deg);}
.faq-item p{color:var(--ink-dim);font-size:14.5px;margin-top:14px;max-width:640px;line-height:1.75;}

/* ================================================================
   CONTACT
   ================================================================ */
.contact{border-top:1px solid var(--line);}
.contact-box{max-width:680px;}
.contact-title{margin-top:6px;}
.contact-actions{display:flex;flex-wrap:wrap;gap:14px;margin:34px 0 24px;}
.contact-github{font-family:var(--font-mono);font-size:13.5px;color:var(--ink-faint);transition:color var(--fast);}
.contact-github:hover{color:var(--accent);}

/* ================================================================
   FOOTER
   ================================================================ */
.footer{border-top:1px solid var(--line);padding:32px 0;}
.footer-inner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;}
.footer-inner p{font-size:12.5px;color:var(--ink-faint);}
.footer-inner a:not(.brand){font-family:var(--font-mono);font-size:12.5px;color:var(--ink-faint);transition:color var(--fast);}
.footer-inner a:not(.brand):hover{color:var(--accent);}

/* ================================================================
   REVEAL
   ================================================================ */
.reveal{opacity:0;transform:translateY(24px);transition:opacity var(--slow) var(--ease-out),transform var(--slow) var(--ease-out);}
.reveal.visible{opacity:1;transform:translateY(0);}
.reveal[data-reveal="strong"]{transform:translateY(40px) scale(.98);}
@media (prefers-reduced-motion:reduce){
  .reveal{opacity:1;transform:none;transition:none;}
  .process-step{opacity:1;transform:none;transition:none;}
}

/* ================================================================
   RESPONSIVE
   ================================================================ */
@media (max-width:1080px){
  .hero-grid{grid-template-columns:1fr;gap:56px;}
  .hero-visual{max-width:560px;}
  .about-grid,.problem-grid{grid-template-columns:1fr;gap:40px;}
  .case-featured{grid-template-columns:1fr;}
  .case-featured-media{min-height:260px;}
  .why-grid{grid-template-columns:repeat(2,1fr);}
  .price-head{grid-template-columns:1fr;gap:28px;align-items:start;}
}
@media (max-width:900px){
  .services-grid{grid-template-columns:1fr;}
  .process-list{grid-template-columns:1fr;gap:26px;}
  .process-list::before{display:none;}
  .process-step{display:flex;gap:20px;padding-left:0;}
  .process-num{margin-bottom:0;flex-shrink:0;}
  .process-list{position:relative;}
  .process-list::after{content:'';position:absolute;top:14px;bottom:14px;left:13px;width:1px;background:var(--line);}
}
@media (max-width:768px){
  .nav-list,.header-actions .btn-primary{display:none;}
  .hamburger{display:flex;}
  .section-pad{padding:80px 0;}
  .case-grid{grid-template-columns:1fr;}
  .price-points{grid-template-columns:1fr;gap:20px;}
  .why-grid{grid-template-columns:1fr;}
  .price-box{padding:34px 26px;}
  .case-featured-info{padding:28px;}
}
@media (max-width:480px){
  .container{padding:0 18px;}
  .header-inner{padding:0 18px;}
  .btn{width:100%;}
  .hero-actions{flex-direction:column;}
  .hero-actions .btn{width:100%;}
  .contact-actions{flex-direction:column;}
  .contact-actions .btn{width:100%;}
}

/* ---- desktop-only affordances ---- */
@media (hover:none){
  .code-window::before,.price-box::before,.service-card::before,.case-card::before,.why-item::before{display:none;}
  .service-card,.case-card{transform:none !important;}
}