const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/details/:id', (req, res) => {
  /*
  Added query to target specific genres by id 
  by first using JOIN to establish connection between
  the movies and specific genres, then WHERE is used to
  determine the genre with the unique movie id
  */
  const uniqueMovieId = req.params.id;
  
  const query = 
  `SELECT "genres"."name"
    FROM "genres"
    JOIN "movies_genres"
    ON "genres".id = "movies_genres"."genre_id"
    JOIN "movies"
    ON "movies_genres"."movie_id" = "movies"."id"
    WHERE "movies"."id" = $1;`;

  pool.query(query, [uniqueMovieId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('Error in getting movie in router', error);
      res.sendStatus(500);
    })
});

module.exports = router;