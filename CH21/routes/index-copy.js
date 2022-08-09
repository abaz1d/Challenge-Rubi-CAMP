var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = function (db) {
    function add(id, string, integer, float, date, boolean, callback) {
        db.query('INSERT INTO data VALUES ($1, $2, $3, $4, $5, $6)', [id, string, integer, float, date, boolean], (err) => {
            callback(err);
        });
    }

    function select(id, callback) {
        db.query('SELECT * FROM data WHERE id = $1', [id], (err, data) => {
            callback(err, data);
        })
    }
    
    function update(newId, oldId, string, integer, float, date, boolean, callback) {
        db.query('UPDATE data SET id = $1, string = $2, integer = $3, float = $4, date = $5, boolean = $6 WHERE id = $7', [newId, string, integer, float, date, boolean, oldId], (err) => {
            callback(err);
        });
    }
    
    function remove(id, callback) {
        db.query('DELETE FROM data WHERE id = $1', [id], (err) => {
            callback(err);
        })
    }

    router.get('/', async function (req, res,) {
        const url = req.url == '/' ? '/?page=1' : req.url;
        const page = req.query.page || 1;
        const limit = 5;
        const offset = (page - 1) * limit;
        const wheres = []
        const values = []
        const filter = `&idCheck=${req.query.idCheck}&id=${req.query.id}&stringCheck=${req.query.stringCheck}&string=${req.query.string}&integerCheck=${req.query.integerCheck}&integer=${req.query.integer}&floatCheck=${req.query.floatCheck}&float=${req.query.float}&dateCheck=${req.query.dateCheck}&startDate=${req.query.startDate}&endDate=${req.query.endDate}&booleanCheck=${req.query.booleanCheck}&boolean=${req.query.boolean}`
        var count = 1;
        var sortBy = req.query.sortBy == undefined ? `id` : req.query.sortBy;
        var order = req.query.order == undefined ? `asc` : req.query.order;
        

        console.log(req.query)
        console.log(filter)

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


        let sql = 'SELECT COUNT(*) AS total FROM data';
        if (wheres.length > 0) {
            sql += ` WHERE ${wheres.join(' AND ')}`
        }

        console.log(sql)

        db.query(sql, values, (err, data) => {
            if (err) {
                console.error(err);
            }
            const pages = Math.ceil(data.rows[0].total / limit)
            sql = 'SELECT * FROM data'
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
                res.render('list', { rows: data.rows, pages, page, filter, query: req.query, sortBy, order})
            })
        })
    })


    router.get('/add', (req, res) => {
        res.render('add')
    })

    router.post('/add', (req, res) => {
        add(req.body.id, req.body.string, parseInt(req.body.integer), parseFloat(req.body.float), req.body.date, req.body.boolean, (err) => {
            if (err) {
                console.error(err);
            }
        })
        res.redirect('/');
    })

    router.get('/delete/:id', (req, res) => {
        const index = req.params.id
        remove(index, (err) => {
            if (err) {
                console.error(err);
            }
        })
        res.redirect('/');
    })

    router.get('/edit/:id', (req, res) => {
        select(req.params.id, (err, data) => {
            if (err) {
                console.error(err);
            }
            res.render('edit', { item: data.rows[0] })
        })
    })

    router.post('/edit/:id', (req, res) => {
        update(req.body.id, req.params.id, req.body.string, parseInt(req.body.integer), parseFloat(req.body.float), req.body.date, req.body.boolean, (err) => {
            if (err) {
                console.error(err)
            }
            res.redirect('/');
        })
    })
    return router;
}