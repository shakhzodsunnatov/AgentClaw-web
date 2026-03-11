import React from 'react';

const Sidebar = ({ sections, activeSection }) => {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Small offset for fixed header
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <h3 className="toc-title">Table of Contents</h3>
        <ul className="toc-list">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={activeSection === section.id ? 'active' : ''}
                onClick={(e) => scrollToSection(e, section.id)}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
