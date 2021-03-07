import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';

/* eslint arrow-body-style: 0 */
export const TinyMCE = ({ html, setHtml }) => {
  return (
    <div>
      <button>HTML</button>
      <Editor
        initialValue={html}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount code',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | '
            + 'alignleft aligncenter alignright alignjustify | '
            + 'bullist numlist outdent indent | removeformat | help | code',
        }}
        onEditorChange={setHtml}
      />
    </div>
  );
};

TinyMCE.propTypes = {
  html: PropTypes.string,
  setHtml: PropTypes.func,
};
