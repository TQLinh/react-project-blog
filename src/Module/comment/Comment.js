import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import parse from "html-react-parser";
const Comment = () => {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <div>{parse(content)}</div>
      <Editor
        // apiKey="no-api-key"
        // tinymceScriptSrc={
        //   process.env.pedwqjdlwwed7v5u6ov9knjwrrl6yd2c61e1p7wthpw9tw6o +
        //   "/tinymce/tinymce.min.js"
        // }
        // onEditorChange={newText=>setContent(newText)}
        textareaName="content"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          selector: "textarea",
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
            "emoticons",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter" +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat image emoticons | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button
        onClick={log}
        className="p-2 text-xl font-bold text-white bg-pink-400 rounded-md"
      >
        Send
      </button>
    </>
  );
};

export default Comment;
