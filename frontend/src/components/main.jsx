import { useState } from 'react';
import styles from './main.scss';

import { TinyMCE } from './tinymce.jsx';
import { Renderer } from './renderer.jsx';

/* eslint arrow-body-style: 0 */
export const Main = () => {
  /* eslint no-unused-vars: 0 */
  const [sheetHtml, setSheetHtml] = useState('<h1>Hi there!</h1><div>What are you up to?</div>');
  const [rendererOptions, setRendererOptions] = useState({});

  return (
    <div>
      <h2>Sheet Creator</h2>
      <TinyMCE html={sheetHtml} setHtml={setSheetHtml} />
      <Renderer html={sheetHtml} options={rendererOptions} />
    </div>
  );
};
