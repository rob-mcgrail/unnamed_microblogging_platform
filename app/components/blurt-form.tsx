import { 
  useFetcher 
} from "@remix-run/react";
import { useEffect } from "react";

import { useRichText } from "~/contexts/rich-text-context";

export interface BlurtFormProps {
  id: any;
  limit: number;
}



const BlurtForm: React.FC<BlurtFormProps> = ({ id, limit  }) => {
  const fetcher = useFetcher();
  const { content, setContent, processContent, inputAlert, textHandlers, setTextHandlers} = useRichText();

  useEffect(() => {
    if (fetcher.state === "idle") {
      setContent('');
      setTextHandlers(textHandlers.map((handler) => {
        handler.persistentCount = handler.activeCount;
        return handler;
      }));
    }
  }, [fetcher.state]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    processContent(e.target.value);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <fetcher.Form key={id} action="/timeline" method="post" className="flex flex-col">
        <textarea
        className={`rounded-lg p-3 mb-3 resize-none focus:outline-none
          transition-all duration-300 ${
            inputAlert ? "bg-red-500" : "bg-gray-700"
          } text-white`}
          placeholder="What's happening?"
          name="content"
          rows={3}
          value={content}
          onChange={handleChange}
        />
        <p className={`${content.length > limit ? "text-red-500" : "text-white"}`}>
          {content.length}/{limit}
        </p>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 self-end"
        >
        POST
      </button>
    </fetcher.Form>
  </div>
  );
};

export default BlurtForm;