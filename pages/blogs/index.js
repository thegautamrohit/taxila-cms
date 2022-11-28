import React from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../../src/components/Blogs/Blogs"), {
  ssr: false,
});

function index() {
  return (
    <div>
      <Editor />
    </div>
  );
}

export default index;
