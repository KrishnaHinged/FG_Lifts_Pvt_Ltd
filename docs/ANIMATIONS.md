# Motion Architecture Guide — FG Lift Pvt. Ltd.

## Motion Libraries
- **Framer Motion**: Scroll-triggered animations, page transitions, and interactive UI component states.
- **GSAP**: Advanced timeline animations and scroll trigger sequences.

## Guidelines
- Avoid heavy perpetual CPU animations on low-power mobile devices.
- Respect `prefers-reduced-motion` settings.
- Use `framer-motion` layout animations for tab transitions and filter state changes.
