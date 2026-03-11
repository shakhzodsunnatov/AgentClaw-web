import React from 'react';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <header>
        <NavLink to="/" className="logo">
          <span className="logo-dot"></span>
          AgentClaw
        </NavLink>
        <nav className="nav-links">
          <NavLink 
            to="/privacy" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Privacy Policy
          </NavLink>
          <NavLink 
            to="/terms" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Terms of Service
          </NavLink>
        </nav>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-links">
            <NavLink to="/privacy">Privacy Policy</NavLink>
            <NavLink to="/terms">Terms of Service</NavLink>
            <a href="mailto:support@agent-claw.app">Contact</a>
          </div>
          <p className="copyright">&copy; {new Date().getFullYear()} AgentClaw. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
