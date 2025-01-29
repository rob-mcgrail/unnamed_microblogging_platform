import {
  Outlet
} from "@remix-run/react";

import PostForm from "~/components/post-form";

export function Timeline() {  
  return (
    <div className="flex-1 bg-gray-900 p-4 flex flex-col">
      <PostForm limit={100} />
      <Outlet />
    </div>
  );
}

export default Timeline;