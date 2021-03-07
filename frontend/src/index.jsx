import { render } from 'react-dom';
import { Main } from './components/main.jsx';

import './sharedCss/global.scss'; // Globally applied CSS

window.global = window; // Provide 'global' for react-shadow

render(<Main />, document.getElementById('root'));
