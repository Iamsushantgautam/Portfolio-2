import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import '../styles/ContactSection.css'

function ContactSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0 1.2", "0.8 1"]
  })

  // Animation values
  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1])
  const yOffset = useTransform(scrollYProgress, [0, 1], [100, 0])
  const headerX = useTransform(scrollYProgress, [0, 1], [-100, 0])

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Trigger success state or just clear the form for now
    alert('Message Sent Successfully! Sushant will get back to you soon.')
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <section className="contact-section" ref={containerRef}>
      <div className="contact-container">
        
        {/* Massive Background Scroll Text */}
        <div className="contact-bg-text">MESSAGE</div>

        <div className="contact-inner">
          
          {/* Left Column: Form */}
          <motion.div 
            className="contact-left"
            style={{ opacity, y: yOffset }}
          >
            <motion.div style={{ x: headerX }} className="contact-header">
              <span className="contact-eyebrow">Ready to start?</span>
              <h2 className="contact-title">Lets <span className="contact-title-accent">Talk</span></h2>
            </motion.div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  required 
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  required 
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message" 
                  placeholder="Drop a Message..." 
                  rows="5" 
                  required
                  value={formState.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Right Column: Details & Visual */}
          <motion.div 
            className="contact-right"
            style={{ opacity }}
          >
            <div className="contact-info-card theme-cyan">
              <h3 className="contact-info-title">Contact Info</h3>
              <div className="contact-detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">iamsushantgautam@gmail.com</span>
              </div>
              <div className="contact-detail-item">
                <span className="detail-label">Location:</span>
                <span className="detail-value">Lucknow, Uttar Pradesh, India</span>
              </div>
              
              <div className="contact-social-pills">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-pill">LinkedIn</a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="social-pill">Github</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-pill">Instagram</a>
              </div>
            </div>

            {/* A fun pop-art decorative element */}
            <div className="contact-pop-decoration">
               <div className="circle-bg pink"></div>
               <div className="circle-bg cyan"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default ContactSection
