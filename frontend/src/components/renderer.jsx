import root from 'react-shadow';
import sanitizeHtml from 'sanitize-html';
import PropTypes from 'prop-types';

import * as shadowStyles from './renderer-shadow.scss';

export const Renderer = (props) => {
  const {
    html,
    options
  } = props;

  const {
    
  } = options;

  const sanitizedHtml = {
    __html: sanitizeHtml(html)
  };

  return (
    <root.div>
      <div className="phb" dangerouslySetInnerHTML={sanitizedHtml}></div>
      <style type="text/css">{shadowStyles.stylesheet}</style>
      <link href="//use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://homebrewery.naturalcrit.com/homebrew/bundle.css"></link>
    </root.div>
  );
};

Renderer.propTypes = {
  options: PropTypes.object,
  html: PropTypes.string,
};
