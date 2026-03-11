import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

/* ── Hooks ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add('vis'); }),
      { threshold: 0.08, rootMargin: '0px 0px -25px 0px' }
    );
    ref.current?.querySelectorAll('.rv').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useSpotlight(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const wraps = el.querySelectorAll('.spotlight-wrap');
    const handler = (e) => {
      wraps.forEach((w) => {
        const r = w.getBoundingClientRect();
        w.style.setProperty('--mx', `${e.clientX - r.left}px`);
        w.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    };
    el.addEventListener('pointermove', handler);
    return () => el.removeEventListener('pointermove', handler);
  }, [ref]);
}

/* ── Phone Mockup ── */
function PhoneMockup() {
  const [msgs, setMsgs] = useState([]);
  const all = [
    { d: 400, type: 'user', text: 'Find me 3 trending AI startups this week' },
    { d: 1100, type: 'tool', text: '> web_search("trending AI startups 2026")' },
    { d: 2000, type: 'bot', text: 'Here are the top 3:' },
    { d: 2800, type: 'bot', text: '1. NovaMind — dream analysis AI\n2. SynthLab — voice cloning\n3. CortexFlow — autonomous coding' },
    { d: 4000, type: 'user', text: 'Save this to memory' },
    { d: 4700, type: 'tool', text: '> memory_save("ai_startups")' },
    { d: 5400, type: 'bot', text: 'Saved! I\'ll remember this for next time.' },
  ];
  useEffect(() => {
    const t = all.map((m, i) => setTimeout(() => setMsgs((p) => [...p, { ...m, i }]), m.d));
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div className="phone-scene">
      <div className="phone-glow" />
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="app-mock">
            <div className="app-mock-header">
              <div className="app-mock-avatar" />
              <div><div className="app-mock-name">ResearchBot</div><div className="app-mock-status">Online</div></div>
            </div>
            <div className="app-mock-chat">
              {msgs.map((m) => <div key={m.i} className={`chat-msg ${m.type}`} style={{ animationDelay: `${m.i * .03}s` }}>{m.text}</div>)}
            </div>
            <div className="app-mock-input"><span>Ask anything...</span><span>↑</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Visual panels ── */
function TerminalVis() {
  const [lines, setLines] = useState([]);
  const all = [
    { d: 200, el: <><span className="pr">$</span> <span className="cm">agentclaw deploy</span> <span className="fl">--name</span> <span className="st">"SalesBot"</span></> },
    { d: 900, el: <span className="inf">  Provisioning container...</span> },
    { d: 1500, el: <><span className="ok">  ✓ Container ready</span> <span className="inf">(2.1s)</span></> },
    { d: 2100, el: <><span className="ok">  ✓ AI model connected</span> <span className="inf">(claude-haiku-4.5)</span></> },
    { d: 2600, el: <><span className="ok">  ✓ Skills loaded</span> <span className="inf">(web_search, memory, cron)</span></> },
    { d: 3100, el: <><span className="ok">  ✓ Gateway live</span> <span className="inf">→ salesbot.agent-claw.app</span></> },
    { d: 3800, el: <span className="st">  🚀 Deployed in 12s — ready to chat</span> },
  ];
  useEffect(() => { const t = all.map((l, i) => setTimeout(() => setLines((p) => [...p, { ...l, i }]), l.d)); return () => t.forEach(clearTimeout); }, []);
  return (
    <div className="vis-panel rv rvd2"><div className="vis-card">
      <div className="vis-card-header"><div className="vis-dot r" /><div className="vis-dot y" /><div className="vis-dot g" /><span className="vis-card-title">agentclaw — deploy</span></div>
      <div className="vis-card-body">{lines.map((l) => <div key={l.i} className="vis-term-line">{l.el}</div>)}{lines.length < all.length && <span className="vis-cursor" />}</div>
    </div></div>
  );
}

function ControlVis() {
  return (
    <div className="vis-panel rv rvd2"><div className="vis-card">
      <div className="vis-card-header"><div className="vis-dot r" /><div className="vis-dot y" /><div className="vis-dot g" /><span className="vis-card-title">Control Center</span></div>
      <div className="vis-card-body"><div className="vis-control">
        {[{ name: 'SalesBot', model: 'claude-haiku-4.5', c: 'c', s: 'on', l: 'Running' },
          { name: 'SupportAgent', model: 'gpt-4o-mini', c: 'v', s: 'on', l: 'Running' },
          { name: 'DataCrawler', model: 'claude-sonnet-4', c: 'm', s: 'off', l: 'Stopped' },
        ].map((b) => (
          <div key={b.name} className="vis-bot-row">
            <div className={`vis-bot-avatar ${b.c}`}>{b.name[0]}</div>
            <div className="vis-bot-info"><div className="vis-bot-name">{b.name}</div><div className="vis-bot-model">{b.model}</div></div>
            <div className={`vis-bot-status ${b.s}`}>{b.l}</div>
          </div>
        ))}
      </div></div>
    </div></div>
  );
}

function SkillsVis() {
  return (
    <div className="vis-panel rv rvd2"><div className="vis-card">
      <div className="vis-card-header"><div className="vis-dot r" /><div className="vis-dot y" /><div className="vis-dot g" /><span className="vis-card-title">Skill Marketplace</span></div>
      <div className="vis-card-body"><div className="vis-skills">
        {[{ i: '🔍', n: 'Web Search', t: 'Built-in' }, { i: '🧠', n: 'Memory', t: 'Built-in' }, { i: '⏰', n: 'Cron Jobs', t: 'Built-in' },
          { i: '💬', n: 'Slack', t: 'Marketplace' }, { i: '🐙', n: 'GitHub', t: 'Marketplace' }, { i: '📊', n: 'Analytics', t: 'Marketplace' },
        ].map((s) => <div key={s.n} className="vis-skill"><div className="vis-skill-icon">{s.i}</div><div className="vis-skill-name">{s.n}</div><div className="vis-skill-tag">{s.t}</div></div>)}
      </div></div>
    </div></div>
  );
}

/* ── FAQ Item ── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen(!open)}>
        {q}<span className="faq-arrow">▼</span>
      </button>
      <div className="faq-a"><p>{a}</p></div>
    </div>
  );
}

/* ── Data ── */
const features = [
  { icon: '⚡', c: 'c', title: 'One-Click Deploy', desc: 'Zero to live AI assistant in under 30 seconds. No DevOps needed.' },
  { icon: '🧠', c: 'v', title: 'Persistent Memory', desc: 'Your bot remembers every conversation. It learns and adapts over time.' },
  { icon: '🔧', c: 'm', title: 'Skill Marketplace', desc: 'Web search, GitHub, Slack, cron — install and extend in one tap.' },
  { icon: '🛡️', c: 'c', title: 'Isolated Containers', desc: 'Each bot runs in its own Docker container. Your data stays yours.' },
  { icon: '📡', c: 'v', title: 'Real-Time Streaming', desc: 'SSE-powered responses with live tool indicators. See AI thinking.' },
  { icon: '🖥️', c: 'm', title: 'Interactive Terminal', desc: 'Full terminal access to your bot\'s container. Debug anything.' },
];

const useCases = [
  { emoji: '📈', title: 'Market Research Bot', desc: 'Monitors competitors, scrapes trends, delivers daily Slack briefings. Set it and forget it.', tag: 'Automation', tc: 'cy', span: false },
  { emoji: '💬', title: '24/7 Customer Support', desc: 'Answers customer questions using your docs. Remembers context across sessions. Escalates when needed.', tag: 'Support', tc: 'vi', span: true },
  { emoji: '🐙', title: 'GitHub PR Reviewer', desc: 'Reviews pull requests, suggests improvements, checks for security issues. Runs on cron every hour.', tag: 'DevOps', tc: 'mg', span: false },
  { emoji: '📝', title: 'Content Writer', desc: 'Researches topics on the web, writes SEO-optimized blog posts, saves drafts to your workspace.', tag: 'Content', tc: 'cy', span: false },
  { emoji: '🔔', title: 'Server Monitor', desc: 'Checks your API health every 15 minutes. Texts you on Slack if error rate spikes. Zero code, just a prompt.', tag: 'Monitoring', tc: 'vi', span: false },
  { emoji: '📊', title: 'Data Analyst', desc: 'Pulls data from APIs, crunches numbers, generates reports. Your personal analyst that never sleeps.', tag: 'Analytics', tc: 'mg', span: true },
];

const plans = [
  { tier: 'Lite', price: '29.99', msgs: '60 messages / month', eq: '~12 sessions/week', pop: false, feats: ['1 AI Bot', 'Persistent Memory', 'Basic Skills', 'Chat History', 'Email Support'] },
  { tier: 'Pro', price: '49.99', msgs: '200 messages / month', eq: '~7 sessions/day', pop: true, feats: ['3 AI Bots', 'All Skills + Marketplace', 'Priority Models (Claude, GPT-4)', 'Cron Jobs & Webhooks', 'Interactive Terminal', 'Priority Support'] },
  { tier: 'Max', price: '89.99', msgs: '500 messages / month', eq: '~16 sessions/day', pop: false, feats: ['10 AI Bots', 'All Skills + Custom', 'All AI Models', 'Advanced Automation', 'File Workspace', 'Dedicated Support', 'Early Access'] },
];

const faqs = [
  { q: 'What is OpenClaw?', a: 'OpenClaw is an open-source AI agent framework that powers AgentClaw. It provides persistent memory, a skill system, cron jobs, web search, file editing, and terminal access for AI bots. AgentClaw brings all of this to your iPhone — no server setup needed.' },
  { q: 'Where is my data stored?', a: 'Each bot runs in its own isolated Docker container on our secure infrastructure. Your conversations, memory, and files never leave your instance. We don\'t train on your data.' },
  { q: 'What happens if I exceed my message limit?', a: 'Your bots keep running and cron jobs continue executing. You just can\'t send new chat messages until your plan resets. Upgrade anytime to get more messages instantly.' },
  { q: 'Can I use my own OpenRouter API key?', a: 'Not yet, but it\'s on our roadmap. Currently we provide access to all major AI models (Claude, GPT-4, Mistral) through our infrastructure.' },
  { q: 'What AI models are supported?', a: 'All major models via OpenRouter: Claude 4 Haiku/Sonnet/Opus, GPT-4o, GPT-4o Mini, Mistral, Llama, and more. Pro and Max plans get access to the most capable models.' },
  { q: 'Is there a free trial?', a: 'Yes! Every new account gets 10 free messages — no credit card required. Enough to deploy a bot, test the chat, and see the magic.' },
];

const testimonials = [
  { quote: 'Set up a GitHub bot that reviews PRs and sends Slack digests every morning. Took 8 minutes. Would have been a weekend project otherwise.', name: 'Jake Torres', role: 'Indie Hacker', c: 'c' },
  { quote: 'The persistent memory is a game changer. My sales bot actually remembers leads from weeks ago and picks up where it left off.', name: 'Sarah Kim', role: 'SaaS Founder', c: 'v' },
  { quote: 'I was self-hosting OpenClaw on a VPS. AgentClaw saved me $80/mo in server costs and hours of DevOps headaches.', name: 'Marcus Chen', role: 'Full-Stack Dev', c: 'm' },
];

/* ═══════════════ MAIN ═══════════════ */
export default function Landing() {
  const cRef = useReveal();
  useSpotlight(cRef);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="landing" ref={cRef}>

      {/* ── Nav ── */}
      <nav className={`lnav ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="lnav-logo"><img src="/logo.png" alt="AgentClaw" className="lnav-logo-img" />AgentClaw</Link>
        <div className="lnav-links">
          <a href="#usecases" className="nmob">Use Cases</a>
          <a href="#features" className="nmob">Features</a>
          <a href="#pricing" className="nmob">Pricing</a>
          <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="lnav-cta">Download App</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg"><div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" /><div className="hero-grid" /></div>
        <div className="hero-inner">
          <div className="hero-text">
            <div className="oc-badge rv"><img src="/logo.png" alt="" className="oc-badge-img" /> Powered by OpenClaw — Open Source AI Agent Framework</div>
            <div className="hero-badge rv rvd1"><span className="badge-dot" />Now on the App Store</div>
            <h1 className="rv rvd2">
              Deploy an AI Agent with<br />
              Memory & Tools —<br />
              <span className="gt">In 12 Seconds.</span>
            </h1>
            <p className="hero-sub rv rvd3">
              OpenClaw gives AI bots persistent memory, web search, cron jobs,
              and 12+ tools. AgentClaw puts all of it on your iPhone.
              No servers. No DevOps. Just deploy and chat.
            </p>
            <div className="hero-btns rv rvd4">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="btn-p">Download for iOS →</a>
              <a href="#usecases" className="btn-s">See What You Can Build</a>
            </div>
          </div>
          <div className="hero-visual rv rvd5"><PhoneMockup /></div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <div className="trust-bar rv">
        <div className="trust-label">Powered by industry-leading technology</div>
        <div className="trust-logos">
          <span className="trust-logo">⚙️ OpenClaw</span>
          <span className="trust-logo">🐳 Docker</span>
          <span className="trust-logo">🤖 Claude</span>
          <span className="trust-logo">🧠 GPT-4</span>
          <span className="trust-logo">🔍 Brave Search</span>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="stats-bar rv">
        {[{ n: '12s', l: 'Deploy Time' }, { n: '99.9%', l: 'Uptime' }, { n: '12+', l: 'Built-in Tools' }, { n: '24/7', l: 'Always Running' }].map((s) => (
          <div key={s.l} className="stat-item"><div className="stat-num">{s.n}</div><div className="stat-lbl">{s.l}</div></div>
        ))}
      </div>

      {/* ── Use Cases ── */}
      <section id="usecases" className="lsec spotlight-wrap">
        <div className="rv" style={{ textAlign: 'center' }}>
          <div className="sec-label" style={{ justifyContent: 'center' }}>What Can You Build?</div>
          <h2 className="sec-title" style={{ margin: '0 auto .5rem' }}>Real bots. Real workflows.<br /><span className="gt">Running right now.</span></h2>
          <p className="sec-desc" style={{ margin: '0 auto' }}>These aren't hypotheticals. People are building these with AgentClaw today.</p>
        </div>
        <div className="uc-grid">
          {useCases.map((u, i) => (
            <div key={u.title} className={`uc-card rv ${u.span ? 'span2' : ''}`} style={{ transitionDelay: `${.06 + i * .05}s` }}>
              <span className="uc-emoji">{u.emoji}</span>
              <h3>{u.title}</h3>
              <p>{u.desc}</p>
              <span className={`uc-tag ${u.tc}`}>{u.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Showcase: Deploy ── */}
      <section className="showcase">
        <div className="showcase-inner">
          <div className="showcase-text rv">
            <div className="sec-label">Instant Deployment</div>
            <h3>From idea to live bot<br />in <span className="gt">one command</span></h3>
            <p>Name your bot, pick an AI model, write a personality — and hit deploy. We provision an isolated container, connect the AI engine, load skills, and spin up a live gateway. Your bot is chatting in 12 seconds.</p>
            <ul className="showcase-bullets">
              <li><span>✓</span>Isolated Docker container per bot</li>
              <li><span>✓</span>Auto-configured AI model + gateway</li>
              <li><span>✓</span>OpenClaw skills pre-loaded (web search, memory, cron)</li>
              <li><span>✓</span>Live HTTPS endpoint instantly available</li>
            </ul>
          </div>
          <TerminalVis />
        </div>
      </section>

      {/* ── Showcase: Control ── */}
      <section className="showcase">
        <div className="showcase-inner rev">
          <div className="showcase-text rv">
            <div className="sec-label">Full Control</div>
            <h3>Manage everything from<br /><span className="gt">your pocket</span></h3>
            <p>Monitor all your bots from one dashboard. See real-time status, switch models, restart containers, check logs — everything a DevOps engineer does, but from your phone.</p>
            <ul className="showcase-bullets">
              <li><span>✓</span>Real-time bot status monitoring</li>
              <li><span>✓</span>Container logs and analytics</li>
              <li><span>✓</span>One-tap restart and model switching</li>
              <li><span>✓</span>Interactive terminal access (SSH-like)</li>
            </ul>
          </div>
          <ControlVis />
        </div>
      </section>

      {/* ── Showcase: Skills ── */}
      <section className="showcase">
        <div className="showcase-inner">
          <div className="showcase-text rv">
            <div className="sec-label">OpenClaw Ecosystem</div>
            <h3>Give your bot<br /><span className="gt">superpowers</span></h3>
            <p>Your bot starts smart. With OpenClaw skills, it becomes unstoppable. Install web search so it browses the internet. Add GitHub so it manages repos. Schedule cron jobs for autonomous tasks. The marketplace grows weekly.</p>
            <ul className="showcase-bullets">
              <li><span>✓</span>12+ built-in OpenClaw tools (read, write, exec, search...)</li>
              <li><span>✓</span>Growing skill marketplace</li>
              <li><span>✓</span>Cron jobs for scheduled autonomous tasks</li>
              <li><span>✓</span>Webhook integrations for any workflow</li>
            </ul>
          </div>
          <SkillsVis />
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="lsec spotlight-wrap">
        <div className="rv" style={{ textAlign: 'center' }}>
          <div className="sec-label" style={{ justifyContent: 'center' }}>Capabilities</div>
          <h2 className="sec-title" style={{ margin: '0 auto .5rem' }}>Everything OpenClaw offers.<br /><span className="gt">On your iPhone.</span></h2>
          <p className="sec-desc" style={{ margin: '0 auto' }}>From deployment to monitoring, AgentClaw handles the infrastructure so you focus on what your bots do.</p>
        </div>
        <div className="feat-grid">
          {features.map((f, i) => (
            <div key={f.title} className="feat-card rv" style={{ transitionDelay: `${.06 + i * .05}s` }}>
              <div className={`feat-ico ${f.c}`}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className="lsec">
        <div className="rv" style={{ textAlign: 'center' }}>
          <div className="sec-label" style={{ justifyContent: 'center' }}>Why AgentClaw?</div>
          <h2 className="sec-title" style={{ margin: '0 auto .5rem' }}>Skip the setup.<br /><span className="gt">Save hours every week.</span></h2>
        </div>
        <div className="cmp-wrap rv rvd1">
          <table className="cmp-table">
            <thead><tr><th></th><th className="cmp-hl">AgentClaw</th><th>Self-Host OpenClaw</th><th>No-Code (Zapier)</th><th>Cloud AI APIs</th></tr></thead>
            <tbody>
              <tr className="cmp-hl"><td>Deploy Time</td><td>12 seconds</td><td>2-4 hours</td><td>30 min</td><td>1+ hours</td></tr>
              <tr className="cmp-hl"><td>Mobile Management</td><td><span className="cmp-check">✓</span> Native iOS</td><td><span className="cmp-x">✗</span> SSH only</td><td><span className="cmp-check">✓</span> Web</td><td><span className="cmp-x">✗</span></td></tr>
              <tr className="cmp-hl"><td>Persistent Memory</td><td><span className="cmp-check">✓</span> Built-in</td><td><span className="cmp-check">✓</span> Manual</td><td><span className="cmp-x">✗</span></td><td><span className="cmp-x">✗</span></td></tr>
              <tr className="cmp-hl"><td>Skill Marketplace</td><td><span className="cmp-check">✓</span> One-tap</td><td><span className="cmp-check">✓</span> CLI</td><td><span className="cmp-x">✗</span></td><td><span className="cmp-x">✗</span></td></tr>
              <tr className="cmp-hl"><td>Monthly Cost</td><td>From $29.99</td><td>$80+ (VPS + API)</td><td>$50+ (limited)</td><td>$20+ (API only)</td></tr>
              <tr className="cmp-hl"><td>DevOps Required</td><td><span className="cmp-check">✓</span> None</td><td><span className="cmp-x">✗</span> Heavy</td><td><span className="cmp-check">✓</span> None</td><td><span className="cmp-x">✗</span> Moderate</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="lsec">
        <div className="rv" style={{ textAlign: 'center' }}>
          <div className="sec-label" style={{ justifyContent: 'center' }}>How It Works</div>
          <h2 className="sec-title" style={{ margin: '0 auto .5rem' }}>Three steps. One app.</h2>
          <p className="sec-desc" style={{ margin: '0 auto' }}>No servers. No CLI. No Docker knowledge.</p>
        </div>
        <div className="steps-row">
          {[{ n: '1', t: 'Name Your Bot', d: 'Choose a name, pick an AI model, write a personality. That\'s your bot\'s soul.' },
            { n: '2', t: 'Hit Deploy', d: 'One tap spins up an isolated OpenClaw container with memory, skills, and a live gateway.' },
            { n: '3', t: 'Chat & Automate', d: 'Start chatting instantly. Add cron jobs, skills, webhooks — all from the app.' },
          ].map((s, i) => (
            <div key={s.n} className="step rv" style={{ transitionDelay: `${.1 + i * .1}s` }}>
              <div className="step-n">{s.n}</div><h3>{s.t}</h3><p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="lsec">
        <div className="rv" style={{ textAlign: 'center' }}>
          <div className="sec-label" style={{ justifyContent: 'center' }}>What Developers Say</div>
          <h2 className="sec-title" style={{ margin: '0 auto .5rem' }}>Built by devs. <span className="gt">Loved by devs.</span></h2>
        </div>
        <div className="test-grid">
          {testimonials.map((t, i) => (
            <div key={t.name} className="test-card rv" style={{ transitionDelay: `${.08 + i * .08}s` }}>
              <div className="test-quote">{t.quote}</div>
              <div className="test-author">
                <div className={`test-avatar ${t.c}`}>{t.name[0]}</div>
                <div><div className="test-name">{t.name}</div><div className="test-role">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="lsec price-sec">
        <div className="rv" style={{ textAlign: 'center' }}>
          <div className="sec-label" style={{ justifyContent: 'center' }}>Pricing</div>
          <h2 className="sec-title" style={{ margin: '0 auto .5rem' }}>Simple pricing. <span className="gt">No surprises.</span></h2>
          <p className="sec-desc" style={{ margin: '0 auto' }}>Start free with 10 messages. No credit card required.</p>
        </div>
        <div className="price-grid">
          {plans.map((p, i) => (
            <div key={p.tier} className={`price-card rv ${p.pop ? 'pop' : ''}`} style={{ transitionDelay: `${.06 + i * .08}s` }}>
              {p.pop && <div className="price-pop-tag">Most Popular</div>}
              <div className="price-tier">{p.tier}</div>
              <div className="price-amt"><strong>${p.price}</strong><span>/mo</span></div>
              <div className="price-vs">vs. $80+/mo to self-host OpenClaw</div>
              <div className="price-msgs">{p.msgs} ({p.eq})</div>
              <ul className="price-feats">{p.feats.map((f) => <li key={f}><span>✓</span>{f}</li>)}</ul>
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className={`price-btn ${p.pop ? 'fill' : 'line'}`}>Get {p.tier}</a>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="lsec">
        <div className="rv" style={{ textAlign: 'center' }}>
          <div className="sec-label" style={{ justifyContent: 'center' }}>FAQ</div>
          <h2 className="sec-title" style={{ margin: '0 auto .5rem' }}>Got questions?</h2>
        </div>
        <div className="faq-list rv rvd1">
          {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-sec rv">
        <div className="cta-glow" />
        <h2>Ready to deploy your first <span className="gt">AI agent</span>?</h2>
        <p>Download AgentClaw. Bot live in under a minute. Powered by OpenClaw.</p>
        <div style={{ position: 'relative' }}><a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="btn-p">Download for iOS →</a></div>
      </section>

      {/* ── Footer ── */}
      <footer className="lfoot">
        <div className="lfoot-inner">
          <div className="lfoot-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <a href="mailto:shokhzodsunnatov@gmail.com">Contact</a>
          </div>
          <span className="lfoot-copy">© {new Date().getFullYear()} AgentClaw. Powered by OpenClaw.</span>
        </div>
      </footer>

      {/* ── Sticky mobile CTA ── */}
      <div className="sticky-cta">
        <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="btn-p">Download AgentClaw →</a>
      </div>
    </div>
  );
}
