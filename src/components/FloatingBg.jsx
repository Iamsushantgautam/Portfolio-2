import { motion } from 'framer-motion'
import { Plus, X, Circle, Square } from 'lucide-react'

const stickerData = [
  { icon: Plus, top: '15%', left: '8%', size: 40, color: '#e91e63', rotate: 15, delay: 0 },
  { icon: X, top: '45%', left: '88%', size: 30, color: '#00bcd4', rotate: -20, delay: 2 },
  { icon: Circle, top: '75%', left: '5%', size: 50, color: '#e8d94b', rotate: 0, delay: 1 },
  { icon: Square, top: '25%', left: '85%', size: 35, color: '#ffffff', rotate: 45, delay: 3 },
  { icon: Plus, top: '65%', left: '92%', size: 25, color: '#e91e63', rotate: -15, delay: 4 },
  { icon: X, top: '85%', left: '45%', size: 45, color: '#00bcd4', rotate: 10, delay: 5 },
  { icon: Circle, top: '10%', left: '55%', size: 20, color: '#ffffff', rotate: 0, delay: 1.5 },
  { icon: Square, top: '55%', left: '12%', size: 60, color: '#e8d94b', rotate: -30, delay: 2.5 },
]

function FloatingBg() {
  return (
    <div className="global-bg-overlay">
      {/* Persistant Grain Texture */}
      <div className="bg-grain-texture"></div>
      
      {/* Giant Global Halftone Overlay (Fixed) */}
      <div className="bg-halftone-global"></div>

      {stickerData.map((sticker, i) => {
        const Icon = sticker.icon
        return (
          <motion.div
            key={i}
            className="pop-art-sticker"
            style={{
              top: sticker.top,
              left: sticker.left,
              color: sticker.color,
              fontSize: sticker.size,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, 20, 0],
              rotate: [sticker.rotate, sticker.rotate + 20, sticker.rotate],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              delay: sticker.delay,
              ease: "easeInOut"
            }}
          >
            <Icon size={sticker.size} strokeWidth={4} />
          </motion.div>
        )
      })}
    </div>
  )
}

export default FloatingBg
