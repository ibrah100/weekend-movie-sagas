import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('GET_MOVIE', getMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        
        yield put({ 
            type: 'SET_MOVIES', 
            payload: movies.data 
        });

    } catch {
        console.log('get all error');
    }
        
}

function* getMovie(action) {
    try {
        // using unique id from action payload to retrieve specific movie details
        // from database 
        const movieId = yield axios.get(`/api/genre/details/${action.payload.id}`);
        
        console.log("here are the genres for this movie:", movieId.data)
        
        // sends movies genre data to MovieList.jsx to be displayed on page
        yield put ({
            type:'SET_GENRES', 
            payload: movieId.data
        });
    }
    catch(error){
        console.log('Error in getMovie function in index.js:', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store details on rendering for details component
const details = (state = {}, action) => {
    if (action.type === 'SET_DETAILS') {
        return action.payload;
    } 
    return state;
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
