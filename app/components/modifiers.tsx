import { useEffect, useState } from "react";
import { useUser } from "~/contexts/user-context";

interface Modifier {
  identifier: string;
  emoji: string;
  name: string;
  description: string;
}

const ANIMATION_DURATION = 300; // Set your desired duration in ms

const Modifiers: React.FC = () => {
  const { modifiers, activeModifiers, setActiveModifiers } = useUser() as {
    modifiers: Modifier[];
    activeModifiers: string[];
    setActiveModifiers: React.Dispatch<React.SetStateAction<string[]>>;
  };
  const [animatedModifiers, setAnimatedModifiers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (activeModifiers.length > 0) {
      const newAnimatedModifiers = new Set(activeModifiers);
      setAnimatedModifiers(newAnimatedModifiers);

      // Remove active modifiers after animation ends
      const timer = setTimeout(() => {
        setActiveModifiers((prev: string[]) => {
          const updatedModifiers = prev.filter((id: string) => !newAnimatedModifiers.has(id));
          return updatedModifiers;
        });
        setAnimatedModifiers(new Set()); // Reset animations
      }, ANIMATION_DURATION);

      return () => clearTimeout(timer);
    }
  }, [activeModifiers, setActiveModifiers]);

  return (
    <div className="flex flex-col gap-3 pl-6 pr-6">
      {modifiers.map((modifier: Modifier) => {
        const isActive = animatedModifiers.has(modifier.identifier);
        
        return (
          <div 
            key={modifier.identifier} 
            className={`bg-gray-700 px-6 py-3 rounded-lg text-white w-full max-w flex justify-between text-base transition-all duration-200 ${
              isActive ? "bg-yellow-700" : ""
            }`}
          >
            <span className="font-medium">{modifier.emoji} {modifier.name}:</span>
            <span className="whitespace-nowrap truncate ml-4">{modifier.description}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Modifiers;
