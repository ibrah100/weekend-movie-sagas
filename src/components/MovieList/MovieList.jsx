import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

function MovieList() {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    // on render, load movies from database
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    // handleClick function to go to the details page
    const viewDetails= (movie) =>{
        // Using two dispatches to talk to
        dispatch({ 
            type: 'SET_DETAILS', 
            payload: movie 
        })
        dispatch({ 
            type: 'GET_MOVIE', 
            payload: {id: movie.id}
        })
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