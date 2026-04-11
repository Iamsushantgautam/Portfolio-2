import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiShopify,
  SiCanva,
  SiGit,
  SiGithub,
  SiPython,
  SiMysql,
  SiOpenai,
  SiBootstrap,
  SiLeetcode,
  SiPostgresql,
  SiLinux,
  SiCplusplus,
} from 'react-icons/si'
import jsIcon from '../assets/icons/javascript.svg'
import reactIcon from '../assets/icons/react.svg'
import nodeIcon from '../assets/icons/nodejs.svg'
import '../styles/SkillsSection.css'

const SKILLS = [
  {
    category: 'FRONTEND',
    tools: [
      { name: 'JavaScript', icon: <img src={jsIcon} alt="JavaScript" className="custom-skill-icon" /> },
      { name: 'React', icon: <img src={reactIcon} alt="React" className="custom-skill-icon" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss color="#06B6D4" /> },
      { name: 'Bootstrap', icon: <SiBootstrap color="#7952B3" /> },
    ],
  },
  {
    category: 'BACKEND',
    tools: [
      { name: 'Node.js', icon: <img src={nodeIcon} alt="Node.js" className="custom-skill-icon" /> },
      { name: 'Express.js', icon: <SiExpress color="#000000" /> },
      { name: 'Python', icon: <SiPython color="#3776AB" /> },
    ],
  },
  {
    category: 'DATABASE',
    tools: [
      { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
      { name: 'SQL', icon: <SiMysql color="#4479A1" /> },
    ],
  },
  {
    category: 'CORE CONCEPTS',
    tools: [
      { name: 'Data Structures', icon: <SiLeetcode color="#FFA116" /> },
      { name: 'DBMS', icon: <SiPostgresql color="#4169E1" /> },
      { name: 'Operating Systems', icon: <SiLinux color="#000000" /> },
      { name: 'OOPs', icon: <SiCplusplus color="#00599C" /> },
    ],
  },
  {
    category: 'SHOPIFY TECH',
    tools: [
      { name: 'Liquid', icon: <SiShopify color="#95BF47" /> },
      { name: 'Theme Customization', icon: <SiShopify color="#95BF47" /> },
      { name: 'Store Setup', icon: <SiShopify color="#95BF47" /> },
      { name: 'Shopify CLI', icon: <SiShopify color="#95BF47" /> },
      { name: 'App Integration', icon: <SiShopify color="#95BF47" /> },
    ],
  },
  {
    category: 'Ecommerce Strategy',
    tools: [
      { name: 'CRO', icon: <SiShopify color="#95BF47" /> },
      { name: 'SEO', icon: <SiShopify color="#95BF47" /> },
      { name: 'Product Optimization', icon: <SiShopify color="#95BF47" /> },
      { name: 'Performance Optimization', icon: <SiShopify color="#95BF47" /> },
    ],
  },
  {
    category: 'TOOLS / DESIGN',
    tools: [
      { name: 'Git', icon: <SiGit color="#F05032" /> },
      { name: 'GitHub', icon: <SiGithub color="#000000" /> },
      { name: 'Canva', icon: <SiCanva color="#00C4CC" /> },
      { name: 'AI Image Generation', icon: <SiOpenai color="#000000" /> },
    ],
  },
]

function SkillRow({ item }) {
  const rowRef = useRef(null)

  // Tie the row's physical scale and horizontal entry to scroll depth
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["0 1.1", "1 1"]
  })

  // Horizontal slide and scale
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1])
  const yOffset = useTransform(scrollYProgress, [0, 1], [40, 0])

  return (
    <motion.div
      ref={rowRef}
      className="skills-row"
      style={{ scale, opacity, y: yOffset }}
    >
      {/* Giant Left Column Title */}
      <div className="skills-category-col">
        <h3 className="skills-category-title">{item.category}</h3>
      </div>

      {/* Right Column Interactive Skill Pills */}
      <div className="skills-tools-col">
        {item.tools.map((tool) => (
          <div key={tool.name} className="skill-tag">
            <span className="skill-icon">{tool.icon}</span>
            <span className="skill-name">{tool.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function SkillsSection() {
  const headerRef = useRef(null)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Background Text Horizontal Movement (from right to left)
  const xMove = useTransform(scrollYProgress, [0, 1], [100, -200])

  const { scrollYProgress: headScroll } = useScroll({
    target: headerRef,
    offset: ["0 1.2", "1 1"]
  })

  const headerOpacity = useTransform(headScroll, [0, 1], [0, 1])
  const headerY = useTransform(headScroll, [0, 1], [50, 0])

  return (
    <section className="skills-section" ref={containerRef}>
      {/* Giant Background Text Animation */}
      <div className="skills-bg-text-container">
        <motion.span className="skills-bg-text" style={{ x: xMove }}>
          KNOWLEDGE // EXPERIENCE // CAPABILITIES // TOOLKIT // EXPERTISE // POWERED BY AI //
        </motion.span>
      </div>

      <div className="skills-container">

        {/* Top Eyebrow Tag explicitly tied to scroll progress */}
        <motion.div
          ref={headerRef}
          className="skills-header-label"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          My Stack
        </motion.div>

        {/* Clean Editorial Table Layout explicitly tied to Hardware Scroll */}
        <div className="skills-table">
          {SKILLS.map((item, rowIndex) => (
            <SkillRow key={item.category} item={item} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default SkillsSection
