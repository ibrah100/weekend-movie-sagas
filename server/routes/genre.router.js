const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/details/:id', (req, res) => {
  /*
  Add query to get all genres by using
  JOIN tables
  */
  const query = 
  `SELECT "genres"."name"
    FROM "genres"
    JOIN "movies_genres"
    ON "genres".id = "movies_genres"."genre_id"
    JOIN "movies"
    ON "movies_genres"."movie_id" = "movies"."id"
    WHERE "movies"."id" = $1;`;
  pool.query(query, [req.params.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('Error in getting movie in router', error);
      res.sendStatus(500);
    })
});

module.exports = router;