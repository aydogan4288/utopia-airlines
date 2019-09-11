var db = require("./db");

exports.getAllBookings = function(cb) {
  db.query("select * from mydb.booking", function(err, result) {
    cb(err, result);
  });
};
/*
booking_id, client_client_id, flight_flight_id, travel_agent_travel_agent_name, airline_counter_airline_counter_name
*/

exports.addBooking = function(booking, cb) {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query(
      "INSERT INTO mydb.booking (client_client_id, flight_flight_id, travel_agent_travel_agent_name, airline_counter_airline_counter_name) VALUES (?,?,?,?)",
      [
        booking.client_client_id,
        booking.flight_flight_id,
        booking.travel_agent_travel_agent_name,
        booking.airline_counter_airline_counter_name
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

exports.getBookingById = function(bookingId, cb) {
  db.query(
    "select * from mydb.booking where booking_id = ?",
    [bookingId],
    function(err, res) {
      cb(err, res);
    }
  );
};

exports.updateBooking = (booking, cb) => {
  db.beginTransaction(err => {
    if (err) cb(err, null);

    db.query(
      "update mydb.booking set client_client_id = ?, flight_flight_id = ?, travel_agent_travel_agent_name= ?, airline_counter_airline_counter_name = ? where booking_id = ?",
      [
        booking.client_client_id,
        booking.flight_flight_id,
        booking.travel_agent_travel_agent_name,
        booking.airline_counter_airline_counter_name,
        booking.booking_id
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

exports.removeBooking = (bookingId, cb) => {
  db.beginTransaction(err => {
    if (err) cb(err, null);

    db.query(
      "delete from mydb.booking where booking_id = ?",
      [bookingId],
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
