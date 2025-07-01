"use client";

import { useMotionValue, useTransform, useInView, animate, motion } from "motion/react";
import { useEffect, useRef } from "react";

type Props = {
  startValue?: number;
  endValue: number;
  duration?: number;
  delay?: number;
};

function Counter({
  startValue = 0,
  endValue,
  duration = 3,
  delay = 250,
  ...delegated
}: Props) {
  const count = useMotionValue(startValue);
  const rounded = useTransform(() => Math.round(count.get()));

  const ref = useRef(null); // needed for useInView
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        animate(count, endValue, { duration: duration });
      }, delay);
    }
  }, [isInView, count, delay, duration, endValue]);

  // apparently using <pre> is better but I don't know how to get rid of the default font family
  // todo: figure out how to get rid of the default behavior of pre
  return (
    <motion.span ref={ref} {...delegated}>
      {rounded}
    </motion.span>
  );
}

export default Counter;
