import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const EditorPage = () => {
   const [editorData, setEditorData] = useState<string>('');

   return (
      <Grid container spacing={3}>
         <Grid item xs={12}>
            <h2>Editor</h2>
         </Grid>
         <Grid item xs={12} md={8} lg={9}>
            <Paper
               sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
               }}
            >
               <CKEditor
                  editor={Editor}
                  data={editorData}
                  onReady={(editor: any) => {
                     // editor.setStyle();
                  }}
                  onChange={(event: any, editor: any) => {
                     const data = editor.getData();
                     setEditorData(data);
                     console.log(data);
                  }}
                  // onBlur={(event, editor) => {
                  //    console.log('Blur.', editor);
                  // }}
                  // onFocus={(event, editor) => {
                  //    console.log('Focus.', editor);
                  // }}
               />
            </Paper>
         </Grid>
         <style jsx>
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
      </Grid>
   );
};

export default EditorPage;
