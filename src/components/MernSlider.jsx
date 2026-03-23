import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import './ProjectsSlider.css' // Reusing the same styling logic

import mern1 from '../assets/MERN Project/portfolio1.png'
import mern2 from '../assets/MERN Project/portfolio2.png'
import mern3 from '../assets/MERN Project/portfolio1.1.png'

const MERN_PROJECTS = [
  {
    number: '01',
    title: 'Fullstack Portfolio',
    category: 'MERN Stack',
    description: 'A robust full-stack portfolio management system with a custom CMS and interactive dashboard builtin with React and Node.',
    tech: ['MongoDB', 'Express', 'React', 'Node'],
    color: '#61dafb',
    img: mern1,
    live: '#',
  },
  {
    number: '02',
    title: 'TaskFlow App',
    category: 'Dynamic Web App',
    description: 'A productivity-focused dynamic web application for managing team workflows and project milestones effectively.',
    tech: ['Node.js', 'React', 'MongoDB', 'Redux'],
    color: '#4ade80',
    img: mern2,
    live: '#',
  },
  {
    number: '03',
    title: 'Admin Analytics Portal',
    category: 'Fullstack Dash',
    description: 'An advanced administrative portal with secure JWT authentication and real-time data visualization via Recharts.',
    tech: ['Express', 'React', 'JWT', 'Node'],
    color: '#fb8c00',
    img: mern3,
    live: '#',
  },
]

function MernCard({ project }) {
  return (
    <article className="ps-card">
      <div className="ps-card-top">
        <span className="ps-number">{project.number}</span>
        <a href={project.live} className="ps-live-btn" target="_blank" rel="noreferrer">
          <ExternalLink size={14} />
          Demo
        </a>
      </div>

      <div className="ps-img-wrap">
        <img src={project.img} alt={project.title} className="ps-img" />
        <div className="ps-img-overlay" style={{ '--tint': project.color }} />
      </div>

      <div className="ps-meta">
        <span className="ps-category" style={{ color: project.color }}>{project.category}</span>
        <h3 className="ps-title">{project.title}</h3>
        <p className="ps-description">{project.description}</p>
      </div>

      <div className="ps-tech-row">
        {project.tech.map((t) => (
          <span key={t} className="ps-tech-pill">{t}</span>
        ))}
      </div>

      <a href={project.live} className="ps-cta" style={{ '--cta-color': project.color }}
        target="_blank" rel="noreferrer">
        View Project <ArrowUpRight size={16} />
      </a>
    </article>
  )
}

function MernSlider() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, (v) => `calc(${v * -100}% + ${v * 88}vw)`)

  return (
    <section className="ps-section" ref={sectionRef} style={{ height: '400vh' }}>
      <div className="ps-sticky">
        <div className="ps-header">
          <span className="ps-eyebrow">Fullstack Capabilities</span>
          <h2 className="ps-heading">
            MERN <span className="ps-heading-accent">Projects.</span>
          </h2>
        </div>

        <div className="ps-dots">
          {MERN_PROJECTS.map((_, i) => (
            <span key={i} className="ps-dot" />
          ))}
        </div>

        <div className="ps-viewport">
          <motion.div className="ps-track" style={{ x }}>
            {MERN_PROJECTS.map((project) => (
              <MernCard key={project.number} project={project} />
            ))}
          </motion.div>
        </div>

        <div className="ps-hint">
          <span>Scroll to explore</span>
          <span className="ps-hint-arrow">→</span>
        </div>
      </div>
    </section>
  )
}

export default MernSlider
