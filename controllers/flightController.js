var routes = require("express").Router();
var flightDao = require("../dao/flightDao");

routes.get("/flight", (req, res) => {
  flightDao.getAllFlights((error, result) => {
    if (error) throw error;
    res.setHeader("Content-Type", "application/json");
    res.send(result);
  });
});

routes.post("/flight", (req, res) => {
  var flight = req.body;
  flightDao.addFlight(flight, (err, result) => {
    if (err) {
      res.status(400);
      res.send("Add Flight Failed!");
    }
    console.log(result);
    res.status(201);
    res.send("Add Flight Successful!");
  });
});

routes.get("/flight/:id", (req, res) => {
  flightDao.getFlightById(req.params.id, (error, result) => {
    if (error) throw error;
    res.setHeader("Content-Type", "application/json");
    res.send(result).end;
  });
});

routes.put("/flight", (req, res) => {
  var flight = req.body;
  flightDao.updateFlight(flight, (err, result) => {
    if (err) {
      res.status(400).end("Update flight failed");
      //res.send('Update author failed');
    } else {
      res.status(200).end("Update flight Successfull");
      //res.send('Author updated Successfully');
    }
  });
});

routes.delete("/flight/:id", (req, res) => {
  flightDao.removeFlight(req.params.id, (err, result) => {
    if (err) {
      res.writeHead(400);
      res.end("Delete flight Failed");
      //res.send('Delete Author Failed!').end;
    } else {
      res.send("Delete flight Successful!").end;
    }
    return;
  });
});
module.exports = routes;
