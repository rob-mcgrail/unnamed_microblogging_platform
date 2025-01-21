import { useRichText } from "~/contexts/rich-text-context";



const TextCounters = () => {
  const { textHandlers, textHandlerAlerts } = useRichText();
  textHandlers.sort((a, b) => a.priority - b.priority);
  textHandlers.sort((a, b) => a.visualPriority - b.visualPriority);

  const getRotation = (id: string) => {
    const hash = id
      .split("")
      .reduce((acc: any, char: string) => acc + char.charCodeAt(0), 0);
    return (hash % 5) - 2;
  };

  const colourMap = {
    core: {
      fore: 'text-white',
      border: 'border-blue-900'
    },
    letters: {
      fore: 'text-white',
      border: 'border-green-900'
    },
    words: {
      fore: 'text-white',
      border: 'border-teal-900'
    },
    infinity: {
      fore: 'text-yellow-300',
      border: 'border-yellow-200'
    },
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {textHandlers.map((handler: { id: string; class: keyof typeof colourMap; label: string; activeCount: number }) => (
        <p
          key={handler.id}
          className={`border-4 p-4 ${
            textHandlerAlerts.includes(handler.id)
              ? "border-red-500 text-red-500"
              : `${colourMap[handler.class].border} ${colourMap[handler.class].fore}`
          }`}
          style={{
            width: "auto", // Adjust to fit content
            display: "inline-block", // Shrink to fit content
            transform: `rotate(${getRotation(handler.id)}deg)`,
          }}
        >
          {handler.label}: {handler.activeCount}
        </p>
      ))}
    </div>
  );
};

export default TextCounters;