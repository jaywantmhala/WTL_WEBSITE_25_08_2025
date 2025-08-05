import { useState, useEffect, useRef } from 'react';

export const useIntersectionCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            let startTime: number;
            let animationFrameId: number;

            const animate = (currentTime: number) => {
              if (!startTime) startTime = currentTime;
              const progress = currentTime - startTime;
              const percentage = Math.min(progress / duration, 1);

              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
              const currentCount = Math.floor(end * easeOutQuart);
              setCount(currentCount);

              if (percentage < 1) {
                animationFrameId = requestAnimationFrame(animate);
              }
            };

            animationFrameId = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(animationFrameId);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when at least 10% of the element is visible
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [end, duration, hasStarted]);

  return { count, elementRef };
}; 