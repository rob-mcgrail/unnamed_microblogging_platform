import { useRichText } from "~/contexts/rich-text-context";
import { TextHandler } from "~/types";

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
    fore: 'text-yellow-500',
    border: 'border-yellow-500'
  },
}
export interface TextCounterProps {
  handler: TextHandler;
}

const TextCounter: React.FC<TextCounterProps> = ({ handler }) => {
  const { textHandlerActivity, textHandlerAlerts, content, setContent, handleChange } = useRichText();

  const getRotation = (id: string) => {
    const hash = id
      .split("")
      .reduce((acc: any, char: string) => acc + char.charCodeAt(0), 0);
    return (hash % 6) - 2;
  };

  const triggerHandleChange = (value: string) => {
    const fakeEvent = {
      target: { value },
    } as React.ChangeEvent<HTMLTextAreaElement>;

    setContent(fakeEvent.target.value);
    handleChange(fakeEvent);
  };

  const handleClick = () => {
    if (handler.class === "letters") {
      triggerHandleChange(content + handler.label);
    }
    if (handler.class === "words") {
      triggerHandleChange(content + handler.regex);
    }
    return;
  };

  const visualClass = handler.startCount === -1 ? 'infinity' : handler.class;

  return (
    <p
      key={handler.id}
      onClick={handleClick}
      className={`border-4 p-4 transition-all duration-300 ${
        textHandlerAlerts.includes(handler.id)
          ? "border-red-500 text-red-500"
          : `${colourMap[visualClass].border} ${colourMap[visualClass].fore}`
      } ${
        textHandlerActivity.includes(handler.id)
          ? "saturate-200 brightness-200"
          : "border-solid "
      } ${["letters", "words"].includes(handler.class) ? "cursor-pointer hover:underline hover:scale-105" : ""}`}
      style={{
        width: "auto", // Adjust to fit content
        display: "inline-block", // Shrink to fit content
        transform: `rotate(${getRotation(handler.id)}deg)`,
      }}
    >
      {handler.label}{handler.startCount != -1 && `: ${handler.activeCount}`}
    </p>
  );
};

export default TextCounter;