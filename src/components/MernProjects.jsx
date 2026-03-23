import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight, Github, Globe } from 'lucide-react'
import '../styles/ProjectsList.css'

import mern1 from '../assets/MERN Project/portfolio1.1.png'
import mern2 from '../assets/MERN Project/portfolio2-full.png'
import expenseTrackerImg from '../assets/MERN Project/portfolio3-full.png'

const MERN_PROJECTS = [
  {
    number: '01',
    category: 'Financial Tracking',
    subtitle: 'Expense Tracker: Web App',
    period: 'July 2025',
    description: 'Developed a professional web-based expense tracker with secure authentication, budget tracking, visual analytics, and CSV export functionality. Built interactive charts using Chart.js to visualize spending patterns and monthly reports, with backend logic in PHP and SQL for robust data management.',
    img: expenseTrackerImg,
    live: 'https://expensive-tracker.page.gd',
    github: 'https://github.com/Iamsushantgautam/Expense-Tracker-Web-Application',
    tech: 'HTML, CSS, JavaScript, PHP, SQL, Chart.js',
  },
  {
    number: '02',
    category: 'Digital Utility',
    subtitle: 'Image PDF Converter: Suite',
    period: 'December 2024',
    description: 'Designed and developed a comprehensive image-to-PDF conversion tool supporting compression, resizing, merging, watermarking, and password protection. Optimized with client-side processing for fast, secure file handling and integrated QR code generation for verification.',
    img: mern2,
    live: 'https://imagepdf-converter.netlify.app/',
    github: 'https://github.com/Iamsushantgautam/ImagePDF-Converter',
    tech: 'HTML, CSS, JavaScript',
  },
  {
    number: '03',
    category: 'Educational Platform',
    subtitle: 'WITCET: Learn & Grow',
    period: 'April 2024',
    description: 'An online education platform offering vast study materials, practice tests, and secure content management. Built with RESTful APIs using Node.js and Express.js for scalable user authentication and implemented MongoDB for efficient, large-scale data storage.',
    img: mern1,
    live: 'https://witcet.online',
    github: 'https://github.com/Iamsushantgautam/witcet-version-3.0',
    tech: 'Node.js, Express.js, MongoDB, Bootstrap, CSS',
  },
]

function ProjectItem({ project, index }) {
  const isEven = index % 2 !== 0
  const itemRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["0 1.1", "0.8 1"]
  })

  const opacity = 1
  const textX = useTransform(scrollYProgress, [0, 1], [isEven ? 80 : -80, 0])
  const imageScale = 1
  const imageRotate = 0


  // Background number parallax
  const bgNumberY = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <motion.div
      ref={itemRef}
      className={`plist-item ${isEven ? 'reverse' : ''}`}
      style={{ opacity }}
    >
      {/* Individual Project Background Decoration */}
      <motion.div
        className="plist-item-bg-decor"
        style={{ y: bgNumberY }}
      >
        {project.number}
      </motion.div>

      <motion.div className="plist-content" style={{ x: textX }}>
        <div className="plist-number-wrap">
          <span>{project.number}</span>
        </div>
        <h2 className="plist-category">{project.category}</h2>
        <div className="plist-subtitle-row">
          <h3 className="plist-subtitle">{project.subtitle}</h3>
        </div>
        <p className="plist-description">
          {project.description}
        </p>
        <div className="plist-tech">
          <strong>Tools used:</strong> {project.tech}
        </div>
        <div className="plist-btn-group">
          <a href={project.live} target="_blank" rel="noreferrer" className="plist-btn live">
            <Globe size={18} /> Preview
          </a>
          <a href={project.github} target="_blank" rel="noreferrer" className="plist-btn github">
            <Github size={18} /> Github Code
          </a>
        </div>
      </motion.div>

      <div className="plist-image-wrap">
        <motion.div
          className={`plist-img-frame ${project.img === mern2 ? 'full-width-frame' : ''}`}
          style={{ scale: imageScale, rotate: imageRotate }}
        >
          <img
            src={project.img}
            alt={project.subtitle}
            className="plist-img"
            style={project.img === mern2 ? { height: 'auto', width: '100%', objectFit: 'contain' } : {}}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

function MernProjects() {
  const mernHeaderRef = useRef(null)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Large background text movement
  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100])

  const { scrollYProgress: mernScroll } = useScroll({
    target: mernHeaderRef,
    offset: ["0 1.2", "1 1"]
  })

  const mernY = useTransform(mernScroll, [0, 1], [80, 0])
  const mernOpacity = useTransform(mernScroll, [0, 1], [0, 1])

  return (
    <section className="projects-list-section mern-section" ref={containerRef}>
      {/* Giant Background Text */}
      <div className="plist-bg-text-container">
        <motion.span className="plist-bg-text" style={{ x: xLeft }}>
          MERN STACK DEVELOPMENT // FULL STACK // REACT // NODE // MONGO // EXPRESS //
        </motion.span>
      </div>

      <div className="plist-container">
        <motion.div
          ref={mernHeaderRef}
          className="plist-section-header"
          style={{ y: mernY, opacity: mernOpacity }}
        >
          <span className="plist-eyebrow">Full-Stack Development</span>
          <h1 className="plist-section-title">MERN <span className="plist-title-accent">Projects</span></h1>
        </motion.div>

        {MERN_PROJECTS.map((project, idx) => (
          <ProjectItem key={project.number} project={project} index={idx} />
        ))}
      </div>
    </section>
  )
}

export default MernProjects
