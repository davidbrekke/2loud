import { motion } from 'framer-motion'

const AnimatePage: React.FC = ({ children }) => (
  <motion.div
    initial="pageInitial"
    animate="pageAnimate"
    variants={pageVariant}
    transition={{ duration: 1 }}
  >
    {children}
  </motion.div>
)

const pageVariant = {
  pageInitial: {
    opacity: 0,
  },
  pageAnimate: {
    opacity: 1,
  },
}

export default AnimatePage
