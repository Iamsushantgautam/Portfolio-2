import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import me3 from '../assets/me3.svg'
import '../styles/ExperienceSection.css'

const EXPERIENCES = [
  {
    title: 'Web Specialist Intern',
    company: 'GrrowEzy, Remote',
    period: 'Nov 2025 - April 2026',
    description: 'Specializing in web architecture and innovative digital solutions for dynamic client bases.',
  },
  {
    title: 'Content & E-Commerce Management',
    company: 'DRS Gems And Jewels Private Limited., Lucknow',
    period: 'Oct 2025 - Nov 2025',
    description: 'Managed product catalog and e-commerce operations, optimizing listing visibility and conversion.',
  },
  {
    title: 'Shopify Web Development Intern',
    company: 'Digital Heroes, Lucknow',
    period: 'Jul 2025 - Sep 2025',
    description: 'Developed custom Shopify themes and integrated critical third-party apps to enhance UI/UX.',
  },
]

function ExperienceCard({ exp, index, cardTheme }) {
  const cardRef = useRef(null)
  // Tie the animation physically to the user's scrollbar hitting the card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1.2", "1 1"] // Trigger as it enters the viewport and finish as it hits the center
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1])
  const translateY = useTransform(scrollYProgress, [0, 1], [60, 0])

  return (
    <motion.div
      ref={cardRef}
      className={`exp-card ${cardTheme}`}
      // Overwrite static load animations with scroll-linked ones
      style={{
        scale,
        opacity,
        y: translateY
      }}
    >
      <div className="exp-main">
        <div className="exp-top">
          <h3 className="exp-role">{exp.title}</h3>
          <span className="exp-period">{exp.period}</span>
        </div>
        <div className="exp-company-wrapper">
          <span className="exp-company">{exp.company}</span>
        </div>
        <p className="exp-desc">{exp.description}</p>
      </div>

      <a href="#" className="exp-more">
        View <ArrowUpRight size={18} strokeWidth={3} />
      </a>
    </motion.div>
  )
}

function ExperienceSection() {
  const sectionRef = useRef(null)

  // Track scroll of the entire tall section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })

  // Slide the right-side cards leftwards 
  const x = useTransform(scrollYProgress, (v) => `calc(${v * -100}% + ${v * 50}vw)`)

  return (
    <section className="exp-section" ref={sectionRef}>
      <div className="exp-sticky-container">
        
        <div className="exp-header">
          <span className="exp-eyebrow">Professional Journey</span>
          <h2 className="exp-title">Work <span className="exp-title-accent">Experience</span></h2>
        </div>

        <div className="exp-split">
          {/* Awesome Pop Art Image Column (Stationary) */}
          <div className="exp-image-col">
            <div className="exp-image-wrapper">
              <img src={me3} alt="My Experience" className="exp-image" />
            </div>
          </div>

          {/* Horizontal Track (Sliding) */}
          <div className="exp-cards-col">
            <motion.div className="exp-grid" style={{ x }}>
              {EXPERIENCES.map((exp, index) => {
                const themes = ['theme-pink', 'theme-cyan', 'theme-white']
                const cardTheme = themes[index % themes.length]

                return (
                  <ExperienceCard
                    key={index}
                    exp={exp}
                    index={index}
                    cardTheme={cardTheme}
                  />
                )
              })}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ExperienceSection
