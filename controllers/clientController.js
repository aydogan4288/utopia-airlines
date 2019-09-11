var routes = require("express").Router();
var clientDao = require("../dao/clientDao");

routes.get("/client", function(req, res) {
  clientDao.getAllClients(function(error, result) {
    if (error) throw error;
    res.setHeader("Content-Type", "application/json");
    res.send(result);
  });
});

routes.post("/client", (req, res) => {
  var client = req.body;
  clientDao.addClient(client, (err, result) => {
    if (err) {
      res.status(400);
      res.send("Add Client Failed!");
    }
    console.log(result);
    res.status(201);
    res.send("Add Client Successful!");
  });
});

routes.get("/client/:id", (req, res) => {
  clientDao.getClientById(req.params.id, (error, result) => {
    if (error) throw error;
    res.setHeader("Content-Type", "application/json");
    res.send(result).end;
  });
});

routes.put("/client", (req, res) => {
  var client = req.body;
  clientDao.updateClient(client, (err, result) => {
    if (err) {
      res.status(400).end("Update client failed");
      //res.send('Update author failed');
    } else {
      res.status(200).end("Update client Successfull");
      //res.send('Author updated Successfully');
    }
  });
});

routes.delete("/client/:id", (req, res) => {
  clientDao.removeClient(req.params.id, (err, result) => {
    if (err) {
      res.writeHead(400);
      res.end("Delete client Failed");
      //res.send('Delete Author Failed!').end;
    } else {
      res.send("Delete client Successful!").end;
    }
    return;
  });
});

module.exports = routes;
