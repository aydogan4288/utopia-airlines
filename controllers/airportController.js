var routes = require("express").Router();
var airportDao = require("../dao/airportDao");

routes.get("/airport", (req, res) => {
  airportDao.getAllAirports((error, result) => {
    if (error) throw error;
    res.setHeader("Content-Type", "application/json");
    res.send(result);
  });
});

routes.post("/airport", (req, res) => {
  var airport = req.body;
  airportDao.addAirport(airport, (err, result) => {
    if (err) {
      res.status(400);
      res.send("Add Airport Failed!");
    }
    console.log(result);
    res.status(201);
    res.send("Add Airport Successful!");
  });
});

routes.get("/airport/:id", (req, res) => {
  airportDao.getAirportById(req.params.id, (error, result) => {
    if (error) throw error;
    res.setHeader("Content-Type", "application/json");
    res.send(result).end;
  });
});

routes.put("/airport", (req, res) => {
  var airport = req.body;
  airportDao.updateAirport(airport, (err, result) => {
    if (err) {
      res.status(400).end("Update airport failed");
      //res.send('Update author failed');
    } else {
      res.status(200).end("Update airport Successfull");
      //res.send('Author updated Successfully');
    }
  });
});

routes.delete("/airport/:id", (req, res) => {
  airportDao.removeAirport(req.params.id, (err, result) => {
    if (err) {
      res.writeHead(400);
      res.end("Delete airport Failed");
      //res.send('Delete Author Failed!').end;
    } else {
      res.send("Delete airport Successful!").end;
    }
    return;
  });
});
module.exports = routes;
