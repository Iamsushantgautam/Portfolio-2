import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import '../styles/ProjectsList.css'

import storeAura from '../assets/store_aura.png'
import storeUrban from '../assets/store_urban.png'
import storeGreens from '../assets/store_greens.png'
import storeLuxe from '../assets/store_luxe.png'

import mern1 from '../assets/MERN Project/portfolio1.png'
import mern2 from '../assets/MERN Project/portfolio2.png'
import mern3 from '../assets/MERN Project/portfolio1.1.png'

const SHOPIFY_PROJECTS = [
  {
    number: '01',
    category: 'Creativity',
    subtitle: 'Aura Beauty: Headless Store',
    description: 'A headless storefront built with Next.js and the Shopify Storefront API. Blazing-fast UI with seamless cart navigation and high-conversion editorial design.',
    img: storeAura,
    btnText: 'Experience Aura',
  },
  {
    number: '02',
    category: 'Content',
    subtitle: 'Urban Kicks: Shopify 2.0',
    description: 'High-energy Shopify 2.0 theme built for a global streetwear brand. Optimized for viral content and dynamic product landing pages.',
    img: storeUrban,
    btnText: 'View Storefront',
  },
  {
    number: '03',
    category: 'Growth',
    subtitle: 'The Green Basket: Plus UX',
    description: 'Eco-first grocery platform on Shopify Plus with complex subscription features and multi-currency checkout systems.',
    img: storeGreens,
    btnText: 'See Strategy',
  },
]

const MERN_PROJECTS = [
  {
    number: '04',
    category: 'Frontend',
    subtitle: 'TaskFlow: Redux + Node',
    description: 'A productivity-focused dynamic web application for managing team workflows with real-time state synchronization.',
    img: mern2,
    btnText: 'Test the App',
  },
  {
    number: '05',
    category: 'Analytical',
    subtitle: 'Admin Analytics Portal',
    description: 'An advanced administrative portal with secure JWT authentication and real-time data visualization for MERN ecosystems.',
    img: mern3,
    btnText: 'Demo Analytics',
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

// Reusable Typewriter effect component that triggers on scroll
function TypewriterText({ text }) {
  // Support for spaces natively when split by letter
  return (
    <motion.p
      className="plist-description"
      variants={sentenceVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {text.split("").map((char, index) => (
        // Using `&nbsp;` to accurately render space characters in staggered spans
        <motion.span key={index} variants={letterVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
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
        <h3 className="plist-subtitle">{project.subtitle}</h3>
        {/* Trigger the scroll writing animation! */}
        <TypewriterText text={project.description} />
        <a href="#view" className="plist-btn">
          {project.btnText}
        </a>
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
