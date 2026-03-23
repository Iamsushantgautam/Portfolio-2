import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight, Github, Globe } from 'lucide-react'
import '../styles/ProjectsList.css'

import storeAura from '../assets/store_aura.png'
import storeUrban from '../assets/store_urban.png'
import storeGreens from '../assets/store_greens.png'
import storeLuxe from '../assets/store_luxe.png'

import mern1 from '../assets/MERN Project/portfolio1.1.png'
import mern2 from '../assets/MERN Project/portfolio2.png'
import expenseTrackerImg from '../assets/MERN Project/portfolio3.jpeg'

const SHOPIFY_PROJECTS = [
  {
    number: '04',
    category: 'Creativity',
    subtitle: 'Aura Beauty: Headless Store',
    description: 'A headless storefront built with Next.js and the Shopify Storefront API. Blazing-fast UI with seamless cart navigation and high-conversion editorial design.',
    img: storeAura,
    live: '#',
    github: '#',
    tech: 'Next.js, GraphQL, Liquid, Tailwind',
  },
  {
    number: '05',
    category: 'Content',
    subtitle: 'Urban Kicks: Shopify 2.0',
    description: 'High-energy Shopify 2.0 theme built for a global streetwear brand. Optimized for viral content and dynamic product landing pages.',
    img: storeUrban,
    live: '#',
    github: '#',
    tech: 'Shopify 2.0, Liquid, JavaScript, SCSS',
  },
  {
    number: '06',
    category: 'Growth',
    subtitle: 'The Green Basket: Plus UX',
    description: 'Eco-first grocery platform on Shopify Plus with complex subscription features and multi-currency checkout systems.',
    img: storeGreens,
    live: '#',
    github: '#',
    tech: 'Shopify Plus, Recharge, Liquid, JS',
  },
]

const MERN_PROJECTS = [
  {
    number: '01',
    category: 'Financial Tracking',
    subtitle: 'Expense Tracker: Web App',
    period: 'July 2025',
    description: 'Developed a professional web-based expense tracker with secure authentication, budget tracking, visual analytics, and CSV export functionality. Built interactive charts using Chart.js to visualize spending patterns and monthly reports, with backend logic in PHP and SQL for robust data management.',
    img: expenseTrackerImg,
    live: '#',
    github: '#',
    tech: 'HTML, CSS, JavaScript, PHP, SQL, Chart.js',
  },
  {
    number: '02',
    category: 'Digital Utility',
    subtitle: 'Image PDF Converter: Suite',
    period: 'December 2024',
    description: 'Designed and developed a comprehensive image-to-PDF conversion tool supporting compression, resizing, merging, watermarking, and password protection. Optimized with client-side processing for fast, secure file handling and integrated QR code generation for verification.',
    img: mern2,
    live: 'https://ip-converter.onrender.com/',
    github: '#',
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
    github: '#',
    tech: 'Node.js, Express.js, MongoDB, Bootstrap, CSS',
  },
]

// Typewriter variants for the writing animation effect
const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.015, // Extremely fast fluid typing speed
    },
  },
}

const letterVariants = {
  hidden: { opacity: 0, display: 'inline-block' },
  visible: { opacity: 1, display: 'inline-block' },
}

// Simplified text animation to ensure full description is visible
function TypewriterText({ text }) {
  return (
    <motion.p
      className="plist-description"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </motion.p>
  )
}

function ProjectItem({ project, index }) {
  const isEven = index % 2 !== 0
  const itemRef = useRef(null)

  // Hardware-scroll tracking
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["0 1.1", "0.8 1"]
  })

  // Physical parallax attributes
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1])

  // Text slides from left or right based on reverse layout
  const textX = useTransform(scrollYProgress, [0, 1], [isEven ? 80 : -80, 0])

  // Image spins gracefully and scales up
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const imageRotate = useTransform(scrollYProgress, [0, 1], [isEven ? 4 : -4, 0])

  return (
    <motion.div
      ref={itemRef}
      className={`plist-item ${isEven ? 'reverse' : ''}`}
      style={{ opacity }}
    >
      <motion.div className="plist-content" style={{ x: textX }}>
        <div className="plist-number-wrap">
          <span>{project.number}</span>
        </div>
        <h2 className="plist-category">{project.category}</h2>
        <div className="plist-subtitle-row">
          <h3 className="plist-subtitle">{project.subtitle}</h3>
          {/* <span className="plist-period">{project.period}</span> */}
        </div>
        {/* Trigger the scroll writing animation! */}
        <TypewriterText text={project.description} />
        <div className="plist-tech">
          <strong>Tools used:</strong> {project.tech}
        </div>
        <div className="plist-btn-group">
          <a href={project.live} target="_blank" rel="noreferrer" className="plist-btn live">
            <Globe size={18} /> Live Link
          </a>
          <a href={project.github} target="_blank" rel="noreferrer" className="plist-btn github">
            <Github size={18} /> Github Code
          </a>
        </div>
      </motion.div>

      <div className="plist-image-wrap">
        <motion.div
          className="plist-img-frame"
          style={{ scale: imageScale, rotate: imageRotate }}
        >
          <img src={project.img} alt={project.subtitle} className="plist-img" />
        </motion.div>
        {/* Decorative Squiggle lines behind image */}
        <div className="plist-squiggle">
          <svg width="100%" height="100%" viewBox="0 0 500 500">
            <path d="M10,250 C10,10 490,10 490,250 C490,490 10,490 10,250 Z" />
            <path d="M50,250 C50,50 450,50 450,250 C450,450 50,450 50,250 Z" opacity="0.6" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectsList() {
  const shopifyHeaderRef = useRef(null)
  const mernHeaderRef = useRef(null)

  const { scrollYProgress: shopifyScroll } = useScroll({
    target: shopifyHeaderRef,
    offset: ["0 1.2", "1 1"]
  })
  const { scrollYProgress: mernScroll } = useScroll({
    target: mernHeaderRef,
    offset: ["0 1.2", "1 1"]
  })

  const shopifyY = useTransform(shopifyScroll, [0, 1], [80, 0])
  const shopifyOpacity = useTransform(shopifyScroll, [0, 1], [0, 1])

  const mernY = useTransform(mernScroll, [0, 1], [80, 0])
  const mernOpacity = useTransform(mernScroll, [0, 1], [0, 1])

  return (
    <section className="projects-list-section">
      <div className="plist-container">


        {/* --- MERN SECTION --- */}
        <motion.div
          ref={mernHeaderRef}
          className="plist-section-header"
          style={{ y: mernY, opacity: mernOpacity, marginTop: '0rem' }}
        >
          <span className="plist-eyebrow">Full-Stack Development</span>
          <h1 className="plist-section-title">MERN <span className="plist-title-accent">Projects</span></h1>
        </motion.div>

        {MERN_PROJECTS.map((project, idx) => (
          <ProjectItem key={project.number} project={project} index={idx} />
        ))}

        {/* --- SHOPIFY SECTION --- */}
        <motion.div
          ref={shopifyHeaderRef}
          className="plist-section-header"
          style={{ y: shopifyY, opacity: shopifyOpacity }}
        >
          <span className="plist-eyebrow">E-Commerce Ecosystems</span>
          <h1 className="plist-section-title">Shopify <span className="plist-title-accent">Stores</span></h1>
        </motion.div>

        {SHOPIFY_PROJECTS.map((project, idx) => (
          <ProjectItem key={project.number} project={project} index={idx} />
        ))}



      </div>
    </section>
  )
}

export default ProjectsList
