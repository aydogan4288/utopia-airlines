var db = require("./db");

exports.getAllClients = function(cb) {
  db.query("select * from mydb.client", function(err, result) {
    cb(err, result);
  });
};

exports.addClient = function(client, cb) {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query(
      "insert into mydb.client(client_name, client_email, client_cc) values(?,?,?)",
      [client.client_name, client.client_email, client.client_cc],
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

exports.getClientById = function(clientId, cb) {
  db.query(
    "select * from mydb.client where client_id = ?",
    [clientId],
    function(err, res) {
      cb(err, res);
    }
  );
};

exports.updateClient = (client, cb) => {
  db.beginTransaction(err => {
    if (err) cb(err, null);

    db.query(
      "update mydb.client set client_name = ?, client_email = ?, client_cc = ? where client_id = ?",
      [
        client.client_name,
        client.client_email,
        client.client_cc,
        client.client_id
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

exports.removeClient = (clientId, cb) => {
  db.beginTransaction(err => {
    if (err) cb(err, null);

    db.query(
      "delete from mydb.client where client_id = ?",
      [clientId],
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
