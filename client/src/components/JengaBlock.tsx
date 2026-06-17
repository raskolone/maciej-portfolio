import { motion } from "framer-motion";
import { ReactNode } from "react";

interface JengaBlockProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function JengaBlock({ children, className, delay = 0 }: JengaBlockProps) {
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y: 50,
        rotateX: -10,
        scale: 0.9
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        scale: 1
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: delay,
        duration: 0.6
      }}
      style={{ perspective: "1000px" }}
    >
      {children}
    </motion.div>
  );
}
