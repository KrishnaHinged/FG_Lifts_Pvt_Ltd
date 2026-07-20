import json
import os

missing_files = [
    'BrandStory.jsx',
    'VisionMission.jsx',
    'ManufacturingBlock.jsx',
    'Leadership.jsx',
    'MilestoneTimeline.jsx',
    'CertificationsStrip.jsx',
    'AboutCTA.jsx'
]

transcript_path = '/Users/krishna/.gemini/antigravity-ide/brain/becc9c3f-6ab9-4940-8923-69ffb07c7735/.system_generated/logs/transcript_full.jsonl'
output_dir = '/Users/krishna/fg trail/fg-lift-website/src/components/about'
os.makedirs(output_dir, exist_ok=True)

file_contents = {name: [] for name in missing_files}

# Add VisionMission from write_to_file directly
vm_code = '''\'use client\'

import { motion } from \'framer-motion\'

export default function VisionMission() {
  const slideUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-8 bg-white border-t border-[#E8E2DA]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start w-full max-w-[1200px] mx-auto">
        
        {/* Vision Block */}
        <motion.div 
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col space-y-6"
        >
          <span className="font-mono text-[9px] tracking-widest text-[#0E4FB3] uppercase font-bold">02 // Our Vision</span>
          <p className="m-0 font-sans text-base sm:text-lg text-[#6B6B6B] leading-[1.8] font-light max-w-[500px]">
            We aspire to be the most trusted partner for intelligent transit systems by creating safer and more sustainable transportation for modern cities.
          </p>
          <blockquote className="m-0 mt-2 font-display text-2xl sm:text-3xl lg:text-4xl text-[#111111] leading-[1.4] font-medium border-l-[3px] border-[#E8A840] pl-6 italic">
            "Empowering people to connect, move, and thrive in a taller, faster, and smarter world."
          </blockquote>
        </motion.div>

        {/* Mission Block */}
        <motion.div 
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col space-y-6 md:pt-[3.2rem]"
        >
          <span className="font-mono text-[9px] tracking-widest text-[#0E4FB3] uppercase font-bold">Our Mission</span>
          <p className="m-0 font-sans text-base sm:text-lg text-[#6B6B6B] leading-[1.8] font-light max-w-[500px]">
            We exceed customer expectations by providing reliable products, responsive service, and long-term value. As our philosophy states, <em className="text-[#111111] font-medium">Choose the Right Partner to Rise Higher.</em>
          </p>
          <div className="mt-2 bg-[#F5F0EB]/60 backdrop-blur-md p-6 sm:p-8 rounded-[1.5rem] border border-[#E8E2DA] shadow-sm max-w-[500px]">
            <p className="m-0 font-sans text-lg sm:text-xl text-[#0E4FB3] leading-relaxed font-semibold">
              To be a customer-centric, service-driven company delivering world-class elevator solutions with uncompromising quality, safety, and trust.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}'''
with open(os.path.join(output_dir, 'VisionMission.jsx'), 'w') as f:
    f.write(vm_code)

with open(transcript_path, 'r') as f:
    for line in f:
        try:
            step = json.loads(line)
        except:
            continue
            
        if step.get('type') == 'VIEW_FILE' and step.get('status') == 'DONE':
            content = step.get('content', '')
            for missing in missing_files:
                if missing == 'VisionMission.jsx':
                    continue
                path_str = f"File Path: `file:///Users/krishna/fg%20trail/fg-lift-website/src/components/about/{missing}`"
                if path_str in content:
                    lines = content.split('\n')
                    code_lines = []
                    is_code = False
                    # Only accept full files or files that start at line 1 and go to the end!
                    # Actually, if we just find the chunk with the most lines, it's likely the full file.
                    for l in lines:
                        if ": " in l and l.split(":")[0].isdigit():
                            is_code = True
                            code_lines.append(l.split(": ", 1)[1])
                        elif is_code:
                            break
                    if code_lines:
                        file_contents[missing].append('\n'.join(code_lines))

for name, versions in file_contents.items():
    if name == 'VisionMission.jsx':
        continue
    if versions:
        # Find the version with the most characters
        best_version = max(versions, key=len)
        with open(os.path.join(output_dir, name), 'w') as f:
            f.write(best_version)
        print(f"Restored {name} (size: {len(best_version)})")
