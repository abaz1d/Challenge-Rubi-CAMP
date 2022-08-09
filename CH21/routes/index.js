var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = function (db) {
  router.get('/', function (req, res, next) {
    db.query('SELECT * FROM todos', (err, data) => {
      if(err) return res.send(err)
      res.render('list', {data :data.rows });
    });
  })
  return router;
}