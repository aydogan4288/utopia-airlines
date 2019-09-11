var routes = require("express").Router();
var bookingDao = require("../dao/bookingDao");

routes.get("/booking", function(req, res) {
  bookingDao.getAllBookings(function(error, result) {
    if (error) throw error;
    res.setHeader("Content-Type", "application/json");
    res.send(result);
  });
});

routes.post("/booking", (req, res) => {
  var booking = req.body;
  bookingDao.addBooking(booking, (err, result) => {
    if (err) {
      res.status(400);
      res.send("Add booking Failed!");
    }
    console.log(result);
    res.status(201);
    res.send("Add booking Successful!");
  });
});

routes.get("/booking/:id", (req, res) => {
  bookingDao.getBookingById(req.params.id, (error, result) => {
    if (error) throw error;
    res.setHeader("Content-Type", "application/json");
    res.send(result).end;
  });
});

routes.put("/booking", (req, res) => {
  var booking = req.body;
  bookingDao.updateBooking(booking, (err, result) => {
    if (err) {
      res.status(400).end("Update booking failed");
      //res.send('Update author failed');
    } else {
      res.status(200).end("Update booking Successfull");
      //res.send('Author updated Successfully');
    }
  });
});

routes.delete("/booking/:id", (req, res) => {
  bookingDao.removeBooking(req.params.id, (err, result) => {
    if (err) {
      res.writeHead(400);
      res.end("Delete booking Failed");
      //res.send('Delete Author Failed!').end;
    } else {
      res.send("Delete booking Successful!").end;
    }
    return;
  });
});

module.exports = routes;
