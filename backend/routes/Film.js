const express = require("express");
const router = express.Router();
var connection = require('../connection');


router.get("/all-title", (req, res) => {
  connection.query("SELECT * FROM film", (err, result) => {
    if (err) {
      return res.json(err);
    }
    if (result) {
      const resp = res.json(result);
      return resp;
    }
  });
});

router.get("/find-film-date", (req, res) => {
  const day = req.query.day;
  connection.query(
    "SELECT film.filmId,film.titolo FROM film INNER JOIN spettacolo ON film.filmId = spettacolo.filmId WHERE spettacolo.giorno = ?",
    [day],
    (err, result) => {
      if (err) {
        return res.json(err);
      }
      if (result) {
        return res.json(result);
      }
    }
  );
});

router.get("/view-film", (req, res) => {
  const filmId = req.query.id;
  connection.query("SELECT * FROM film WHERE filmId = ?", [filmId], (err, result) => {
    if (err) {
      return res.json(`Riscontrato Errore`);
    }
    if (result) {
      return res.json(result);
    }
  });
});

router.get("/find-film-title", (req, res) => {
  const title = req.query.title;
  connection.query(
    "SELECT filmId,titolo FROM film WHERE INSTR(titolo,?)>0",
    [title],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(`Riscontrato Errore`);
      }
      if (result) {
        return res.json(result);
      }
    }
  );
});

module.exports = router;
