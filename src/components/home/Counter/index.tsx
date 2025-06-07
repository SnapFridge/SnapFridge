"use client";

import { useMotionValue, useTransform, useInView, motion, animate, AnimationPlaybackControlsWithThen } from "motion/react"; 
import { useEffect, useRef } from "react";

interface Props {
  startingValue: number;
  endingValue: number;
  duration?: number;
  delay?: number;
}

export default function Counter({ startingValue = 0, endingValue, duration = 3,
  delay = 0, ...delegated }: Props) {
  const count = useMotionValue(startingValue);
  const rounded = useTransform(() => Math.round(count.get()));

  const ref = useRef(null); // needed for useInView
  const isInView = useInView(ref);

  useEffect(() => {
    let animation: AnimationPlaybackControlsWithThen;
    if (isInView) {
      const delayTimeout = setTimeout(() => {
        animation = animate(count, endingValue, { duration: duration });
      }, delay * 1000);

      return () => {
        clearTimeout(delayTimeout);
        animation.stop();
      };
    } 
    return () => {
      animation.stop();
    }
  }, [isInView]);

  // apparently using <pre> is better but I don't know how to get rid of the default font family
  // todo: figure out how to get rid of the default behavior of pre
  return <motion.span ref={ref} {...delegated}>{rounded}</motion.span>
}