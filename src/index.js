import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/style.css';
import '../src/assets/css/placeholder-loading.min.css'
import '../src/assets/css/fontawesome.css';
import '../src/assets/css/animate.min.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.register();
