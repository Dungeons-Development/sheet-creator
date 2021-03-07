import { render } from 'react-dom';
import { Main } from './components/main.jsx';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import './sharedCss/global.scss'; // Globally applied CSS

window.global = window; // Provide 'global' for react-shadow

render(<Main />, document.getElementById('root'));
