"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function Card({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    x.set((e.clientX - left) / width - 0.5);
    y.set((e.clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`
      rounded-2xl
      bg-white dark:bg-gray-900
      p-8
      shadow-sm
      hover:shadow-xl
      transition-shadow
      duration-300
      cursor-pointer
      border border-gray-100 dark:border-gray-800
     ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
