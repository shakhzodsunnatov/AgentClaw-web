import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

/* ── Reusable SVGs (Zero Standard Placeholders) ── */
const LogoSVG = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#1D1D1F" />
    <path d="M50 25C36 25 25 36 25 50C25 64 36 75 50 75C64 75 75 64 75 50" stroke="#0066CC" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 20"/>
    <circle cx="50" cy="50" r="12" fill="#0066CC" />
  </svg>
);

const CheckSVG = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlaySVG = () => (
  <svg viewBox="0 0 24 24" fill="none"><path d="M5 3l14 9-14 9V3z" fill="currentColor"/></svg>
);

/* ── Physics Hooks ── */

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    
    const els = ref.current.querySelectorAll('.reveal');
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

function useDynamicTracking() {
  const ref = useRef(null);
  useEffect(() => {
    const handleMouse = (e) => {
      if (!ref.current) return;
      const pct = e.clientX / window.innerWidth;
      // Stretches lettering subtly based on mouse X (sub-pixel design)
      ref.current.style.letterSpacing = `${-0.04 + (pct * 0.02)}em`;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);
  return ref;
}

function InteractiveHeroPhone() {
  const stageRef = useRef(null);
  const [msgs, setMsgs] = useState([]);

  // Physics Mouse tracking (3D tilt)
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    
    const handleMouse = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const rotY = ((e.clientX - w/2) / w) * 12; // max tilt 12deg
      const rotX = -((e.clientY - h/2) / h) * 12;
      
      el.style.setProperty('--rotY', `${rotY}deg`);
      el.style.setProperty('--rotX', `${rotX}deg`);
    };
    
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // UI Simulation Loop (with StrictMode guard)
  const didRun = useRef(false);
  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    const sequence = [
      { t: 800, type: 'b-user', txt: 'Review the latest PR on the UI repo.' },
      { t: 1600, type: 'b-tool', txt: '>>> github.get_pr_diff(repo="ui", id=42)' },
      { t: 3200, type: 'b-bot', txt: 'PR #42: 3 files changed. CSS vars reduce shadow fidelity but improve render by ~2ms. Safe to merge.' },
    ];
    sequence.forEach((item) => {
      setTimeout(() => setMsgs(prev => [...prev, item]), item.t);
    });
  }, []);

  return (
    <div className="hero-visual-stage reveal d-3">
      {/* Absolute SVG Mesh Behind Phone */}
      <svg className="svg-network" viewBox="0 0 1000 600" preserveAspectRatio="none">
        <path className="mesh-path" d="M 200,600 C 200,400 400,300 500,300 C 600,300 800,200 800,0" />
        <path className="mesh-path" d="M 100,600 C 150,450 350,400 500,300 C 650,200 850,100 900,0" style={{animationDelay: '-5s'}}/>
        <circle className="node-orb" cx="500" cy="300" r="4" />
      </svg>

      <div className="device-container" ref={stageRef}>
        <div className="device-frame">
          <div className="device-notch"></div>
          <div className="device-screen">
            <div className="device-ui">
              <div className="ui-header">
                <LogoSVG /> Agent Workspace
              </div>
              {msgs.map((m, idx) => (
                <div key={idx} className={`ui-bubble ${m.type}`}>{m.txt}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Orbiting Stat Panels */}
        <div className="panel-orbit orbit-L">
           <div className="panel-title">Active Node <div style={{width: 6, height: 6, borderRadius: '50%', background: 'var(--c-success)'}}></div></div>
           <div className="panel-val">Claude Opus 4</div>
        </div>
        <div className="panel-orbit orbit-R">
           <div className="panel-title">Latency</div>
           <div className="panel-val">12.4 ms</div>
           <div className="panel-bar-bg"><div className="panel-bar-val" style={{width: '20%'}}></div></div>
        </div>
      </div>
    </div>
  );
}

// Custom animated Progress Bar for table
function ProgBar({ pct, color }) {
  const [w, setW] = useState(0);
  useEffect(() => { setTimeout(() => setW(pct), 500); }, [pct]);
  return (
    <div className="bar-track">
      <div className="bar-fill" style={{width: `${w}%`, background: color, transition: 'width 1.5s var(--spring-bounce)'}}></div>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item reveal ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="faq-q">
        <span>{q}</span>
        <svg className="faq-chevron" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
}

/* ═══════════════ MAIN COMPONENT ═══════════════ */
export default function Landing() {
  const pageRef = useScrollReveal();
  const trackRef = useDynamicTracking();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="master-wrap" ref={pageRef}>
      <div className="grid-surgical"></div>
      <div className="ambient-glow"></div>

      {/* ── Top Nav ── */}
      <nav className={`top-nav ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-brand">
          <LogoSVG /> AgentClaw
        </Link>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#compare">Compare</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div>
          <a href="https://apps.apple.com/app/agentclaw" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{padding: '10px 20px', fontSize: '0.9rem'}} aria-label="Download AgentClaw on the App Store">Download Free</a>
        </div>
      </nav>

      {/* ── Precision Hero ── */}
      <section className="hero">
        <div className="hero-pill reveal">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="8"/></svg>
          Native iOS OpenClaw Client
        </div>
        
        <h1 className="hero-title reveal d-1" ref={trackRef}>
          Deploy <span>OpenClaw</span><br/>on iPhone.
        </h1>

        <p className="hero-desc reveal d-2">
          AgentClaw is the native iOS app for OpenClaw AI agents. Isolated Docker containers,
          persistent memory, and background cron jobs — live in 12 seconds. Zero DevOps.
        </p>

        <div className="hero-actions reveal d-3">
          <a href="https://apps.apple.com/app/agentclaw" target="_blank" rel="noopener noreferrer" className="btn-primary" aria-label="Download AgentClaw on the App Store">Download on App Store <PlaySVG /></a>
          <a href="#features" className="btn-secondary">See All Features</a>
        </div>

        <InteractiveHeroPhone />
      </section>

      {/* ── Core Features Bento ── */}
      <section id="features" className="sec-pad">
        <div className="sec-head reveal">
          <span className="sec-lbl">Features</span>
          <h2 className="sec-heading">Everything you need to run OpenClaw agents from your iPhone.</h2>
          <p className="sec-desc">Real tools. Real automation. Not a chat wrapper — a full agent control center.</p>
        </div>

        <div className="bento-array">

          <article className="bento-node span-2 reveal">
            <div className="bento-svg-wrap">
              <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
                <rect x="10" y="10" width="180" height="80" rx="8" stroke="var(--c-border)" strokeWidth="2"/>
                <path d="M10 30h180" stroke="var(--c-border)" strokeWidth="2"/>
                <circle cx="22" cy="20" r="4" fill="#FF5F57"/><circle cx="34" cy="20" r="4" fill="#FEBC2E"/><circle cx="46" cy="20" r="4" fill="#28C840"/>
                <text x="20" y="50" fontFamily="monospace" fontSize="11" fill="var(--c-hyper-blue)">$</text>
                <text x="30" y="50" fontFamily="monospace" fontSize="11" fill="var(--c-text-primary)">openclaw exec "git status"</text>
                <text x="20" y="68" fontFamily="monospace" fontSize="10" fill="var(--c-text-secondary)">On branch main, 3 files changed</text>
              </svg>
            </div>
            <h3 className="bento-title">Interactive Terminal — Full SSH Into Your Agent</h3>
            <p className="bento-desc">WebSocket-based PTY terminal directly in the app. Run vim, top, git — any interactive command. Supports Ctrl+C signals, auto-resize, and even port forwarding from container to your device.</p>
          </article>

          <article className="bento-node reveal d-1">
            <div className="bento-svg-wrap">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="40" r="20" stroke="var(--c-text-primary)" strokeWidth="2"/>
                <path d="M48 37l8 8 16-16" stroke="var(--c-hyper-blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M30 80c0-16 14-28 30-28s30 12 30 28" stroke="var(--c-text-primary)" strokeWidth="2"/>
                <circle cx="28" cy="60" r="12" stroke="var(--c-border)" strokeWidth="2"/>
                <circle cx="92" cy="60" r="12" stroke="var(--c-border)" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="bento-title">Apple &amp; Google Sign-In</h3>
            <p className="bento-desc">One-tap authentication. Sign in with your existing Apple ID or Google account. JWT tokens with 24h access + 7-day refresh.</p>
          </article>

          <article className="bento-node reveal">
            <div className="bento-svg-wrap">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <ellipse className="disk disk-1" cx="60" cy="40" rx="40" ry="15" fill="var(--c-surf)" stroke="var(--c-text-primary)" strokeWidth="2" />
                <ellipse className="disk disk-2" cx="60" cy="60" rx="40" ry="15" fill="var(--c-surf)" stroke="var(--c-text-primary)" strokeWidth="2" />
                <ellipse className="disk disk-3" cx="60" cy="80" rx="40" ry="15" fill="var(--c-surf)" stroke="var(--c-text-primary)" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="bento-title">Persistent Memory (pgvector)</h3>
            <p className="bento-desc">Your agent remembers everything across sessions. Vector embeddings store context, so the agent learns your preferences and past conversations over time.</p>
          </article>

          <article className="bento-node span-2 reveal d-1">
            <div className="bento-svg-wrap">
              <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
                <path d="M20 50 L180 50" stroke="var(--c-border)" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="40" cy="50" r="16" fill="var(--c-surf)" stroke="var(--c-text-primary)" strokeWidth="3" />
                <text x="35" y="54" fontFamily="monospace" fontSize="10" fill="var(--c-text-primary)">8am</text>
                <circle cx="100" cy="50" r="16" fill="var(--c-surf)" stroke="var(--c-text-primary)" strokeWidth="3" />
                <text x="93" y="54" fontFamily="monospace" fontSize="10" fill="var(--c-text-primary)">12pm</text>
                <circle cx="160" cy="50" r="16" fill="var(--c-hyper-blue)" />
                <circle cx="160" cy="50" className="circle-pulse" fill="var(--c-hyper-blue)" />
                <text x="153" y="54" fontFamily="monospace" fontSize="10" fill="#fff">6pm</text>
              </svg>
            </div>
            <h3 className="bento-title">Cron Jobs — Schedule Agents to Run Automatically</h3>
            <p className="bento-desc">Tell your agent: "Every morning at 8 AM, check my GitHub for new issues." It runs on schedule inside its Docker container — even while your phone is in your pocket. Push notification when done.</p>
          </article>

          <article className="bento-node reveal">
            <div className="bento-svg-wrap">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <rect x="20" y="20" width="80" height="80" rx="16" stroke="var(--c-border)" strokeWidth="2"/>
                <rect x="30" y="30" width="60" height="60" rx="8" fill="var(--c-surf)"/>
                <path d="M50 60 L58 68 L72 50" stroke="var(--c-hyper-blue)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="bento-title">Isolated Docker per Agent</h3>
            <p className="bento-desc">Every agent gets its own container with Node.js 22, Bash, Git, and sudo. Full process isolation. API keys encrypted with AES-256.</p>
          </article>

          <article className="bento-node reveal d-1">
            <div className="bento-svg-wrap">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <rect x="15" y="25" width="40" height="35" rx="6" stroke="var(--c-text-primary)" strokeWidth="2"/>
                <text x="25" y="47" fontFamily="monospace" fontSize="11" fill="var(--c-hyper-blue)">SSE</text>
                <rect x="65" y="25" width="40" height="35" rx="6" stroke="var(--c-text-primary)" strokeWidth="2"/>
                <text x="70" y="47" fontFamily="monospace" fontSize="11" fill="var(--c-hyper-blue)">Chat</text>
                <rect x="15" y="70" width="40" height="35" rx="6" stroke="var(--c-text-primary)" strokeWidth="2"/>
                <text x="19" y="92" fontFamily="monospace" fontSize="11" fill="var(--c-hyper-blue)">Tools</text>
                <rect x="65" y="70" width="40" height="35" rx="6" stroke="var(--c-text-primary)" strokeWidth="2"/>
                <text x="77" y="92" fontFamily="monospace" fontSize="11" fill="var(--c-hyper-blue)">MD</text>
              </svg>
            </div>
            <h3 className="bento-title">Streaming Chat + Markdown</h3>
            <p className="bento-desc">Real-time SSE streaming with live tool activity indicators. See exactly which tools the agent uses (read, exec, web_search). Full Markdown rendering when complete.</p>
          </article>

          <article className="bento-node span-2 reveal">
            <div className="bento-svg-wrap" style={{justifyContent: 'flex-start', alignItems: 'flex-end', paddingBottom: 0}}>
               <div style={{width: '100%', borderBottom: '2px solid var(--c-text-primary)', position: 'relative'}}>
                  <div style={{position: 'absolute', bottom: 0, left: '10%', width: 2, height: 50, background: 'var(--c-hyper-blue)'}}></div>
                  <div style={{position: 'absolute', bottom: 0, left: '25%', width: 2, height: 35, background: 'var(--c-text-primary)'}}></div>
                  <div style={{position: 'absolute', bottom: 0, left: '40%', width: 2, height: 65, background: 'var(--c-hyper-blue)'}}></div>
                  <div style={{position: 'absolute', bottom: 0, left: '55%', width: 2, height: 40, background: 'var(--c-text-primary)'}}></div>
                  <div style={{position: 'absolute', bottom: 0, left: '70%', width: 2, height: 80, background: 'var(--c-hyper-blue)'}}></div>
                  <div style={{position: 'absolute', bottom: 0, left: '85%', width: 2, height: 30, background: 'var(--c-text-primary)'}}></div>
               </div>
             </div>
             <h3 className="bento-title">12+ Built-in Tools + Skills Marketplace</h3>
             <p className="bento-desc">Every agent ships with read, write, edit, exec, web_search, web_fetch, browser, cron, and more. Install additional skills from the marketplace: GitHub, Slack, Google Workspace (Gmail, Calendar, Drive), weather, and beyond.</p>
          </article>

          <article className="bento-node reveal d-1">
            <div className="bento-svg-wrap">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <path d="M60 20L80 40H40L60 20Z" fill="var(--c-hyper-blue)" opacity="0.2"/>
                <rect x="25" y="40" width="70" height="50" rx="8" stroke="var(--c-text-primary)" strokeWidth="2"/>
                <path d="M40 55h40M40 65h30M40 75h20" stroke="var(--c-border)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="bento-title">Workspace File Editor</h3>
            <p className="bento-desc">Edit your agent's personality files directly from iOS: SOUL.md (behavior), IDENTITY.md (role), USER.md (context), MEMORY.md (long-term memory), and AGENTS.md (multi-agent config).</p>
          </article>

          <article className="bento-node reveal d-2">
            <div className="bento-svg-wrap">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <path d="M60 25v15M40 35l7 12M80 35l-7 12" stroke="var(--c-hyper-blue)" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="60" cy="65" r="25" stroke="var(--c-text-primary)" strokeWidth="2"/>
                <path d="M60 50v15l10 8" stroke="var(--c-hyper-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="bento-title">Native Push Notifications</h3>
            <p className="bento-desc">Get push alerts via Apple APNs when cron jobs finish, when your Telegram bot receives a message, or when an agent needs your attention. No email polling.</p>
          </article>

          <article className="bento-node reveal d-3">
            <div className="bento-svg-wrap">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <path d="M30 60l15-30h30l15 30-15 30H45L30 60z" stroke="var(--c-text-primary)" strokeWidth="2"/>
                <circle cx="60" cy="60" r="15" fill="var(--c-surf)" stroke="var(--c-hyper-blue)" strokeWidth="2"/>
                <path d="M55 60l4 4 8-8" stroke="var(--c-hyper-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="bento-title">Telegram Bot Channel</h3>
            <p className="bento-desc">Connect a Telegram bot to your agent. Message it from any device — your OpenClaw agent responds automatically with full tool access. Logs appear in the iOS app.</p>
          </article>

        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="sec-pad">
        <div className="sec-head reveal">
          <span className="sec-lbl">How It Works</span>
          <h2 className="sec-heading">From download to deployed in 3 steps.</h2>
          <p className="sec-desc">No terminal. No YAML. No cloud console. Just your iPhone.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card reveal">
            <div className="step-number">01</div>
            <div className="step-icon">
              <svg viewBox="0 0 48 48" fill="none"><rect x="12" y="6" width="24" height="36" rx="4" stroke="var(--c-hyper-blue)" strokeWidth="3"/><circle cx="24" cy="36" r="2" fill="var(--c-hyper-blue)"/><line x1="18" y1="10" x2="30" y2="10" stroke="var(--c-hyper-blue)" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <h3>Download AgentClaw</h3>
            <p>Install from the App Store. Sign in with Apple or Google. Takes 30 seconds.</p>
          </div>
          <div className="step-card reveal d-1">
            <div className="step-number">02</div>
            <div className="step-icon">
              <svg viewBox="0 0 48 48" fill="none"><rect x="4" y="8" width="40" height="32" rx="4" stroke="var(--c-hyper-blue)" strokeWidth="3"/><path d="M4 16h40" stroke="var(--c-hyper-blue)" strokeWidth="3"/><circle cx="10" cy="12" r="2" fill="var(--c-hyper-blue)"/><circle cx="16" cy="12" r="2" fill="var(--c-hyper-blue)"/><path d="M12 24l6 6-6 6M22 30h14" stroke="var(--c-hyper-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3>Configure Your Agent</h3>
            <p>Name your bot, pick a model (Claude, GPT-4, Gemini), set personality and tools. Tap deploy.</p>
          </div>
          <div className="step-card reveal d-2">
            <div className="step-number">03</div>
            <div className="step-icon">
              <svg viewBox="0 0 48 48" fill="none"><path d="M24 4l6 8H18l6-8z" fill="var(--c-hyper-blue)"/><rect x="8" y="12" width="32" height="28" rx="4" stroke="var(--c-hyper-blue)" strokeWidth="3"/><path d="M16 22l6 6 10-12" stroke="var(--c-hyper-blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3>Agent Goes Live</h3>
            <p>Your OpenClaw agent spins up in an isolated Docker container in ~12 seconds. Chat, schedule cron jobs, install skills.</p>
          </div>
        </div>
      </section>

      {/* ── WOW Comparison: 3 Ways to Run OpenClaw ── */}
      <section id="compare" className="sec-pad">
        <div className="sec-head reveal">
          <span className="sec-lbl">Compare</span>
          <h2 className="sec-heading">Three ways to run OpenClaw. One clear winner.</h2>
          <p className="sec-desc">OpenClaw is powerful — but how you access it makes all the difference.</p>
        </div>

        <div className="compare-grid">
          {/* Column 1: Raw CLI */}
          <div className="compare-card compare-dim reveal">
            <div className="compare-icon">
              <svg viewBox="0 0 48 48" fill="none"><rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2.5"/><path d="M4 16h40" stroke="currentColor" strokeWidth="2.5"/><circle cx="10" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/><circle cx="20" cy="12" r="1.5" fill="currentColor"/><path d="M12 24l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 34h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <h3>OpenClaw CLI</h3>
            <p className="compare-subtitle">Self-hosted, manual setup</p>
            <ul className="compare-list">
              <li className="compare-con"><svg viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> Requires Docker, Linux server</li>
              <li className="compare-con"><svg viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> YAML config &amp; terminal only</li>
              <li className="compare-con"><svg viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> No GUI, no mobile access</li>
              <li className="compare-con"><svg viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> Manual updates &amp; maintenance</li>
              <li className="compare-con"><svg viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> No push notifications</li>
              <li className="compare-pro"><svg viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Full control over everything</li>
              <li className="compare-pro"><svg viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Free (self-hosted)</li>
            </ul>
            <div className="compare-verdict">For DevOps engineers only</div>
          </div>

          {/* Column 2: Web Clients */}
          <div className="compare-card compare-dim reveal d-1">
            <div className="compare-icon">
              <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5"/><path d="M6 24h36M24 6c-6 6-6 30 0 36M24 6c6 6 6 30 0 36" stroke="currentColor" strokeWidth="2"/></svg>
            </div>
            <h3>Web Clients</h3>
            <p className="compare-subtitle">Browser-based, limited access</p>
            <ul className="compare-list">
              <li className="compare-con"><svg viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> No real push notifications</li>
              <li className="compare-con"><svg viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> Chat only — no terminal access</li>
              <li className="compare-con"><svg viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> Can't edit workspace files</li>
              <li className="compare-con"><svg viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> 1-2 models, vendor lock-in</li>
              <li className="compare-con"><svg viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> Shared infrastructure</li>
              <li className="compare-pro"><svg viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Works in any browser</li>
              <li className="compare-pro"><svg viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> No install required</li>
            </ul>
            <div className="compare-verdict">Basic chat, missing the power</div>
          </div>

          {/* Column 3: AgentClaw — HIGHLIGHTED */}
          <div className="compare-card compare-hero reveal d-2">
            <div className="compare-badge">Best Experience</div>
            <div className="compare-icon">
              <LogoSVG />
            </div>
            <h3>AgentClaw</h3>
            <p className="compare-subtitle">Native iOS, full OpenClaw power</p>
            <ul className="compare-list">
              <li className="compare-pro"><svg viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Apple Push Notifications (APNs)</li>
              <li className="compare-pro"><svg viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Full interactive terminal + port forwarding</li>
              <li className="compare-pro"><svg viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Edit SOUL.md, MEMORY.md, AGENTS.md</li>
              <li className="compare-pro"><svg viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> 8+ AI models via OpenRouter</li>
              <li className="compare-pro"><svg viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> 1:1 Docker isolation per agent</li>
              <li className="compare-pro"><svg viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Cron jobs + Telegram channel</li>
              <li className="compare-pro"><svg viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> 12+ tools + skills marketplace</li>
              <li className="compare-pro"><svg viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Deploy in 12 seconds, zero DevOps</li>
            </ul>
            <a href="https://apps.apple.com/app/agentclaw" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{width: '100%', textAlign: 'center', marginTop: '1.5rem'}}>Download Free</a>
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="sec-pad">
        <div className="sec-head reveal">
          <span className="sec-lbl">Use Cases</span>
          <h2 className="sec-heading">What people build with AgentClaw.</h2>
          <p className="sec-desc">Real workflows. Real automation. All from your pocket.</p>
        </div>

        <div className="usecases-grid">
          <div className="usecase-card reveal">
            <div className="usecase-emoji">
              <svg viewBox="0 0 32 32" fill="none"><path d="M4 8h24v16H4z" stroke="var(--c-text-primary)" strokeWidth="2"/><path d="M8 12h8M8 16h12M8 20h6" stroke="var(--c-hyper-blue)" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <h3>Code Review Autopilot</h3>
            <p>Agent monitors your GitHub repos, reviews PRs automatically, and sends Slack summaries every morning at 9 AM via cron.</p>
          </div>
          <div className="usecase-card reveal d-1">
            <div className="usecase-emoji">
              <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" stroke="var(--c-text-primary)" strokeWidth="2"/><path d="M16 8v8l6 4" stroke="var(--c-hyper-blue)" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <h3>Market Data Monitor</h3>
            <p>Set up a cron job to fetch stock/crypto data, analyze trends, and push notifications to your iPhone when thresholds hit.</p>
          </div>
          <div className="usecase-card reveal d-2">
            <div className="usecase-emoji">
              <svg viewBox="0 0 32 32" fill="none"><path d="M6 26L16 6l10 20H6z" stroke="var(--c-text-primary)" strokeWidth="2" strokeLinejoin="round"/><circle cx="16" cy="18" r="2" fill="var(--c-hyper-blue)"/><line x1="16" y1="12" x2="16" y2="16" stroke="var(--c-hyper-blue)" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <h3>Infrastructure Watchdog</h3>
            <p>Agent pings your endpoints, monitors uptime, and alerts you instantly if something goes down. Runs 24/7 in its container.</p>
          </div>
          <div className="usecase-card reveal d-3">
            <div className="usecase-emoji">
              <svg viewBox="0 0 32 32" fill="none"><rect x="4" y="4" width="24" height="24" rx="4" stroke="var(--c-text-primary)" strokeWidth="2"/><path d="M10 16h12M16 10v12" stroke="var(--c-hyper-blue)" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <h3>Personal Research Assistant</h3>
            <p>Ask your agent to search the web, read documents, summarize findings, and remember context across conversations.</p>
          </div>
        </div>
      </section>

      {/* ── Built-in Tools ── */}
      <section className="sec-pad">
        <div className="sec-head reveal">
          <span className="sec-lbl">Agent Tools</span>
          <h2 className="sec-heading">Every agent ships with 12+ built-in tools.</h2>
          <p className="sec-desc">These tools run inside the Docker container. The AI decides when to use them — you just talk naturally.</p>
        </div>

        <div className="tools-grid reveal d-1">
          {[
            { name: 'read', desc: 'Read any file in the workspace' },
            { name: 'write', desc: 'Create or overwrite files' },
            { name: 'edit', desc: 'Diff-based file editing' },
            { name: 'exec', desc: 'Execute shell commands (bash)' },
            { name: 'web_search', desc: 'Search the internet via Brave API' },
            { name: 'web_fetch', desc: 'Download and parse web pages' },
            { name: 'browser', desc: 'Control a headless browser (Playwright)' },
            { name: 'cron', desc: 'Create scheduled background tasks' },
            { name: 'message', desc: 'Send notifications to the user' },
            { name: 'gateway', desc: 'Call other agents (multi-agent)' },
            { name: 'canvas', desc: 'Generate HTML/UI previews' },
            { name: 'process', desc: 'Manage running processes' },
          ].map((tool, i) => (
            <div key={tool.name} className="tool-chip">
              <code>{tool.name}</code>
              <span>{tool.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sec-pad">
        <div className="sec-head reveal">
          <span className="sec-lbl">FAQ</span>
          <h2 className="sec-heading">Common questions.</h2>
        </div>

        <div className="faq-list">
          <FaqItem q="What is OpenClaw?" a="OpenClaw is an open-source AI agent runtime. It gives AI models the ability to use tools, maintain persistent memory, browse the web, execute code, and run background tasks — all inside isolated Docker containers." />
          <FaqItem q="Do I need my own server?" a="No. AgentClaw handles all the infrastructure. When you deploy an agent, we provision an isolated Docker container on our cloud servers. You manage everything from the iOS app." />
          <FaqItem q="Which AI models are supported?" a="Claude (Opus, Sonnet, Haiku), GPT-4o, Gemini, and many more via OpenRouter. You choose the model when creating your agent and can switch anytime." />
          <FaqItem q="What are cron jobs?" a="Scheduled tasks that your agent runs automatically. For example: 'Every morning at 8 AM, check my GitHub for new issues and send me a summary.' The agent runs even when the app is closed." />
          <FaqItem q="Can I cancel anytime?" a="Yes. All subscriptions are monthly via the App Store. Cancel anytime from your iPhone settings. No contracts, no hidden fees." />
          <FaqItem q="Is my data secure?" a="Every agent runs in a fully isolated Docker container. API keys are encrypted with AES-256 at rest. We never share or access your conversations. See our Privacy Policy for full details." />
        </div>
      </section>

      {/* ── Glass Pricing Slabs ── */}
      <section id="pricing" className="sec-pad">
        <div className="sec-head reveal">
          <span className="sec-lbl">License</span>
          <h2 className="sec-heading">Start deploying OpenClaw AI agents today.</h2>
        </div>

        <div className="pricing-stage">
          <div className="slab reveal">
            <h3 className="price-tier">Lite</h3>
            <div className="price-cost">$29<span>/mo</span></div>
            <p className="price-desc">Perfect for solo developers getting started with AI agents.</p>
            <ul className="price-list">
              <li><CheckSVG /> 60 AI messages / month</li>
              <li><CheckSVG /> 1 Container Instance</li>
            </ul>
            <a href="https://apps.apple.com/app/agentclaw" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{width: '100%', textAlign: 'center', display: 'block'}} aria-label="Get AgentClaw Lite on App Store">Get Started Free</a>
          </div>

          <div className="slab pro reveal d-1">
            <div className="popular-badge">Most Popular</div>
            <h3 className="price-tier">Pro</h3>
            <div className="price-cost">$49<span>/mo</span></div>
            <p className="price-desc">For continuous autonomous operations with multiple agents.</p>
            <ul className="price-list">
              <li><CheckSVG /> 200 AI messages / month</li>
              <li><CheckSVG /> 3 OpenClaw containers</li>
              <li><CheckSVG /> Unlimited cron jobs</li>
              <li><CheckSVG /> Full skills marketplace</li>
            </ul>
            <a href="https://apps.apple.com/app/agentclaw" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{width: '100%', textAlign: 'center', display: 'block'}} aria-label="Get AgentClaw Pro on App Store">Get AgentClaw Pro</a>
          </div>

          <div className="slab reveal d-2">
            <h3 className="price-tier">Max</h3>
            <div className="price-cost">$89<span>/mo</span></div>
            <p className="price-desc">Maximum capacity for teams and heavy AI workloads.</p>
            <ul className="price-list">
              <li><CheckSVG /> 500 AI messages / month</li>
              <li><CheckSVG /> 10 OpenClaw containers</li>
              <li><CheckSVG /> Priority model access</li>
            </ul>
            <a href="https://apps.apple.com/app/agentclaw" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{width: '100%', textAlign: 'center', display: 'block'}} aria-label="Get AgentClaw Max on App Store">Get AgentClaw Max</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="master-foot reveal">
        <div className="foot-layout">
          <div>
            <div className="foot-brand"><LogoSVG /> AgentClaw</div>
            <p className="foot-copy-txt">The native iOS app for deploying OpenClaw AI agents. Persistent memory, cron jobs, and Docker containers — managed from your iPhone.</p>
          </div>
          <div className="foot-navs">
            <div className="foot-col">
              <span className="foot-col-title">Platform</span>
              <a href="#features">Features</a>
              <a href="#compare">Compare</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="foot-col">
              <span className="foot-col-title">Information</span>
              <a href="/privacy">Privacy Protocol</a>
              <a href="/terms">Terms of Service</a>
              <a href="mailto:shokhzodsunnatov@gmail.com">Contact</a>
            </div>
          </div>
        </div>
        <div className="foot-legal">
          <span>© {new Date().getFullYear()} AgentClaw Inc. Crafted with absolute precision.</span>
          <span>OpenClaw Core Protocol V2</span>
        </div>
      </footer>
    </main>
  );
}
