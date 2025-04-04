import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import CertificatesSection from './components/CertificatesSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection/>
      <ProjectsSection/>
      <CertificatesSection/>
      <ContactSection/>
      <FooterSection/>
    </div>
  );
};

export default App;