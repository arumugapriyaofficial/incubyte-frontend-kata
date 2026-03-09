export const DesignCss = `
  @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg-base: #0C0E1A;
    --bg-card: #13162A;
    --bg-glass: rgba(255,255,255,0.04);
    --bg-glass-hover: rgba(255,255,255,0.08);
    --border: rgba(255,255,255,0.08);
    --border-hover: rgba(255,255,255,0.18);
    --text-primary: #F0F2FF;
    --text-secondary: rgba(240,242,255,0.55);
    --text-muted: rgba(240,242,255,0.28);
    --accent: #C8A6FF;
    --accent-glow: rgba(200,166,255,0.25);
    --red: #FF6B6B;
    --yellow: #FFD93D;
    --green: #6BCB77;
    --font-display: 'Unbounded', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --radius-sm: 10px;
    --radius-md: 16px;
    --radius-lg: 24px;
    --radius-xl: 32px;
    --shadow-card: 0 8px 32px rgba(0,0,0,0.4);
    --shadow-glow: 0 0 40px rgba(200,166,255,0.15);
    --transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  body { background: var(--bg-base); font-family: var(--font-body); color: var(--text-primary); min-height: 100vh; }

  .grain-overlay {
    position: fixed; inset: 0; pointer-events: none; z-index: 100;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    opacity: 0.4;
  }

  .bg-orbs {
    position: fixed; inset: 0; pointer-events: none; overflow: hidden; z-index: 0;
  }
  .orb {
    position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.18;
    animation: float 8s ease-in-out infinite;
  }
  .orb-1 { width: 500px; height: 500px; background: #6C5CE7; top: -100px; left: -100px; animation-delay: 0s; }
  .orb-2 { width: 400px; height: 400px; background: #FF6B35; top: 40%; right: -80px; animation-delay: -3s; }
  .orb-3 { width: 300px; height: 300px; background: #4A9EFF; bottom: -50px; left: 30%; animation-delay: -5s; }

  @keyframes float {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-30px) scale(1.05); }
  }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(200,166,255,0.3); border-radius: 4px; }
`;

