var express = require('express');
var router = express.Router();
var moment = require('moment')

/* GET home page. */
module.exports = function (db) {
  router.get('/', async function (req, res,) {
    const url = req.url == '/' ? '/?page=1' : req.url;
    const page = req.query.page || 1;
    const limit = 3;
    const offset = (page - 1) * limit;
    const wheres = []
    const values = []
    var count = 1;
    var sortBy = req.query.sortBy == undefined ? `id` : req.query.sortBy;
    var order = req.query.order == undefined ? `asc` : req.query.order;


    console.log(req.query)


    if (req.query.id && req.query.idCheck == 'on') {
      wheres.push(`id = $${count++}`);
      values.push(req.query.id);
    }

    if (req.query.string && req.query.stringCheck == 'on') {
      wheres.push(`string ilike '%' || $${count++} || '%'`);
      values.push(req.query.string);
    }

    if (req.query.integer && req.query.integerCheck == 'on') {
      wheres.push(`integer = $${count++}`);
      values.push(req.query.integer);
    }

    if (req.query.float && req.query.floatCheck == 'on') {
      wheres.push(`float = $${count++}`);
      values.push(req.query.float);
    }

    if (req.query.dateCheck == 'on') {
      if (req.query.startDate != '' && req.query.endDate != '') {
        wheres.push(`date BETWEEN $${count++} AND $${count++}`)
        values.push(req.query.startDate);
        values.push(req.query.endDate);
      }
      else if (req.query.startDate) {
        wheres.push(`date > $${count++}`)
        values.push(req.query.startDate);
      }
      else if (req.query.endDate) {
        wheres.push(`date < $${count++}`)
        values.push(req.query.endDate);
      }
    }

    if (req.query.boolean && req.query.booleanCheck == 'on') {
      wheres.push(`boolean = $${count++}`);
      values.push(req.query.boolean);
    }


    let sql = 'SELECT COUNT(*) AS total FROM todos';
    if (wheres.length > 0) {
      sql += ` WHERE ${wheres.join(' AND ')}`
    }

    console.log(sql)

    db.query(sql, values, (err, data) => {
      if (err) {
        console.error(err);
      }
      const pages = Math.ceil(data.rows[0].total / limit)
      sql = 'SELECT * FROM todos'
      if (wheres.length > 0) {
        sql += ` WHERE ${wheres.join(' AND ')}`
      }
      sql += ` ORDER BY ${sortBy} ${order} LIMIT $${count++} OFFSET $${count++}`;
      console.log(sql)
      console.log([...values, limit, offset])
      db.query(sql, [...values, limit, offset], (err, data) => {
        if (err) {
          console.error(err);
        }
        res.render('list', { data: data.rows, pages, page, query: req.query, sortBy, order, moment, url })
      })
    })
  })

  router.get('/add', (req, res) => {
    res.render('add')
  })

  router.post('/add', (req, res) => {
    db.query('INSERT INTO todos(string,integer,float,date, boolean) VALUES ($1, $2, $3, $4, $5)', [req.body.string, parseInt(req.body.integer), parseFloat(req.body.float), req.body.date, req.body.boolean], (err) => {
      if (err) {
        console.error(err);
      }
    })
    res.redirect('/');
  })

  router.get('/delete/:id', (req, res) => {
    db.query('DELETE FROM todos WHERE id = $1', [req.params.id], (err) => {
      if (err) {
        console.error(err);
      }
    })
    res.redirect('/');
  })

  router.get('/edit/:id', (req, res) => {
    db.query('SELECT * FROM todos WHERE id = $1', [req.params.id], (err, data) => {
      if (err) {
        console.error(err);
      }
      res.render('edit', { item: data.rows[0], moment })
    })
  })

  router.post('/edit/:id', (req, res) => {
    db.query('UPDATE todos SET string = $1, integer = $2, float = $3, date = $4, boolean = $5 WHERE id = $6',
      [req.body.string, parseInt(req.body.integer), parseFloat(req.body.float), req.body.date, req.body.boolean, req.params.id], (err) => {
        if (err) {
          console.error(err)
        }
        res.redirect('/');
      })
  })

  return router;
}