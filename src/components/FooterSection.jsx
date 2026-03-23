import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa'
import { Copy, CheckCircle2 } from 'lucide-react'
import '../styles/FooterSection.css'

function FooterSection() {
  const [copied, setCopied] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  const handleCopy = () => {
    navigator.clipboard.writeText('iamsushantgautam@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Live time update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      setCurrentTime(timeStr)
    }
    updateTime()
    const interval = setInterval(updateTime, 60000) // update every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* Social Banner / Brand */}
        <motion.div 
          className="social-banner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="brand-text">
            <span className="brand-code">CODE</span><br />
            <span className="brand-maverick">MAVERICK</span>
          </div>

          <div className="social-icons-group">
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-circle circle-linkedin">
              <FaLinkedinIn />
            </a>
            
            {/* Github */}
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-circle circle-github">
              <FaGithub />
            </a>
            
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-circle circle-instagram">
              <FaInstagram />
            </a>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div 
          className="contact-area"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <span className="contact-eyebrow">Looking for a new talent?</span>
          
          <div className="contact-email-wrapper">
            <button className="copy-btn" onClick={handleCopy} aria-label="Copy Email">
              {copied ? <CheckCircle2 color="#4ade80" size={32} /> : <Copy size={32} />}
            </button>
            <span className="contact-email">@iamsushantgautam@gmail.com</span>
          </div>

          <div className="contact-links">
            <span>•</span> <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <span>•</span> <a href="/cv.pdf" target="_blank" rel="noreferrer">Download CV</a>
          </div>
        </motion.div>

        {/* Footer Bottom Info Grid */}
        <motion.div 
          className="footer-bottom-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1 }}
        >
          {/* Left */}
          <div className="footer-bottom-col">
            <span className="f-label">Availability</span>
            <span className="f-value">Currently available for full-time</span>
          </div>

          {/* Center */}
          <div className="footer-bottom-col f-col-center">
            <span className="f-label">© 2026, Sushant Gautam</span>
            <span className="f-value">All Rights Reserved</span>
          </div>

          {/* Right */}
          <div className="footer-bottom-col f-col-right">
            <span className="f-label">Uttar Pradesh, Lucknow</span>
            <span className="f-value">Current Time: {currentTime}</span>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}

export default FooterSection
