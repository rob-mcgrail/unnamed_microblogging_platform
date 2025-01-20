
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import Blurts from "~/components/blurts";
import BlurtForm from "~/components/blurt-form";
import { useRichText } from "~/contexts/rich-text-context";

import { exampleBlurts } from "~/data/test-data";

export function Timeline() {
  return (
    <div className="flex-1 bg-gray-900 p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-4">Right Panel</h1>
      <BlurtForm limit={100} id={123} />
      <Blurts blurts={exampleBlurts} />
    </div>
  );
}

export default Timeline;

export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  return redirect(`/timeline?1`);
};