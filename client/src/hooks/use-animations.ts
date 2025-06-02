import { useState, useEffect } from 'react';

export function useAnimations() {
  const [counters, setCounters] = useState<{ [key: string]: number }>({});

  const animatedCounter = (target: number, key?: string) => {
    const counterKey = key || target.toString();
    
    useEffect(() => {
      if (counters[counterKey] === target) return;

      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [counterKey]: Math.floor(current) }));
      }, 20);

      return () => clearInterval(timer);
    }, [target, counterKey]);

    return counters[counterKey] || 0;
  };

  const useScrollReveal = (threshold = 0.1) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold }
      );

      return () => observer.disconnect();
    }, [threshold]);

    return isVisible;
  };

  return {
    animatedCounter,
    useScrollReveal,
  };
}
