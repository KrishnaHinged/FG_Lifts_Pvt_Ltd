import React from 'react'
import Typography from './Typography'

export function Quote({ children, author, ...props }) {
  return (
    <div className="border-l-2 border-[#E8E2DA] pl-6 space-y-2">
      <Typography as="blockquote" font="display" size="md" className="italic text-[#111111]" {...props}>
        "{children}"
      </Typography>
      {author && (
        <Typography as="cite" font="sans" size="xs" color="muted" className="block not-italic">
          — {author}
        </Typography>
      )}
    </div>
  )
}

export default Quote
