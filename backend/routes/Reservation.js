const express = require("express");
const router = express.Router();
var connection = require("../connection");

router.get("/get-seat", (req, res) => {
  const showId = req.query.showId;
  connection.query(
    "SELECT numposto FROM posto WHERE spettacoloId = ?",
    [showId],

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

router.post("/create-reservation", (req, res) => {
  const showId = req.body.showId;
  const userId = req.body.userId;
  const seat = req.body.seat;

  let sql = `SELECT COUNT(numposto) AS isfree FROM posto WHERE `;
  for (let i = 0; i < seat.length - 1; i++) {
    sql = sql + `numposto = '${seat[i]}' OR `;
  }
  sql = sql + `numposto = '${seat[seat.length - 1]}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(418).send(err.message);
    }
    if (result) {
      const ress = Object.values(JSON.parse(JSON.stringify(result)));

      if (ress[0].isfree == 0) {
        connection.query(
          "INSERT INTO prenotazione (userId,spettacoloId) VALUES(?,?)",
          [userId, showId],
          (err, result1) => {
            if (err) {
              return res.status(418).send(err.message);
            }
            if (result1) {
              connection.query(
                "SELECT LAST_INSERT_ID() AS prenotazioneId",
                (err, result2) => {
                  if (err) {
                    return res.status(418).send(err.message);
                  }
                  if (result2) {
                    const ress = Object.values(
                      JSON.parse(JSON.stringify(result2))
                    );

                    const prenotazioneId = ress[0].prenotazioneId;

                    let sqlseat =
                      "INSERT INTO posto (spettacoloId,userId,numposto,prenotazioneId) VALUE";
                    if (seat.length > 1)
                      for (let i = 0; i < seat.length - 1; i++) {
                        sqlseat =
                          sqlseat +
                          `(${showId} , ${userId} , '${seat[i]}',${prenotazioneId}),`;
                      }
                    sqlseat =
                      sqlseat +
                      `(${showId} , ${userId} ,'${
                        seat[seat.length - 1]
                      }',${prenotazioneId})`;

                    connection.query(sqlseat, (err, result) => {
                      if (err) {
                        return res
                          .status(418)
                          .send("error: during insert element");
                      }
                      if (result) {
                        return res
                          .status(200)
                          .send("reservation has been made");
                      }
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  });
});


router.post("/get-user-reservation", (req, res) => {
  const userId = req.body.userId;
  connection.query(
    "SELECT prenotazione.prenotazioneId , posto.numposto , film.titolo , spettacolo.giorno , spettacolo.ora FROM posto INNER JOIN prenotazione  ON prenotazione.prenotazioneId = posto.prenotazioneId INNER JOIN spettacolo ON prenotazione.spettacoloId = spettacolo.spettacoloId INNER JOIN film ON film.filmId = spettacolo.filmId WHERE prenotazione.userId = ?"
    ,[userId],

    (err, result) => {
      if (err) {
        return res.status(418).send(`Riscontrato Errore`);
      }
      if (result) {
        return res.status(200).send(result);
      }
    }
  );
});




router.post("/delete-user-reservation", (req, res) => {
  const prenotazioneId = req.body.prenotazioneId;
  connection.query(
    "DELETE FROM prenotazione WHERE prenotazioneId = ?"
    ,[prenotazioneId],
    (err, result) => {
      if (err) {
        return res.status(418).send(`Riscontrato Errore`);
      }
      if (result) {
        connection.query(
          "DELETE FROM posto WHERE prenotazioneId = ?"
          ,[prenotazioneId],
          (err, result1) => {
            if (err) {
              return res.status(418).send(`Riscontrato Errore`);
            }
            if (result1) {
              return res.status(200).send('operazione eseguita');
            }
          }
        );
      }
    }
  );
});


module.exports = router;
