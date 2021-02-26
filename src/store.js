import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import { favouriteReducer } from './reducers/favouriteReduer';

const rootreducers=combineReducers({favouriteReducer});
export const store=createStore(rootreducers,applyMiddleware(thunk));