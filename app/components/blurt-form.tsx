import { 
  Form,
  useFetcher 
} from "@remix-run/react";
import type {
  ActionFunctionArgs,
} from "@remix-run/node";

export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log('HELLO', updates)
  return true;
};

const BlurtForm = () => {
  const fetcher = useFetcher();

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <fetcher.Form method="post" className="flex flex-col">
        <textarea
          className="bg-gray-700 text-white rounded-lg p-3 mb-3 resize-none focus:outline-none"
          placeholder="What's happening?"
          name="content"
          rows={3}
        />
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