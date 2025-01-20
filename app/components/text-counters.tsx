import { useRichText } from "~/contexts/rich-text-context";



const TextCounters = () => {
  const { textHandlers, textHandlerAlerts } = useRichText();
  console.log(textHandlers);
  return (
    <div className="flex flex-col">
      {textHandlers.map((handler) => (
        <p
          key={handler.id}
          className={`${
            textHandlerAlerts.includes(handler.id) ? "text-red-500" : "text-white"
          }`}
        >
          {handler.label}: {handler.activeCount}
        </p>
      ))}
    </div>
  );
};

export default TextCounters;