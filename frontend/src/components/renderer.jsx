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
      <div dangerouslySetInnerHTML={sanitizedHtml}></div>
      <style type="text/css">{shadowStyles.stylesheet}</style>
    </root.div>
  );
};

Renderer.propTypes = {
  options: PropTypes.object
};
