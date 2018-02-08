import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import {  routerReducer, routerMiddleware, push } from 'react-router-redux'



  const todos = (state=0, action) => {
    switch (action.type) {
        case 'INCREMENT':
          return state + 1
        case 'DECREMENT':
          return state - 1
        default:
          return state
        }
  };


const reducer=combineReducers({
    todos,
    form: formReducer,
    router: routerReducer
})


export default reducer;
