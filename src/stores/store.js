import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from "../reducers/authReducer";
import movieReducer from "../reducers/movieReducer";
import foodReducer from "../reducers/foodReducer";
import cartReduceres from "../reducers/cartReduceres";
const middlewares = [thunk];


if (process.env.NODE_ENV === 'development') {    // if we are in develop mode
    const { logger } = require('redux-logger');

    middlewares.push(logger);
}

const store = createStore(
    combineReducers( {
        auth: authReducer,
        movie: movieReducer,
        food: foodReducer,
        charity: cartReduceres
    }),
    applyMiddleware(
        ...middlewares
    )
);

export default store;
