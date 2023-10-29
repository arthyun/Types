import React, { useState } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import { Editor } from "ckeditor5-custom-build/build/ckeditor";
// import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";

const SUB2 = () => {
   const [editorData, setEditorData] = useState<string>("");

   return (
      <div>
         SUB2 Page
         <div
            className="template"
            id="editorDiv"
         >
            {/* <CKEditor
               editor={Editor}
               // data={editorData}
               data={editorData}
               onChange={(event, editor) => {
                  console.log(editor);
                  const data = editor.getData();
                  // setEditorData(data);
               }}
               // onReady={(editor) => {
               //    // 에디터 읽기 전용 모드로
               //    editor.enableReadOnlyMode("feature-id");
               //    const toolbarElement = editor.ui.view.toolbar.element;
               //    toolbarElement.style.display = "none";
               // }}
            /> */}
         </div>
         <style>
            {`
               .ck-editor__editable {
                  max-height: 500px;
               }
               figure.table.ck-widget_with-selection-handle {
                  width: 100% !important;
                  float: none !important;
               }
            `}
         </style>
      </div>
   );
};

export default SUB2;
