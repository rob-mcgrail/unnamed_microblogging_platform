import { 
  useFetcher 
} from "@remix-run/react";
import { useEffect, useRef } from "react";

import { useRichText } from "~/contexts/rich-text-context";

export interface BlurtFormProps {
  id: any;
  limit: number;
}



const BlurtForm: React.FC<BlurtFormProps> = ({ id, limit  }) => {
  const fetcher = useFetcher();
  const { content, setContent } = useRichText();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (fetcher.state === "idle") {
      formRef.current?.reset();
      setContent('');
    }
  }, [fetcher.state]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setContent(e.target.value); // Update context content
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <fetcher.Form  key={id} action="/timeline" method="post" className="flex flex-col">
        <textarea
          className="bg-gray-700 text-white rounded-lg p-3 mb-3 resize-none focus:outline-none"
          placeholder="What's happening?"
          name="content"
          rows={3}
          value={content}
          onChange={handleChange}
        />
        <p>{content.length}/{limit}</p>
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