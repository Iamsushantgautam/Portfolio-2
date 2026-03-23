import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowUpRight, X, CheckCircle2 } from 'lucide-react'
import me3 from '../assets/me3.svg'
import '../styles/ExperienceSection.css'

const EXPERIENCES = [
  {
    title: 'Web Specialist Intern',
    company: 'GrrowEzy, Remote',
    period: 'Nov 2025 - April 2026',
    description: 'Specializing in web architecture and innovative digital solutions for dynamic client bases.',
    summary: [
      'Worked on digital branding, website content, and visual assets.',
      'Collaborated remotely to support brand growth, ensure consistency, and deliver creative web solutions.',
      'Gained experience in web design, content creation, and digital marketing strategies.'
    ]
  },
  {
    title: 'Content & E-Commerce Management',
    company: 'DRS Gems And Jewels Private Limited., Lucknow',
    period: 'Oct 2025 - Nov 2025',
    description: 'Managed product catalog and e-commerce operations, optimizing listing visibility and conversion.',
    summary: [
      'Managed product catalog and e-commerce operations.',
      'Optimized product listings for better visibility and conversion.',
      'Handled inventory and customer engagement on various platforms.'
    ]
  },
  {
    title: 'Shopify Web Development Intern',
    company: 'Digital Heroes, Lucknow',
    period: 'Jul 2025 - Sep 2025',
    description: 'Developed custom Shopify themes and integrated critical third-party apps to enhance UI/UX.',
    summary: [
      'Developed custom Shopify themes and apps.',
      'Integrated third-party APIs and services for enhanced functionality.',
      'Optimized website performance and mobile responsiveness.'
    ]
  },
]

function ExperienceCard({ exp, index, cardTheme, onOpenModal }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1.2", "1 1"]
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1])
  const translateY = useTransform(scrollYProgress, [0, 1], [60, 0])

  return (
    <motion.div
      ref={cardRef}
      className={`exp-card ${cardTheme}`}
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

      <button onClick={() => onOpenModal(exp)} className="exp-more">
        View <ArrowUpRight size={18} strokeWidth={3} />
      </button>
    </motion.div>
  )
}

function ExperienceSection() {
  const sectionRef = useRef(null)
  const [selectedExp, setSelectedExp] = useState(null)

  return (
    <section className="exp-section" ref={sectionRef}>
      <div className="exp-sticky-container">

        <div className="exp-header">
          <span className="exp-eyebrow">Professional Journey</span>
          <h2 className="exp-title">Work <span className="exp-title-accent">Experience</span></h2>
        </div>

        <div className="exp-split">
          <div className="exp-image-col">
            <div className="exp-image-wrapper">
              <img src={me3} alt="My Experience" className="exp-image" />
            </div>
          </div>

          <div className="exp-cards-col">
            <div className="exp-grid">
              {EXPERIENCES.map((exp, index) => {
                const themes = ['theme-pink', 'theme-cyan', 'theme-white']
                const cardTheme = themes[index % themes.length]

                return (
                  <ExperienceCard
                    key={index}
                    exp={exp}
                    index={index}
                    cardTheme={cardTheme}
                    onOpenModal={setSelectedExp}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedExp && (
          <div className="exp-modal-overlay" onClick={() => setSelectedExp(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="exp-modal"
            >
              <div className="exp-modal-header">
                <h3 className="exp-modal-title">Summary :</h3>
                <button className="exp-modal-close" onClick={() => setSelectedExp(null)}>
                  <X size={24} />
                </button>
              </div>
              <div className="exp-modal-content">
                <ul className="exp-modal-list">
                  {selectedExp.summary.map((item, i) => (
                    <li key={i} className="exp-modal-item">
                      <span className="exp-modal-icon">
                        <CheckCircle2 size={24} strokeWidth={1.5} />
                      </span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ExperienceSection