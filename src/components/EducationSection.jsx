import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap } from 'lucide-react'
import '../styles/EducationSection.css'
import me4 from '../assets/me3.svg'

const EDUCATION = [
  {
    type: 'College',
    institution: 'B.N College of Engineering and Technology, Lucknow',
    period: '2022 - 2026',
    specialization: 'Bachelor of Technology in Computer Science',
  },
  {
    type: 'Class 12th',
    institution: 'Bal Nikunj English School, Lucknow',
    period: 'Completed 2022',
    specialization: 'Science Stream (PCM)',
  },
  {
    type: 'High School',
    institution: 'Bal Nikunj English School, Lucknow',
    period: 'Completed 2020',
    specialization: 'General Secondary Education',
  },
]

function EducationItem({ item }) {
  const itemRef = useRef(null)
  // Physically map animation to the scroll progress of each individual timeline node
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["0 1.15", "1 1"] 
  })

  // Smooth pop art slide and squeeze
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1])
  const translateX = useTransform(scrollYProgress, [0, 1], [-60, 0])

  return (
    <motion.div
      ref={itemRef}
      className="ed-timeline-item"
      style={{ scale, opacity, x: translateX }}
    >
      <div className="ed-card-header">
        <div className="ed-icon-wrap">
          <GraduationCap size={24} color="var(--accent)" />
        </div>
        <span className="ed-period">{item.period}</span>
      </div>

      <h3 className="ed-type">{item.type}</h3>
      <div className="ed-institution">{item.institution}</div>
      <p className="ed-details">{item.specialization}</p>

      <div className="ed-card-glow" />
    </motion.div>
  )
}

function EducationSection() {
  const containerRef = useRef(null)
  
  // Tie the entire left image avatar's entry into the scrollbar of the whole section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0 1.1", "0.6 1"]
  })

  const headerOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const headerX = useTransform(scrollYProgress, [0, 1], [-80, 0])

  const imageScale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const imageX = useTransform(scrollYProgress, [0, 1], [100, 0])
  
  return (
    <section className="ed-section" ref={containerRef}>
      {/* Massive subtle background text to create depth */}
      <div className="ed-section-bg-text">LEARN</div>

      <div className="ed-container">
        <div className="ed-split">

          {/* LEFT SIDE: Education Content */}
          <div className="ed-left">
            <motion.div
              className="ed-header"
              style={{ opacity: headerOpacity, x: headerX }}
            >
              <span className="ed-eyebrow">Intellectual Roots</span>
              <h2 className="ed-title">My <span className="ed-title-accent">Education</span></h2>
            </motion.div>

            <div className="ed-timeline">
              {EDUCATION.map((item, index) => (
                <EducationItem key={index} item={item} />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Profile Image mapped directly to Scroll */}
          <motion.div
            className="ed-right"
            style={{ scale: imageScale, x: imageX }}
          >
            <img src={me4} alt="Sushant Gautam" className="ed-image" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default EducationSection
