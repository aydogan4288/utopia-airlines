var routes = require("express").Router();
var airplaneDao = require("../dao/airplaneDao");

routes.get("/airplane", (req, res) => {
  airplaneDao.getAllAirplanes((error, result) => {
    if (error) throw error;
    res.setHeader("Content-Type", "application/json");
    res.send(result);
  });
});

routes.post("/airplane", (req, res) => {
  var airplane = req.body;
  airplaneDao.addAirplane(airplane, (err, result) => {
    if (err) {
      res.status(400);
      res.send("Add Airplane Failed!");
    }
    console.log(result);
    res.status(201);
    res.send("Add Airplane Successful!");
  });
});

routes.get("/airplane/:id", (req, res) => {
  airplaneDao.getAirplaneById(req.params.id, (error, result) => {
    if (error) throw error;
    res.setHeader("Content-Type", "application/json");
    res.send(result).end;
  });
});

routes.put("/airplane", (req, res) => {
  var airplane = req.body;
  airplaneDao.updateAirplane(airplane, (err, result) => {
    if (err) {
      res.status(400).end("Update airplane failed");
      //res.send('Update author failed');
    } else {
      res.status(200).end("Update airplane Successfull");
      //res.send('Author updated Successfully');
    }
  });
});

routes.delete("/airplane/:id", (req, res) => {
  airplaneDao.removeAirplane(req.params.id, (err, result) => {
    if (err) {
      res.writeHead(400);
      res.end("Delete airplane Failed");
      //res.send('Delete Author Failed!').end;
    } else {
      res.send("Delete airplane Successful!").end;
    }
    return;
  });
});
module.exports = routes;
