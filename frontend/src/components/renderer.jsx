import sanitizeHtml from 'sanitize-html';
import PropTypes from 'prop-types';

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

  console.log(html, sanitizedHtml);

  return (
    <div dangerouslySetInnerHTML={sanitizedHtml}></div>
  );
};

Renderer.propTypes = {
  options: PropTypes.object
};
