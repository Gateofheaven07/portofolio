const fs = require('fs');
const path = require('path');

const filesToProcess = [
  'components/about-section.tsx',
  'components/skills-section.tsx',
  'components/timeline-section.tsx',
  'components/projects-section.tsx',
  'components/contact-section.tsx'
];

filesToProcess.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update imports
  if (content.includes('import { AnimateIn') || content.includes('AnimateIn,')) {
    // replace AnimateIn import
    content = content.replace(/import\s+\{([^}]*?)AnimateIn(,?)([^}]*?)\}\s+from\s+["']\.\/animations["']/g, (match, prefix, comma, suffix) => {
      const rest = (prefix + suffix).replace(/,\s*$/, '').trim();
      if (rest) {
        return `import { ${rest} } from "./animations"`;
      }
      return ''; // removed AnimateIn completely
    });
  }
  
  if (!content.includes('import { motion } from "framer-motion"')) {
    content = content.replace(/(import .*?\n)(?=(import |export |const ))/, `$1import { motion } from "framer-motion"\nimport { fadeInUp, fadeInDown, staggerContainer, scaleAnimation } from "../utils/animation"\n`);
  }

  // 2. Add staggerContainer to the main wrap
  // About Section
  content = content.replace(
    /<div className="max-w-7xl mx-auto relative z-10">/g,
    `<motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto relative z-10"
      >`
  );

  // Timeline Section
  content = content.replace(
    /<div className="max-w-4xl mx-auto relative z-10 w-full px-2 sm:px-4">/g,
    `<motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-4xl mx-auto relative z-10 w-full px-2 sm:px-4"
      >`
  );

  // Projects Section
  content = content.replace(
    /<div className="max-w-7xl mx-auto relative z-10 w-full">/g,
    `<motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto relative z-10 w-full"
      >`
  );

  // Contact Section
  content = content.replace(
    /<div className="max-w-4xl mx-auto relative z-10">/g,
    `<motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-4xl mx-auto relative z-10"
      >`
  );
  
  // They all need to end with </motion.div> instead of </div> where applicable.
  // Wait, I will just manually fix the closing tag for the main wrappers because regexing the matching closing tag is hard in JS.

  // 3. Replace <AnimateIn> with motion.div
  // Wait, I'll do this carefully.
  // Header variants=fadeInDown
  // Card variants=scaleAnimation
  // Text inside AnimateIn variants=fadeInUp (wait, since AnimateIn usually wraps a card or a block, let's look at the variant used inside AnimateIn previously)
  // If AnimateIn was fade-up -> check context or just use fadeInUp. BUT wait, "Card: gunakan fadeInUp + scale" and "Text: fadeInUp". So I can use scaleAnimation for cards and fadeInUp for text blocks.
  
});
