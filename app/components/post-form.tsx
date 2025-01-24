import { 
  useFetcher,
  useRevalidator
} from "@remix-run/react";
import { useEffect } from "react";

import { useRichText } from "~/contexts/rich-text-context";

export interface PostFormProps {
  id: any;
  limit: number;
}

const PostForm: React.FC<PostFormProps> = ({ id, limit  }) => {
  const fetcher = useFetcher();
  const { content, setContent, inputAlert, handleChange } = useRichText();
  const revalidator = useRevalidator();

  useEffect(() => {
    if (fetcher.state === "idle") {
      setContent('');
      revalidator.revalidate();
    }
  }, [fetcher.state]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <fetcher.Form key={id} action="/timeline/post" method="post" className="flex flex-col">
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

export default PostForm;