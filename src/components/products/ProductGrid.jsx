'use client'

import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

export default function ProductGrid({ products }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
    >
      {products.map((product) => (
        <motion.div 
          key={product.slug || product._id}
          variants={itemVariants}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  )
}
