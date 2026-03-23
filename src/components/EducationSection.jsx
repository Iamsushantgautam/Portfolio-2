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
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["0 1.15", "1 1"] 
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1])

  return (
    <motion.div
      ref={itemRef}
      className="ed-timeline-item"
      style={{ scale, opacity }}
    >
      <div className="ed-card-side">
        <div className="ed-icon-wrap">
          <GraduationCap size={28} />
        </div>
        <span className="ed-period">{item.period}</span>
      </div>

      <div className="ed-card-main">
        <h3 className="ed-type">{item.type}</h3>
        <div className="ed-institution">{item.institution}</div>
        <p className="ed-details">{item.specialization}</p>
      </div>

      <div className="ed-card-glow" />
    </motion.div>
  )
}

function EducationSection() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0 1.1", "0.6 1"]
  })

  const bgTextX = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  
  return (
    <section className="ed-section" ref={containerRef}>
      {/* Massive subtle background text to create depth */}
      <motion.div 
        className="ed-section-bg-text"
        style={{ x: bgTextX }}
      >
        LEARNING
      </motion.div>

      <div className="ed-container">
        {/* Header moved outside split just like Exp Section */}
        <div className="ed-header">
          <span className="ed-eyebrow">Intellectual Roots</span>
          <h2 className="ed-title">My <span className="ed-title-accent">Education</span></h2>
        </div>

        <div className="ed-split">
          {/* LEFT SIDE: Timeline Cards */}
          <div className="ed-cards-col">
            <div className="ed-timeline">
              {EDUCATION.map((item, index) => (
                <EducationItem key={index} item={item} />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Image (Sticky) */}
          <div className="ed-image-col">
            <motion.div
              className="ed-image-wrapper"
              viewport={{ once: true }}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img src={me4} alt="Sushant Gautam" className="ed-image" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationSection
