import { useRichText } from "~/contexts/rich-text-context";
import TextCounter from "~/components/text-counter";

const TextCounters = () => {
  const { textHandlers } = useRichText();
  textHandlers.sort((a, b) => a.priority - b.priority);
  textHandlers.sort((a, b) => a.visualPriority - b.visualPriority);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {textHandlers.map((handler) => (
        <TextCounter handler={handler} key={handler.id} />
      ))}
    </div>
  );
};

export default TextCounters;