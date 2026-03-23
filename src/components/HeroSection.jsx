import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiShopify } from 'react-icons/si'
import meNoBg from '../assets/me3.svg'
import '../styles/HeroSection.css'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: 'easeOut' },
  },
}

const HeartIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 28s-14-8.5-14-17A8 8 0 0116 6.7 8 8 0 0130 11c0 8.5-14 17-14 17z"
      stroke="var(--accent)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
)

function HeroSection() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  const yText = useTransform(scrollYProgress, [0, 1], [0, 250])
  const yImg = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <motion.section
      ref={targetRef}
      className="hero-wrapper"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ opacity }}
    >
      {/* Giant Background Text (SOLID - BEHIND IMAGE) */}
      <motion.div className="hero-bg-text-container" style={{ y: yText }}>
        {/* <motion.span variants={fadeUp} className="designer-label">
          MERN STACK & SHOPIFY DEVELOPER
        </motion.span> */}
        <motion.h1 variants={fadeUp} className="huge-title">
          SUSHANT
        </motion.h1>
      </motion.div>

      {/* Decorative Heart Icons */}
      <motion.div variants={fadeIn}>
        <HeartIcon className="abs-icon icon-1" />
      </motion.div>
      <motion.div variants={fadeIn}>
        <HeartIcon className="abs-icon icon-2" />
      </motion.div>

      {/* Developer Image (MIDDLE LAYER) */}
      <motion.div
        className="hero-image-layer"
        variants={fadeIn}
        style={{ y: yImg, x: "-50%" }}
      >
        <img src={meNoBg} alt="Shopify Developer" />
      </motion.div>


      {/* Professional Intro Text */}
      <motion.div
        className="hero-intro-text"
        variants={fadeIn}
      >
        <p className="intro-greeting">Hi, I'm Sushant<br /> Kumar Gautam</p>
        <p className="intro-title">Computer Science and Engineering Student</p>
        {/* <p className="intro-desc">
          A third-year undergraduate engineering student at<br />B.N. College of Engineering and technology, Lucknow.
        </p> */}
      </motion.div>

      {/* Floating Quote in Script Font */}
      <motion.div
        className="foreground-quote script-font"
        variants={fadeIn}
      >
        Code is not just what you build,<br />it&apos;s how it makes you feel.
      </motion.div>

      {/* Year Range Pill – Right */}
      {/* <motion.div className="pill-button pill-right" variants={fadeUp}>
        2021 – 2025
      </motion.div> */}

      {/* Floating Tech Icons */}
      <motion.div className="tech-icon floating-react" variants={fadeIn} style={{ '--rot': '12deg' }}>
        <SiReact color="#61DAFB" />
      </motion.div>
      <motion.div className="tech-icon floating-node" variants={fadeIn} style={{ '--rot': '-8deg' }}>
        <SiNodedotjs color="#339933" />
      </motion.div>
      <motion.div className="tech-icon floating-mongo" variants={fadeIn} style={{ '--rot': '5deg' }}>
        <SiMongodb color="#47A248" />
      </motion.div>
      <motion.div className="tech-icon floating-express" variants={fadeIn} style={{ '--rot': '-12deg' }}>
        <SiExpress color="#000000" />
      </motion.div>
      <motion.div className="tech-icon floating-shopify" variants={fadeIn} style={{ '--rot': '15deg' }}>
        <SiShopify color="#95BF47" />
      </motion.div>

      {/* Bottom Info Bar */}
      <motion.div className="bottom-bar" variants={fadeUp}>
        <span>SUSHANT GAUTAM</span>
        <span>@SHOPIFYDEV</span>
        <span>+123-456-7890</span>
        <span>IAMSUSHANTGAUTAM@GMAIL.COM</span>
      </motion.div>
    </motion.section>
  )
}

export default HeroSection
