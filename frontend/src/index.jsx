import { render } from 'react-dom';
import { Main } from './components/main.jsx';

import './sharedCss/global.scss'; // Globally applied CSS

render(<Main />, document.getElementById('root'));
