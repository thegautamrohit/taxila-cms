import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import styles from "./Editor.module.css";

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [convertedContent, setConvertedContent] = useState(null);

  console.log(convertedContent);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <>
      <div className={styles.App}>
        <header className={styles.App_header}>Rich Text Editor Example</header>
        <Editor
          defaultEditorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName={styles.wrapper_class}
          editorClassName={styles.editor_class}
          toolbarClassName={styles.toolbar_class}
        />
      </div>

      <div
        className={styles.preview}
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      ></div>
    </>
  );
};
export default TextEditor;
