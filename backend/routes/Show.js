const express = require("express");
const router = express.Router();
var connection = require("../connection");

router.get("/get-show", (req, res) => {
  const filmId = req.query.id;
  connection.query(
    "SELECT spettacoloId , giorno , ora , titolo , sala FROM spettacolo INNER JOIN film ON film.filmId = spettacolo.filmId WHERE spettacolo.filmId = ? ",

    [filmId],

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

router.get("/get-show-by-showId", (req, res) => {
  const showId = req.query.showId;
  connection.query(
    "SELECT spettacoloId , giorno , ora , titolo , sala FROM spettacolo INNER JOIN film ON film.filmId = spettacolo.filmId WHERE spettacolo.spettacoloId = ? ",

    [showId],

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

router.post("/new-show", (req, res) => {
  console.log(req.body);
  const filmId = req.body.newshow.filmId;
  const day = req.body.newshow.day;
  const time = req.body.newshow.time;
  const room = req.body.newshow.room;
  const duration = req.body.newshow.duration;
  connection.query(
    "SELECT spettacolo.ora , film.durata FROM spettacolo INNER JOIN film ON film.filmId = spettacolo.filmId WHERE giorno = ? AND sala = ?",
    [day, room],
    (err, result) => {
      if (err) {
        return res.json(`Riscontrato Errore`);
      }
      if (result) {
        const min_new_time =
          Number(time.split(":")[0]) * 60 + Number(time.split(":")[1]);
        const max_new_time =
          Number(time.split(":")[0]) * 60 +
          Number(time.split(":")[1]) +
          Number(duration.split(":")[0] * 60) +
          Number(duration.split(":")[1]);
        let max_time;
        let min_time;
        console.log("max_new_time");
        console.log(max_new_time);
        console.log(min_new_time);
        let JSONresult = Object.values(JSON.parse(JSON.stringify(result)));
        JSONresult.map((JSONres) => {
          const min_time =
            Number(JSONres.ora.split(":")[0] * 60) +
            Number(JSONres.ora.split(":")[1]);
          const max_time =
            Number(JSONres.ora.split(":")[0] * 60) +
            Number(JSONres.ora.split(":")[1]) +
            Number(JSONres.durata.split(":")[0] * 60) +
            Number(JSONres.durata.split(":")[1]);
          if (
            (min_new_time < min_time && max_new_time > min_time) ||
            (min_new_time < max_time && max_new_time > max_time) ||
            (min_new_time > min_time && max_new_time < max_time)
          ) {
            return res
              .status(201)
              .send("sala occupata, scegliere altra data o sala");
          }
        });
        
        connection.query(
          "INSERT	INTO spettacolo(filmId, giorno, ora, sala) VALUE(?,?,?,?)",
          [filmId,day,time,room],
          (err1, result1) => {
            if(err1)
            {
              return res.status(418).send(err1.message)
            }
            if(result1){
              return res.status(200).send('spettacolo inserito con successo')
            }
          })
      }
    }
  );

  // connection.query(
  //   "INSERT	INTO spettacolo(filmId, giorno, ora, sala) VALUE(?,?,?,?)",
  //   [filmId, day, time, room],
  //   (err, result) => {
  //     if (err) {
  //       return res.json(`Riscontrato Errore`);
  //     }
  //     if (result) {
  //       return res.json(result);
  //     }
  //   }
  // );
});

router.post("/list-show", (req, res) => {
  const start = req.body.start;
  const end = req.body.end;
  console.log("a");
  console.log(start);
  console.log(end);
  connection.query(
    "SELECT spettacolo.spettacoloId , spettacolo.giorno , spettacolo.ora , spettacolo.sala , film.titolo , film.durata FROM spettacolo INNER JOIN film ON spettacolo.filmId = film.filmId WHERE spettacolo.giorno >= ? AND spettacolo.giorno <= ? AND giorno > CURDATE()",
    [start, end],

    (err, result) => {
      if (err) {
        return res.json(`Riscontrato Errore`);
      }
      if (result) {
        console.log(result);
        return res.json(result);
      }
    }
  );
});

module.exports = router;
