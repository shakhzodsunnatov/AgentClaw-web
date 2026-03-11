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

  // UI Simulation Loop
  useEffect(() => {
    const sequence = [
      { t: 800, type: 'b-user', txt: 'Review the latest PR on the UI repo.' },
      { t: 1600, type: 'b-tool', txt: '>>> github.get_pr_diff(repo="ui", id=42)' },
      { t: 3200, type: 'b-bot', txt: 'Analysis complete. The new CSS vars drop shadow fidelity but improve render speed by ~2ms. Looks safe to merge.' },
    ];
    
    sequence.forEach((item, i) => {
      setTimeout(() => {
        setMsgs(prev => [...prev, item]);
      }, item.t);
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
           <div className="panel-val">Claude 4.5 Opus</div>
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
          <a href="#features">Architecture</a>
          <a href="#metrics">Matrix</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div>
          <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{padding: '10px 20px', fontSize: '0.9rem'}}>Deploy Now</a>
        </div>
      </nav>

      {/* ── Precision Hero ── */}
      <section className="hero">
        <div className="hero-pill reveal">
          <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"/></svg>
          OpenClaw OS Native System
        </div>
        
        <h1 className="hero-title reveal d-1" ref={trackRef}>
          The iPhone's <span>Native</span><br/>AI Core.
        </h1>
        
        <p className="hero-desc reveal d-2">
          Meticulously engineered for iOS. AgentClaw provisions strictly isolated Docker containers 
          for your OpenClaw agents in exactly 12 seconds. Superior memory. Zero DevOps.
        </p>

        <div className="hero-actions reveal d-3">
          <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="btn-primary">Download App <PlaySVG /></a>
          <a href="#metrics" className="btn-secondary">View Matrix</a>
        </div>

        <InteractiveHeroPhone />
      </section>

      {/* ── Interactive Bento Array ── */}
      <section id="features" className="sec-pad">
        <div className="sec-head reveal">
          <span className="sec-lbl">Architecture</span>
          <h2 className="sec-heading">Engineered for absolute autonomy.</h2>
          <p className="sec-desc">Every subsystem operates precisely to orchestrate the OpenClaw environment.</p>
        </div>

        <div className="bento-array">
          
          <article className="bento-node span-2 reveal">
            <div className="bento-svg-wrap">
              <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
                <path d="M20 50 L180 50" stroke="var(--c-border)" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="16" fill="var(--c-surf)" stroke="var(--c-text-primary)" strokeWidth="3" />
                <circle cx="150" cy="50" r="16" fill="var(--c-hyper-blue)" />
                <circle cx="150" cy="50" className="circle-pulse" fill="var(--c-hyper-blue)" />
              </svg>
            </div>
            <h3 className="bento-title">Autonomous Cron Relays</h3>
            <p className="bento-desc">Hardware-accurate cron scheduling. Instruct an agent to poll GitHub every 15 minutes, and the server-side infrastructure executes flawlessly without manual input.</p>
          </article>

          <article className="bento-node reveal d-1">
            <div className="bento-svg-wrap">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <ellipse className="disk disk-1" cx="60" cy="40" rx="40" ry="15" fill="var(--c-surf)" stroke="var(--c-text-primary)" strokeWidth="2" />
                <ellipse className="disk disk-2" cx="60" cy="60" rx="40" ry="15" fill="var(--c-surf)" stroke="var(--c-text-primary)" strokeWidth="2" />
                <ellipse className="disk disk-3" cx="60" cy="80" rx="40" ry="15" fill="var(--c-surf)" stroke="var(--c-text-primary)" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="bento-title">Vector Memory</h3>
            <p className="bento-desc">Pgvector embeddings persistently store context.</p>
          </article>

          <article className="bento-node reveal">
            <div className="bento-svg-wrap">
              <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                <rect x="20" y="20" width="120" height="120" rx="16" stroke="var(--c-border)" strokeWidth="2"/>
                <path d="M40 80 L120 80 M80 40 L80 120" stroke="var(--c-border)" strokeWidth="2" />
                <rect x="30" y="30" width="100" height="100" rx="8" fill="var(--c-surf)"/>
                <path d="M60 80 L75 95 L100 65" stroke="var(--c-hyper-blue)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="bento-title">Strict Isolation</h3>
            <p className="bento-desc">Every deployed bot operates within a strictly partitioned container. Keys are encrypted at rest.</p>
          </article>

          <article className="bento-node span-2 reveal d-1">
             <div className="bento-svg-wrap" style={{justifyContent: 'flex-start', alignItems: 'flex-end', paddingBottom: 0}}>
               <div style={{width: '100%', borderBottom: '2px solid var(--c-text-primary)', position: 'relative'}}>
                  <div style={{position: 'absolute', bottom: 0, left: '20%', width: 2, height: 40, background: 'var(--c-text-primary)'}}></div>
                  <div style={{position: 'absolute', bottom: 0, left: '50%', width: 2, height: 80, background: 'var(--c-hyper-blue)'}}></div>
                  <div style={{position: 'absolute', bottom: 0, left: '80%', width: 2, height: 60, background: 'var(--c-text-primary)'}}></div>
               </div>
             </div>
             <h3 className="bento-title">12+ Marketplace Dependencies</h3>
             <p className="bento-desc">Inject tools directly into the OpenClaw container. Slack payloads, native macOS terminal commands, and GitHub PR reviews operate out of the box.</p>
          </article>

        </div>
      </section>

      {/* ── Surgical Comparison Matrix ── */}
      <section id="metrics" className="sec-pad">
        <div className="sec-head reveal">
          <span className="sec-lbl">Metrics</span>
          <h2 className="sec-heading">The Benchmark Matrix.</h2>
        </div>

        <div className="matrix-wrap reveal d-1">
          <table className="comp-table">
            <thead>
              <tr>
                <th>Criteria / Specification</th>
                <th>AgentClaw Native iOS</th>
                <th>simpleClaw.com (Web)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="feat-name">Deployment Speed</span>
                  <span className="feat-sub">Time from click to live HTTPS endpoint.</span>
                </td>
                <td>
                  <ProgBar pct={100} color="var(--c-hyper-blue)" /> 12s
                </td>
                <td>
                  <ProgBar pct={20} color="var(--c-border)" /> ~60s
                </td>
              </tr>
              <tr>
                <td>
                  <span className="feat-name">Push Alerting</span>
                  <span className="feat-sub">Direct device notification routing.</span>
                </td>
                <td>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{width: 24, height: 24, color: 'var(--c-hyper-blue)'}}><CheckSVG /></div>
                    <span>Native Apple APNs</span>
                  </div>
                </td>
                <td>Webhooks Required</td>
              </tr>
              <tr>
                <td>
                  <span className="feat-name">Execution Physics</span>
                  <span className="feat-sub">UI Framerate fidelity.</span>
                </td>
                <td>Swift 60fps Native</td>
                <td>Browser DOM</td>
              </tr>
              <tr>
                <td>
                  <span className="feat-name">Container Architecture</span>
                  <span className="feat-sub">Isolation methodology.</span>
                </td>
                <td>Strict Docker 1:1 Map</td>
                <td>Shared VM Logic</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Glass Pricing Slabs ── */}
      <section id="pricing" className="sec-pad">
        <div className="sec-head reveal">
          <span className="sec-lbl">License</span>
          <h2 className="sec-heading">Acquire your instance.</h2>
        </div>

        <div className="pricing-stage">
          <div className="slab reveal">
            <h3 className="price-tier">Lite</h3>
            <div className="price-cost">$29<span>/mo</span></div>
            <p className="price-desc">The entry vector for individual operators.</p>
            <ul className="price-list">
              <li><CheckSVG /> 60 computations / month</li>
              <li><CheckSVG /> 1 Container Instance</li>
            </ul>
            <button className="btn-secondary" style={{width: '100%'}}>Initiate Trial</button>
          </div>

          <div className="slab pro reveal d-1">
            <h3 className="price-tier">Pro</h3>
            <div className="price-cost">$49<span>/mo</span></div>
            <p className="price-desc">The advanced tier for continuous autonomous operations.</p>
            <ul className="price-list">
              <li><CheckSVG /> 200 computations / month</li>
              <li><CheckSVG /> 3 Container Instances</li>
              <li><CheckSVG /> Continuous Cron Cycles</li>
              <li><CheckSVG /> Unrestricted Marketplace</li>
            </ul>
            <button className="btn-primary" style={{width: '100%'}}>Upgrade Node</button>
          </div>

          <div className="slab reveal d-2">
            <h3 className="price-tier">Max</h3>
            <div className="price-cost">$89<span>/mo</span></div>
            <p className="price-desc">Uncapped potential for heavy compute tasks.</p>
            <ul className="price-list">
              <li><CheckSVG /> 500 computations / month</li>
              <li><CheckSVG /> 10 Container Instances</li>
              <li><CheckSVG /> High-Bandwidth Models</li>
            </ul>
            <button className="btn-secondary" style={{width: '100%'}}>Contact Sales</button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="master-foot reveal">
        <div className="foot-layout">
          <div>
            <div className="foot-brand"><LogoSVG /> AgentClaw</div>
            <p className="foot-copy-txt">The preeminent iOS application meticulously designed to execute and scale OpenClaw AI models on mobile architecture.</p>
          </div>
          <div className="foot-navs">
            <div className="foot-col">
              <span className="foot-col-title">Platform</span>
              <a href="#features">Architecture</a>
              <a href="#metrics">Benchmarks</a>
              <a href="#pricing">License</a>
            </div>
            <div className="foot-col">
              <span className="foot-col-title">Information</span>
              <a href="/privacy">Privacy Protocol</a>
              <a href="/terms">Terms of Service</a>
              <a href="https://github.com">Codebase Tracker</a>
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
