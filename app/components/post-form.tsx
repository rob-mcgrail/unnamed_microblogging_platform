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
    if (fetcher.state === "submitting") {
      setContent('');
      revalidator.revalidate();
    }
    if (fetcher.state === "idle") {
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
          disabled={fetcher.state === "submitting" || content.length < 1}
          className={`bg-blue-500 text-white py-2 px-4 rounded-lg self-end ${
            fetcher.state === "submitting" ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {fetcher.state === "submitting" ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              ...
            </div>
          ) : (
            "Post"
          )}
        </button>
    </fetcher.Form>
  </div>
  );
};

export default PostForm;