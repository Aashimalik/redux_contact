import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';

import { store ,history } from './store';
import registerServiceWorker from './registerServiceWorker';



// render(<App />, document.getElementById('root'));   


ReactDOM.render(
    <Provider store={store}>
    <App history={history}/>
    </Provider >, 
    document.getElementById('root'));

registerServiceWorker();
