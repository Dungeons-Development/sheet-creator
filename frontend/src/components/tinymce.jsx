import { Editor } from '@tinymce/tinymce-react';
import { useCallback } from 'react'

export const TinyMCE = () => {
  const editorChange = useCallback(() => {
    console.log('changing')
  }, [])

  return (
    <Editor
      initialValue="<p>This is the initial content of the editor</p>"
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
      }}
      onEditorChange={editorChange}
    />
  );
}