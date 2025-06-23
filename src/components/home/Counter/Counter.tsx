"use client";

import {
  useMotionValue,
  useTransform,
  useInView,
  animate,
  motion,
} from "motion/react";
import { useEffect, useRef } from "react";

type Props = {
  startingValue: number;
  endingValue: number;
  duration?: number;
  delay?: number;
}

function Counter({
  startingValue = 0,
  endingValue,
  duration = 3,
  delay = 0,
  ...delegated
}: Props) {
  const count = useMotionValue(startingValue);
  const rounded = useTransform(() => Math.round(count.get()));

  const ref = useRef(null); // needed for useInView
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        animate(count, endingValue, { duration: duration });
      }, delay * 1000);
    }
  }, [isInView, count, delay, duration, endingValue]);

  // apparently using <pre> is better but I don't know how to get rid of the default font family
  // todo: figure out how to get rid of the default behavior of pre
  return (
    <motion.span ref={ref} {...delegated}>
      {rounded}
    </motion.span>
  );
}

export default Counter;
