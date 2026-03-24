import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowUpRight, X, CheckCircle2 } from 'lucide-react'
import me3 from '../assets/me3.svg'
import '../styles/ExperienceSection.css'

const EXPERIENCES = [
  {
    title: 'Web Specialist Intern',
    company: 'GrrowEzy, Remote, Bengaluru',
    period: 'Nov 2025 - Mar 2026',
    description: 'Specializing in Shopify store visuals, branding assets, and UI/UX optimization for ecommerce.',
    summary: [
      'Designed and optimized Shopify store visuals and branding assets',
      'Delivered 50+ ecommerce-ready creatives for landing and product pages',
      'Collaborated with remote teams to maintain brand consistency',
      'Improved user experience through UI enhancements and CRO techniques'
    ]
  },
  {
    title: 'Content and Ecommerce Management',
    company: 'DRS Gems and Jewels Private Limited, Lucknow',
    period: 'Oct 2025 - Nov 2025',
    description: 'Managed extensive Shopify product listings and optimized product pages for search visibility and conversion.',
    summary: [
      'Managed 200+ Shopify product listings including inventory updates and pricing accuracy',
      'Optimized product pages using SEO techniques to improve search visibility',
      'Created high-converting product visuals and marketing assets',
      'Supported daily ecommerce operations and performance tracking'
    ]
  },
  {
    title: 'Shopify Web Development Intern',
    company: 'Digital Heroes, Lucknow',
    period: 'Jul 2025 - Sep 2025',
    description: 'Customized Shopify themes and integrated apps to enhance store functionality and user experience.',
    summary: [
      'Customized Shopify themes using Liquid, HTML, CSS, and JavaScript',
      'Integrated and configured Shopify apps to enhance store functionality and performance',
      'Improved page load speed by 25 percent through performance optimization techniques',
      'Worked on multiple client ecommerce stores, enhancing UI and user experience'
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
              <img src={me3} alt="My Experience" className="exp-image" loading="lazy" />
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