'use client'

import { motion } from 'framer-motion'
import BlogCard from './BlogCard'

export default function BlogGrid({ posts = [], featuredPost = null }) {
  // Filter out the featured post from the grid if active
  const gridPosts = featuredPost
    ? posts.filter(p => p.slug !== featuredPost.slug)
    : posts

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  }

  const getBlogCardLayout = (i) => {
    const mod = i % 9
    if (mod === 0) return { classes: 'lg:col-span-8 md:col-span-12 col-span-12', isWide: true }
    if (mod === 1) return { classes: 'lg:col-span-4 md:col-span-12 col-span-12', isWide: false }
    if (mod === 2 || mod === 3 || mod === 4) return { classes: 'lg:col-span-4 md:col-span-6 col-span-12', isWide: false }
    return { classes: 'lg:col-span-6 md:col-span-6 col-span-12', isWide: false }
  }

  return (
    <div className="w-full">
      {gridPosts.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {gridPosts.map((post, i) => {
            const layout = getBlogCardLayout(i)
            return (
              <motion.div
                key={post.slug || post._id}
                variants={itemVariants}
                className={layout.classes}
              >
                <BlogCard post={post} isWide={layout.isWide} />
              </motion.div>
            )
          })}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <p className="font-mono text-[11px] text-[#9A9A9A] tracking-widest uppercase m-0">
            No articles in this category yet.
          </p>
        </motion.div>
      )}
    </div>
  )
}
