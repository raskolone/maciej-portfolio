import { motion } from "framer-motion";
import { ReactNode } from "react";

interface JengaSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function JengaSection({ children, className, id }: JengaSectionProps) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ 
        opacity: 0, 
        y: 100, 
        rotateX: -15,
        scale: 0.95
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        scale: 1
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }}
      style={{ perspective: "1000px" }}
    >
      {children}
    </motion.div>
  );
}
