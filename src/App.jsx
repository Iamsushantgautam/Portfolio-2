import { useEffect } from 'react'
import Lenis from 'lenis'
import './styles/App.css'

import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import EducationSection from './components/EducationSection'
import SkillsSection from './components/SkillsSection'
import MernProjects from './components/MernProjects'
import ShopifyProjects from './components/ShopifyProjects'
import UtilityToolsSection from './components/UtilityToolsSection'
import ContactSection from './components/ContactSection'
import FooterSection from './components/FooterSection'
import Navbar from './components/Navbar'
import FloatingBg from './components/FloatingBg'

function App() {
  // Global smooth scroll setup with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      lerp: 0.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      wheelMultiplier: 1.1, /* Slightly more sensitive */
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <div className="portfolio-wrapper">
      <FloatingBg />
      <Navbar />

      <section id="hero">
        <HeroSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="education">
        <EducationSection />
      </section>

      <section id="experience">
        <ExperienceSection />
      </section>

      <section id="skills">
        <SkillsSection />
      </section>

      <section id="mern">
        <MernProjects />
      </section>

      <section id="shopify">
        <ShopifyProjects />
      </section>

      <section id="utility-tools">
        <UtilityToolsSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      <FooterSection />
    </div>
  )
}

export default App
