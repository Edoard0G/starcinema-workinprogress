const express = require("express");
const router = express.Router();
var connection = require("../connection");
// const bcrypt = require("bcrypt");

const saltRound = 10;

// router.post("/signup", (req, res) => {
//   const username = req.body.username;
//   const email = req.body.email;
//   const password = req.body.password;
//   bcrypt.hash(password, saltRound, (err, hashedPassword) => {
//     if (err) {
//       res.status(418).send(`Couldn't hash password...`);
//     } else {
//       connection.query(
//         "INSERT	INTO user(username, password, email) VALUE(?,?,?)",
//         [username, hashedPassword, email],
//         (err, result) => {
//           if (err) {
//             res.status(418).send(`Couldnt register user`);
//           } else {
//             res.send(result.json());
//           }
//         }
//       );
//     }
//   });
// });

router.post("/signup", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  connection.query(
    "INSERT	INTO user(username, password, email) VALUE(?,?,?)",
    [username, password, email],
    (err, result) => {
      if (err) {
        res.status(418).send(`Couldnt register user`);
      } else {
        res.send(result);
      }
    }
  );
});

// router.get("/signin", (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   connection.query(
//       "SELECT * FROM user WHERE username = ?",
//     [username],
//     (err, result) => {
//       if (err) {
//         res.status(418).send(`Error`);
//       } else if (result.length < 1) {
//         res.status(418).send(`Username doesn't match`);
//       } else {
//         bcrypt.compare(password, result[0].password, (errr, match) => {
//           if(errr){
//             res.send(errr.message)
//           }else{
//           if (match) {
//             res.status(200).send(result[0].username,result[0].userId,result[0].email,result[0].role);
//           }
//           if (!match) {
//             res.status(418).send(`Password doesn't match`);
//           }
//         }
//         });
//       }
//     }
//   );
// });

router.post("/signin", (req, res) => {
  // const username = req.query.username;
  // const password = req.query.password;
  const username = req.body.username;
  const password = req.body.password;
  connection.query(
    "SELECT * FROM user WHERE username = ? AND password = ? ",
    [username, password],
    (err, result) => {
      if (err) {
        return res.status(418).send("Error");
      } else if (result.length < 1) {
        return res.status(201).send(`Username or Pasword doesn't match`);
      } else {
        return res.send(result[0]);
      }
    }
  );
});

module.exports = router;
