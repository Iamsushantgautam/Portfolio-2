import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Github, Globe, Lock, Copy, Check } from 'lucide-react'
import '../styles/ProjectsList.css'

import storeTaansh from '../assets/shopify-store/store1-full.png'
import storeWelthCo from '../assets/shopify-store/store2-full.png'
import storeSkinora from '../assets/shopify-store/store3-full.png'
import storeZynr from '../assets/shopify-store/store4-full.png'

const SHOPIFY_PROJECTS = [
  {
    number: '04',
    category: 'Taansh Jewels',
    subtitle: 'Luxury Jewelry E-commerce Store',
    description: 'A premium jewelry e-commerce storefront designed to deliver a visually rich and conversion-focused shopping experience. The store emphasizes elegance, minimalism, and editorial-style layouts to highlight product craftsmanship and brand storytelling.',
    img: storeTaansh,
    live: 'https://taansh-jewels.myshopify.com',
    password: 'taansh',
  },
  {
    number: '05',
    category: 'WelthCo',
    subtitle: 'Health & Wellness E-commerce Store',
    description: 'A premium health and wellness e-commerce storefront designed to deliver a visually rich and conversion-focused shopping experience. The store emphasizes elegance, minimalism, and editorial-style layouts to highlight product craftsmanship and brand storytelling.',
    img: storeWelthCo,
    live: 'https://wellthco.myshopify.com',
    password: 'sushant',
  },
  {
    number: '06',
    category: 'Skinora',
    subtitle: 'Skincare & Cosmetics E-commerce Store',
    description: 'A premium skin care e-commerce storefront designed to deliver a visually rich and conversion-focused shopping experience. The store emphasizes elegance, minimalism, and editorial-style layouts to highlight product craftsmanship and brand storytelling.',
    img: storeSkinora,
    live: 'https://ps117-skincare-organic-brand-lipcare-etc.myshopify.com',
    password: 'ps117',
  },
  {
    number: '07',
    category: 'Zynr',
    subtitle: 'Sustainable Fashion E-commerce Store',
    description: 'A modern sustainable fashion e-commerce store focused on eco-conscious clothing and minimalist design. The storefront blends bold visuals, dark UI aesthetics, and sustainability-driven storytelling to create a strong brand identity while maintaining a smooth shopping experience.',
    img: storeZynr,
    live: 'https://zynr-sustainable-fashion.myshopify.com',
    password: 'sushant',
  },
]

function ProjectItem({ project, index }) {
  const isEven = index % 2 !== 0
  const itemRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["0 1.1", "0.8 1"]
  })

  // Animation values - neutralized as requested (no blur/color effects)
  const opacity = 1 // Always fully visible
  const textX = useTransform(scrollYProgress, [0, 1], [isMobile ? 0 : (isEven ? 80 : -80), 0])
  const imageScale = 1 // Constant scale
  const imageRotate = 0 // No rotation

  const imageY = useTransform(scrollYProgress, [0, 1], [150, 0]) // Coming from bottom to top

  // Background number parallax
  const bgNumberY = useTransform(scrollYProgress, [0, 1], [isMobile ? 50 : 100, isMobile ? -50 : -100])

  // Synchronized object-position scroll for mobile
  const imageObjectPos = useTransform(scrollYProgress, [0, 1], ["0% 0%", "0% 100%"])

  const handleCopyPw = () => {
    if (project.password) {
      navigator.clipboard.writeText(project.password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

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
        <h3 className="plist-subtitle">{project.subtitle}</h3>
        <p className="plist-description">
          {project.description}
        </p>

        {project.password && (
          <button className="plist-pw-copy-btn" onClick={handleCopyPw}>
            <Lock size={14} strokeWidth={3} />
            <span>Password: {project.password}</span>
            {copied ? <Check size={14} strokeWidth={3} color="#4ade80" /> : <Copy size={14} strokeWidth={3} />}
          </button>
        )}


        <div className="plist-btn-group">
          <a href={project.live} target="_blank" rel="noreferrer" className="plist-btn live">
            <Globe size={18} /> Preview
          </a>
        </div>
      </motion.div>

      <div className="plist-image-wrap">
        <motion.div
          className="plist-img-frame shopify-store-frame"
          style={{ scale: imageScale, rotate: imageRotate, y: imageY }}
        >
          <div className="store-img-scroll-container">
            <motion.img 
              src={project.img} 
              alt={project.subtitle} 
              className="plist-img full-height-img" 
              style={{ objectPosition: isMobile ? imageObjectPos : 'top' }}
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function ShopifyProjects() {
  const shopifyHeaderRef = useRef(null)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Large background text movement
  const xRight = useTransform(scrollYProgress, [0, 1], [100, -100])

  const { scrollYProgress: shopifyScroll } = useScroll({
    target: shopifyHeaderRef,
    offset: ["0 1.2", "1 1"]
  })

  const shopifyY = useTransform(shopifyScroll, [0, 1], [80, 0])
  const shopifyOpacity = useTransform(shopifyScroll, [0, 1], [0, 1])

  return (
    <section className="projects-list-section shopify-section" ref={containerRef}>
      {/* Giant Background Text */}
      <div className="plist-bg-text-container">
        <motion.span className="plist-bg-text" style={{ x: xRight }}>
          SHOPIFY PLUS // LIQUID // HEADLESS E-COMMERCE // STORES // UI // CUSTOM THEMES //
        </motion.span>
      </div>

      <div className="plist-container">
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

export default ShopifyProjects
