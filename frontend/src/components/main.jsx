import { useState } from 'react';
import styles from './main.scss';

import { TinyMCE } from './tinymce.jsx'
import { Renderer } from './renderer.jsx'

export const Main = () => {
  const [sheetHtml, setSheetHtml] = useState('<h1>Hi there!</h1><div>What are you up to?</div>');
  const [rendererOptions, setRendererOptions] = useState({});

  return (
    <div>
      <h2>Sheet Creator</h2>
      <TinyMCE />
      <Renderer html={sheetHtml} options={rendererOptions} />
    </div>
  );
};
