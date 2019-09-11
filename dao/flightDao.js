var db = require("./db");

exports.getAllFlights = function(cb) {
  db.query("select * from mydb.flight", function(err, result) {
    cb(err, result);
  });
};

exports.addFlight = function(flight, cb) {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query(
      "INSERT INTO mydb.flight (flight_id, flight_dep_time, flight_des_time, airport_dep_code, airport_des_code, airplane_airplane_id, flight_price) VALUES (?,?,?,?,?,?,?)",
      [
        flight.flight_id,
        flight.flight_dep_time,
        flight.flight_des_time,
        flight.airport_dep_code,
        flight.airport_des_code,
        flight.airplane_airplane_id,
        flight.flight_price
      ],
      function(err, result) {
        if (err) {
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

exports.getFlightById = function(flightId, cb) {
  db.query(
    "select * from mydb.flight where flight_id = ?",
    [flightId],
    function(err, res) {
      cb(err, res);
    }
  );
};

exports.updateFlight = (flight, cb) => {
  db.beginTransaction(err => {
    if (err) cb(err, null);

    db.query(
      "update mydb.flight set flight_dep_time = ?, flight_des_time = ?, airport_dep_code =?, airport_des_code =?, airplane_airplane_id = ?, flight_price = ? where flight_id = ?",
      [
        flight.flight_dep_time,
        flight.flight_des_time,
        flight.airport_dep_code,
        flight.airport_des_code,
        flight.airplane_airplane_id,
        flight.flight_price,
        flight.flight_id
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

exports.removeFlight = (flightId, cb) => {
  db.beginTransaction(err => {
    if (err) cb(err, null);

    db.query(
      "delete from mydb.flight where flight_id = ?",
      [flightId],
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
