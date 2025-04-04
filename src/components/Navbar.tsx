import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'es' ? 'en' : 'es'));
  };

  const navItems = {
    es: {
      home: 'Inicio',
      about: 'Sobre Mí',
      projects: 'Proyectos',
      contact: 'Contacto',
      contactButton: 'Contactar'
    },
    en: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      contactButton: 'Contact'
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="navbar-logo" onClick={closeMenu}>
          <img src={logo} alt="Logo" className="logo-image" />
        </a>

        <div className="navbar-right">
          {/* Menú de navegación */}
          <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <a href="#home" className="nav-link" onClick={closeMenu}>
                <span className="nav-link-text">{navItems[language].home}</span>
                <span className="nav-link-underline"></span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link" onClick={closeMenu}>
                <span className="nav-link-text">{navItems[language].about}</span>
                <span className="nav-link-underline"></span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#projects" className="nav-link" onClick={closeMenu}>
                <span className="nav-link-text">{navItems[language].projects}</span>
                <span className="nav-link-underline"></span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link" onClick={closeMenu}>
                <span className="nav-link-text">{navItems[language].contact}</span>
                <span className="nav-link-underline"></span>
              </a>
            </li>
            <li className="nav-item mobile-only">
              <a href="#contact" className="nav-button" onClick={closeMenu}>
                {navItems[language].contactButton}
              </a>
            </li>
            <li className="nav-item">
              <button className="language-switcher" onClick={toggleLanguage}>
                {language === 'es' ? 'EN' : 'ES'}
              </button>
            </li>
          </ul>

          {/* Menú hamburguesa */}
          <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </div>

        {/* Overlay */}
        <div className={`nav-overlay ${isOpen ? 'active' : ''}`} onClick={closeMenu}></div>
      </div>
    </nav>
  );
};

export default Navbar;