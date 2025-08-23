"use client";

import { animate, useInView, useMotionValue, useTransform } from "motion/react";
import { span as MotionSpan } from "motion/react-client";
import { useEffect, useRef } from "react";

type Props = {
  start?: number;
  end: number;
  duration?: number;
};

function Counter({ start = 0, end, duration = 3, ...delegated }: Props) {
  const count = useMotionValue(start);
  const rounded = useTransform(() => Math.round(count.get()));
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        animate(count, end, { duration });
      }, 250);
    }
  }, [isInView, count, duration, end]);

  return (
    <MotionSpan ref={ref} {...delegated}>
      {rounded}
    </MotionSpan>
  );
}

export default Counter;
