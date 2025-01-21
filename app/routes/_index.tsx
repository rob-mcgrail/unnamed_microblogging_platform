import { redirect } from "@vercel/remix";

export async function loader() {
  return redirect("/timeline");
}
