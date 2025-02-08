import React, { useEffect, useState } from "react";
import { Event } from "~/types";

interface MoneyCountProps {
  money: number;
  events: Event[];
  onComplete?: () => void; // Optional callback when animation finishes
}

const Posts: React.FC<MoneyCountProps> = ({ money, events, onComplete }) => {
  const [displayedMoney, setDisplayedMoney] = useState(parseInt(money as unknown as string));

  useEffect(() => {
    let start = parseInt(displayedMoney as unknown as string);
    let end = money;
    let duration = 500; // 0.5 seconds
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setDisplayedMoney(Math.floor(start + (end - start) * progress));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayedMoney(end);
        if (onComplete) onComplete();
      }
    };

    if (start !== end) {
      requestAnimationFrame(step);
    }
  }, [money]); // Run effect when `money` changes

  return (
    <div className="py-4">
      <p className="text-2xl text-yellow-500 font-bold mb-4">💵 ${displayedMoney}</p>
    </div>
  );
};

export default Posts;
