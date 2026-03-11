import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

/* ── Scroll-reveal hook ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const els = ref.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── Terminal typing animation ── */
function TerminalDemo() {
  const [lines, setLines] = useState([]);
  const allLines = [
    { delay: 300, content: <><span className="prompt">$</span> <span className="command">agentclaw deploy</span> <span className="flag">--name</span> <span className="string">"SalesBot"</span></> },
    { delay: 1200, content: <><span className="info">  Provisioning container...</span></> },
    { delay: 2000, content: <><span className="success">  ✓ Container ready</span> <span className="info">(2.1s)</span></> },
    { delay: 2800, content: <><span className="success">  ✓ AI model connected</span> <span className="info">(claude-haiku-4.5)</span></> },
    { delay: 3500, content: <><span className="success">  ✓ Skills loaded</span> <span className="info">(web_search, memory, cron)</span></> },
    { delay: 4200, content: <><span className="success">  ✓ Gateway live</span> <span className="info">→ salesbot.agent-claw.app</span></> },
    { delay: 5200, content: <><span className="string">  🚀 Bot deployed in 12s — ready to chat</span></> },
  ];

  useEffect(() => {
    const timers = allLines.map((line, i) =>
      setTimeout(() => setLines((prev) => [...prev, { ...line, idx: i }]), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="terminal-wrapper">
      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-dot red" />
          <div className="terminal-dot yellow" />
          <div className="terminal-dot green" />
          <span className="terminal-title">agentclaw — deploy</span>
        </div>
        <div className="terminal-body">
          {lines.map((line) => (
            <div
              key={line.idx}
              className="terminal-line"
              style={{ animationDelay: `${line.idx * 0.05}s` }}
            >
              {line.content}
            </div>
          ))}
          {lines.length < allLines.length && <span className="terminal-cursor" />}
        </div>
      </div>
    </div>
  );
}

/* ── Feature data ── */
const features = [
  {
    icon: '⚡',
    color: 'cyan',
    title: 'One-Click Deploy',
    desc: 'Go from zero to a live AI assistant in under 30 seconds. No DevOps, no infrastructure headaches.',
  },
  {
    icon: '🧠',
    color: 'violet',
    title: 'Persistent Memory',
    desc: 'Your bots remember context across conversations. They learn, adapt, and get smarter over time.',
  },
  {
    icon: '🔧',
    color: 'magenta',
    title: 'Skill Marketplace',
    desc: 'Install skills like web search, GitHub integration, Slack, cron jobs — extend your bot instantly.',
  },
  {
    icon: '🛡️',
    color: 'cyan',
    title: 'Enterprise Security',
    desc: 'Isolated Docker containers per bot. Your data never leaves your instance. SOC 2 compliant.',
  },
  {
    icon: '📡',
    color: 'violet',
    title: 'Real-Time Streaming',
    desc: 'SSE-powered responses with tool activity indicators. Your users see AI thinking in real-time.',
  },
  {
    icon: '📊',
    color: 'magenta',
    title: 'Full Control Center',
    desc: 'Monitor logs, manage cron jobs, edit files, access the terminal — all from your phone.',
  },
];

/* ── Pricing data ── */
const plans = [
  {
    tier: 'Lite',
    price: '29.99',
    messages: '60 messages / month',
    featured: false,
    features: [
      '1 AI Bot',
      'Persistent Memory',
      'Basic Skills',
      'Chat History',
      'Email Support',
    ],
  },
  {
    tier: 'Pro',
    price: '49.99',
    messages: '200 messages / month',
    featured: true,
    features: [
      '3 AI Bots',
      'Persistent Memory',
      'All Skills + Marketplace',
      'Priority Models (Claude, GPT-4)',
      'Cron Jobs & Webhooks',
      'Interactive Terminal',
      'Priority Support',
    ],
  },
  {
    tier: 'Max',
    price: '89.99',
    messages: '500 messages / month',
    featured: false,
    features: [
      '10 AI Bots',
      'Persistent Memory',
      'All Skills + Custom Skills',
      'All AI Models',
      'Advanced Cron & Automation',
      'File Workspace',
      'Dedicated Support',
      'Early Access Features',
    ],
  },
];

/* ── Main Component ── */
export default function Landing() {
  const containerRef = useReveal();
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="landing" ref={containerRef}>
      {/* ── Nav ── */}
      <nav className={`landing-nav ${navScrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="landing-nav-logo">
          <div className="logo-icon">⚡</div>
          AgentClaw
        </Link>
        <div className="landing-nav-links">
          <a href="#features" className="nav-hide-mobile">Features</a>
          <a href="#pricing" className="nav-hide-mobile">Pricing</a>
          <Link to="/privacy" className="nav-hide-mobile">Legal</Link>
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            Download App
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="hero-grid" />
        </div>

        <div className="hero-content">
          <div className="hero-badge reveal">
            <span className="badge-dot" />
            Now Available on iOS
          </div>
          <h1 className="reveal reveal-delay-1">
            Deploy AI Assistants<br />
            <span className="gradient-text">In One Click</span>
          </h1>
          <p className="hero-subtitle reveal reveal-delay-2">
            AgentClaw gives you the power to create, deploy, and manage
            intelligent AI bots — with memory, skills, and real-time tools —
            all from your iPhone.
          </p>
          <div className="hero-buttons reveal reveal-delay-3">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Download for iOS →
            </a>
            <a href="#features" className="btn-secondary">
              See How It Works
            </a>
          </div>
          <div className="reveal reveal-delay-4">
            <TerminalDemo />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="stats-bar reveal">
        <div className="stat-item">
          <div className="stat-number">12s</div>
          <div className="stat-label">Avg Deploy Time</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">99.9%</div>
          <div className="stat-label">Uptime</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">12+</div>
          <div className="stat-label">Built-in Tools</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">∞</div>
          <div className="stat-label">Possibilities</div>
        </div>
      </div>

      {/* ── Features ── */}
      <section id="features" className="landing-section">
        <div className="reveal">
          <div className="section-label">Capabilities</div>
          <h2 className="section-title">
            Everything you need to run<br />AI agents at scale
          </h2>
          <p className="section-desc">
            From deployment to monitoring, AgentClaw handles the
            infrastructure so you can focus on building.
          </p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="feature-card reveal"
              style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className={`feature-icon ${f.color}`}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="landing-section">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            How It Works
          </div>
          <h2 className="section-title" style={{ margin: '0 auto 0.5rem' }}>
            Three steps to your AI agent
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            No server setup. No CLI. No Docker knowledge required.
          </p>
        </div>
        <div className="steps-container">
          {[
            {
              num: '1',
              title: 'Name Your Bot',
              desc: 'Choose a name, pick an AI model, and write a personality prompt. That\'s your bot\'s soul.',
            },
            {
              num: '2',
              title: 'Hit Deploy',
              desc: 'One tap and we spin up an isolated container with memory, skills, and a live gateway endpoint.',
            },
            {
              num: '3',
              title: 'Chat & Manage',
              desc: 'Start chatting instantly. Monitor logs, add skills, schedule tasks — all from the app.',
            },
          ].map((step, i) => (
            <div
              key={step.num}
              className="step reveal"
              style={{ transitionDelay: `${0.15 + i * 0.15}s` }}
            >
              <div className="step-number">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="landing-section pricing-section">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Pricing
          </div>
          <h2 className="section-title" style={{ margin: '0 auto 0.5rem' }}>
            Simple, transparent pricing
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Start free with 10 messages. Upgrade when you're ready.
          </p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <div
              key={plan.tier}
              className={`pricing-card reveal ${plan.featured ? 'featured' : ''}`}
              style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
            >
              {plan.featured && (
                <div className="pricing-popular">Most Popular</div>
              )}
              <div className="pricing-tier">{plan.tier}</div>
              <div className="pricing-price">
                <span className="pricing-amount">${plan.price}</span>
                <span className="pricing-period">/mo</span>
              </div>
              <div className="pricing-messages">{plan.messages}</div>
              <ul className="pricing-features">
                {plan.features.map((feat) => (
                  <li key={feat}>
                    <span className="check">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`pricing-btn ${plan.featured ? 'primary' : 'outline'}`}
              >
                Get {plan.tier}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section reveal">
        <div className="cta-glow" />
        <h2>
          Ready to deploy your first{' '}
          <span className="gradient-text">AI agent</span>?
        </h2>
        <p>
          Download AgentClaw and have your bot live in under a minute.
        </p>
        <div className="hero-buttons" style={{ position: 'relative' }}>
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Download for iOS →
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <a href="mailto:support@agent-claw.app">Contact</a>
          </div>
          <span className="landing-footer-copy">
            © {new Date().getFullYear()} AgentClaw. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
