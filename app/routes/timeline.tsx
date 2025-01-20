
import type {
  ActionFunctionArgs,
} from "@remix-run/node";

import Blurts from "~/components/blurts";
import BlurtForm from "~/components/blurt-form";

import { exampleBlurts } from "~/data/test-data";

export function Timeline() {
  return (
    <div className="flex-1 bg-gray-900 p-4 flex flex-col">
      <BlurtForm limit={100} id={123} />
      <Blurts blurts={exampleBlurts} />
    </div>
  );
}

export default Timeline;

export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  return { updates };
};