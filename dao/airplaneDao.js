var db = require("./db");

exports.getAllAirplanes = function(cb) {
  db.query("select * from mydb.airplane", function(err, result) {
    cb(err, result);
  });
};

exports.addAirplane = function(airplane, cb) {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query(
      "insert into mydb.airplane(airplane_model, capacity) values(?,?)",
      [airplane.airplane_model, airplane.capacity],
      function(err, result) {
        if (
          err ||
          result.affectedRows == 0 ||
          !airplane.airplane_model ||
          !airplane.capacity
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

exports.getAirplaneById = function(airplaneId, cb) {
  db.query(
    "select * from mydb.airplane where airplane_id = ?",
    [airplaneId],
    function(err, res) {
      cb(err, res);
    }
  );
};

exports.updateAirplane = (airplane, cb) => {
  db.beginTransaction(err => {
    if (err) cb(err, null);

    db.query(
      "update mydb.airplane set airplane_model = ?, capacity = ? where airplane_id = ?",
      [airplane.airplane_model, airplane.capacity, airplane.airplane_id],
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

exports.removeAirplane = (airplaneId, cb) => {
  db.beginTransaction(err => {
    if (err) cb(err, null);

    db.query(
      "delete from mydb.airplane where airplane_id = ?",
      [airplaneId],
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
