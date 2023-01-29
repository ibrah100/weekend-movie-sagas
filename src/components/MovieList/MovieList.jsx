import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

function MovieList() {
    
    const history = useHistory();
    const dispatch = useDispatch();

    // getting movies list from redux reducer to be used in component
    const movies = useSelector(store => store.movies);

    // on render, load movies from database
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    // onClick function to go to the details page
    const viewDetails= (movie) =>{
        // Using two dispatches to talk to sagas in index.js
        
        // gathers details and stores them in a reducer to be used in Details.jsx
        dispatch({ 
            type: 'SET_DETAILS', 
            payload: movie 
        })

        // activates getMovie function that get unique id to pull details for movie selected
        dispatch({ 
            type: 'GET_MOVIE', 
            payload: {id: movie.id}
        })
        // useHistory to go to details page for movie
        history.push(`/details`);
    }

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img 
                            src={movie.poster} 
                            alt={movie.title}
                            onClick={() => viewDetails(movie)}
                            />
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;