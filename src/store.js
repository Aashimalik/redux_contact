import { createStore, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import reducer from './reducer';
const logger = createLogger({
    collapsed:true
  });
 // Or wherever you keep your reducers

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(reducer,applyMiddleware(middleware,logger))

export { store, history };