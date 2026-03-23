import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import '../styles/ProjectsSlider.css'

import storeAura   from '../assets/store_aura.png'
import storeUrban  from '../assets/store_urban.png'
import storeGreens from '../assets/store_greens.png'
import storeLuxe   from '../assets/store_luxe.png'

const PROJECTS = [
  {
    number: '01',
    title: 'Aura Beauty',
    category: 'Headless Shopify',
    description: 'A headless storefront built with Next.js and the Shopify Storefront API. Blazing-fast UI with seamless cart.',
    tech: ['Next.js', 'GraphQL', 'Liquid'],
    color: '#c9a96e',
    img: storeAura,
    live: '#',
  },
  {
    number: '02',
    title: 'Urban Kicks',
    category: 'Custom Theme',
    description: 'High-energy Shopify 2.0 theme built for a streetwear brand. Bold typography and animated reveals.',
    tech: ['Shopify 2.0', 'Liquid', 'JS'],
    color: '#f97316',
    img: storeUrban,
    live: '#',
  },
  {
    number: '03',
    title: 'The Green Basket',
    category: 'Shopify Plus',
    description: 'Eco-first grocery store on Shopify Plus with subscription features and multi-currency checkout.',
    tech: ['Shopify Plus', 'Liquid', 'Recharge'],
    color: '#4ade80',
    img: storeGreens,
    live: '#',
  },
  {
    number: '04',
    title: 'Luxe & Co',
    category: 'Luxury Theme',
    description: 'An editorial-style Shopify store for a luxury jewellery brand with parallax and custom viewer.',
    tech: ['Shopify', 'Liquid', 'Three.js'],
    color: '#d4af37',
    img: storeLuxe,
    live: '#',
  },
]

// Card width + gap in px — must match CSS
const CARD_WIDTH = 420
const CARD_GAP   = 32

function ProjectCard({ project }) {
  return (
    <article className="ps-card">
      {/* Top: number + live link */}
      <div className="ps-card-top">
        <span className="ps-number">{project.number}</span>
        <a href={project.live} className="ps-live-btn" target="_blank" rel="noreferrer">
          <ExternalLink size={14} />
          Live Store
        </a>
      </div>

      {/* Preview image */}
      <div className="ps-img-wrap">
        <img src={project.img} alt={`${project.title} store preview`} className="ps-img" />
        <div className="ps-img-overlay" style={{ '--tint': project.color }} />
      </div>

      {/* Meta */}
      <div className="ps-meta">
        <span className="ps-category" style={{ color: project.color }}>{project.category}</span>
        <h3 className="ps-title">{project.title}</h3>
        <p className="ps-description">{project.description}</p>
      </div>

      {/* Tech pills */}
      <div className="ps-tech-row">
        {project.tech.map((t) => (
          <span key={t} className="ps-tech-pill">{t}</span>
        ))}
      </div>

      {/* CTA */}
      <a href={project.live} className="ps-cta" style={{ '--cta-color': project.color }}
        target="_blank" rel="noreferrer">
        View project <ArrowUpRight size={16} />
      </a>
    </article>
  )
}

function ProjectsSlider() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // We want to slide the track left exactly (track_width - container_width).
  // track_width is 100% of the flex row.
  // container_width is 88vw (100vw - 12% padding).
  // Using a dynamic string interpolation ensures it stays perfectly responsive.
  const x = useTransform(scrollYProgress, (v) => `calc(${v * -100}% + ${v * 88}vw)`)

  return (
    <section className="ps-section" ref={sectionRef}>
      <div className="ps-sticky">

        {/* Section heading */}
        <div className="ps-header">
          <span className="ps-eyebrow">Selected Work</span>
          <h2 className="ps-heading">
            Shopify <span className="ps-heading-accent">Stores.</span>
          </h2>
        </div>

        {/* Progress dots */}
        <div className="ps-dots">
          {PROJECTS.map((_, i) => (
            <span key={i} className="ps-dot" />
          ))}
        </div>

        {/* Sliding track */}
        <div className="ps-viewport">
          <motion.div className="ps-track" style={{ x }}>
            {PROJECTS.map((project) => (
              <ProjectCard key={project.number} project={project} />
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="ps-hint">
          <span>Scroll to explore</span>
          <span className="ps-hint-arrow">→</span>
        </div>

      </div>
    </section>
  )
}

export default ProjectsSlider
