const express = require("express");
const router = express.Router();
var connection = require('../connection');


router.post("/new-comment", (req, res) => {
  const filmId = req.body.filmId;
  const userId = req.body.userId;
  const vote = req.body.vote;
  const comment = req.body.comment;

  connection.query(
    "INSERT	INTO comment(filmId, userId, vote, comment) VALUE(?,?,?,?)",
    [filmId, userId, vote, comment],
    (err, result) => {
      if (err) {
        return res.json(`Riscontrato Errore`);
      }
      if (result) {
        return res.json(result);
      }
    }
  );
});

router.get("/list-comment", (req, res) => {
  const Id = req.query.id;

  connection.query(
    "SELECT commenti.commentoId , commenti.vote , commenti.comment , user.username FROM commenti INNER JOIN user ON commenti.userId = user.userId WHERE commenti.filmId = ?",
    [Id],
    (err, result) => {
      if (err) {
        return res.json(`Riscontrato Errore`);
      }
      if (result) {
        return res.json(result);
      }
    }
  );
});

module.exports = router;
