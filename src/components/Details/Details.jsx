import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function Details () {
    
    const history = useHistory();
    
    // reducer for genres for movie selected
    const genres = useSelector(store => store.genres);
    // reducer for full movie details
    const details = useSelector(store => store.details);
    
    // map function to render list of genres from genre Array
    const genreList = genres.map((genre, i) => {
        return (
            <h5 key={i}>{genre.name}</h5>
        )
    })


    return (
            <div>

                <div key = {details.id}>
                    <h2>{details.title}</h2>
                    <h3>Genres:</h3>
                        {genreList}
                    <div>
                        <img src ={details.poster}/>
                        <p>{details.description}</p>
                    </div>
                    <header>
                        <button onClick={ () => history.push('/')}>GO BACK</button>
                    </header>
                    
                </div>
            </div>
    )
}

export default Details;