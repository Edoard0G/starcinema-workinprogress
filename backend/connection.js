var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "i54jns50s3z6gbjt.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
    user: "a7bjizvtale1f4te",
    password: "hw8dn3y7xgndilhp",
    database: "xh77nrfmvuc70nv9",
  });

module.exports = connection;