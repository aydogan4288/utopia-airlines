var db = require("./db");

exports.getAllAirports = function(cb) {
  db.query("select * from mydb.airport", function(err, result) {
    cb(err, result);
  });
};

exports.addAirport = function(airport, cb) {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query(
      "insert into mydb.airport(airport_code, airport_city_name, airport_country_name) values(?,?,?)",
      [
        airport.airport_code,
        airport.airport_city_name,
        airport.airport_country_name
      ],
      function(err, result) {
        if (
          err ||
          result.affectedRows == 0 ||
          !airport.airport_code ||
          !airport.airport_city_name ||
          !airport.airport_country_name
        ) {
          db.rollback(function(err, res) {
            cb("erorr", res);
          });
        } else {
          console.log(result);
          db.commit(function(err, res) {
            console.log(res);

            cb(err, res, result);
          });
        }
      }
    );
  });
};

exports.getAirportById = function(airportId, cb) {
  db.query(
    "select * from mydb.airport where airport_code = ?",
    [airportId],
    function(err, res) {
      cb(err, res);
    }
  );
};

exports.updateAirport = (airport, cb) => {
  db.beginTransaction(err => {
    if (err) cb(err, null);

    db.query(
      "update mydb.airport set airport_city_name = ?, airport_country_name = ? where airport_code = ?",
      [
        airport.airport_city_name,
        airport.airport_country_name,
        airport.airport_code
      ],
      (err, res) => {
        if (err || res.affectedRows == 0) {
          db.rollback((err, res) => {
            //sequalizer
            cb("erorr", res); //need to look it
          });
        } else {
          db.commit((err, res) => {
            cb(err, res);
          });
        }
      }
    );
  });
};

exports.removeAirport = (airportId, cb) => {
  db.beginTransaction(err => {
    if (err) cb(err, null);

    db.query(
      "delete from mydb.airport where airport_code = ?",
      [airportId],
      (err, res) => {
        if (err || res.affectedRows == 0) {
          db.rollback((err, res) => {
            cb("erorr", res);
          });
        } else {
          db.commit((err, res) => {
            cb(err, res);
          });
        }
      }
    );
  });
};
