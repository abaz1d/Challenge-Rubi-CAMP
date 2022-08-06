const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const fs = require('fs');
// const file_path = "./file.json"
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database("c20db.db", sqlite3.OPEN_READWRITE, err => {
    if (err) {
        console.error(err);
    }
})

function select(id, callback) {
    db.all('SELECT * FROM data WHERE id = ?', id, (err, data) => {
        callback(err, data);
    })
}

function add(id, string, integer, float, date, boolean, callback) {
    db.run('INSERT INTO data VALUES (?, ?, ?, ?, ?, ?)', [id, string, integer, float, date, boolean], (err) => {
        callback(err);
    });
}

function update(newId, oldId, string, integer, float, date, boolean, callback) {
    db.run('UPDATE data SET id = ?, string = ?, integer = ?, float = ?, date = ?, boolean = ? WHERE id = ?', [newId, string, integer, float, date, boolean, oldId], (err) => {
        callback(err);
    });
}

function remove(id, callback) {
    db.run('DELETE FROM data WHERE id = ?', [id], (err) => {
        callback(err);
    })
}

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const page = req.query.page || 1;
    const limit = 5;
    const offset = (page - 1) * limit;
    const wheres = []
    const values = []
    const filter = `&idCheck=${req.query.idCheck}&id=${req.query.id}&stringCheck=${req.query.stringCheck}&string=${req.query.string}&integerCheck=${req.query.integerCheck}&integer=${req.query.integer}&floatCheck=${req.query.floatCheck}&float=${req.query.float}&dateCheck=${req.query.dateCheck}&startDate=${req.query.startDate}&endDate=${req.query.endDate}&booleanCheck=${req.query.booleanCheck}&boolean=${req.query.boolean}`

    if (req.query.id && req.query.idCheck == 'on') {
        wheres.push(`id = ?`);
        values.push(req.query.id);
    }

    if (req.query.string && req.query.stringCheck == 'on') {
        wheres.push(`string like '%' || ? || '%'`);
        values.push(req.query.string);
    }

    if (req.query.integer && req.query.integerCheck == 'on') {
        wheres.push(`integer = ?`);
        values.push(req.query.integer);
    }

    if (req.query.float && req.query.floatCheck == 'on') {
        wheres.push(`float = ?`);
        values.push(req.query.float);
    }

    if (req.query.dateCheck == 'on') {
        if (req.query.startDate != '' && req.query.endDate != '') {
            wheres.push('date BETWEEN ? AND ?')
            values.push(req.query.startDate);
            values.push(req.query.endDate);
        }
        else if (req.query.startDate) {
            wheres.push('date > ?')
            values.push(req.query.startDate);
        }
        else if (req.query.endDate) {
            wheres.push('date < ?')
            values.push(req.query.endDate);
        }
    }

    if (req.query.boolean && req.query.booleanCheck == 'on') {
        wheres.push(`boolean = ?`);
        values.push(req.query.boolean);
    }


    let sql = 'SELECT COUNT(*) AS total FROM data';
    if (wheres.length > 0) {
        sql += ` WHERE ${wheres.join(' AND ')}`
    }

    console.log(sql)

    db.all(sql, values, (err, data) => {
        if (err) {
            console.error(err);
        }
        const pages = Math.ceil(data[0].total / limit)
        sql = 'SELECT * FROM data'
        if (wheres.length > 0) {
            sql += ` WHERE ${wheres.join(' AND ')}`
        }
        sql += ' LIMIT ? OFFSET ?';
        console.log(sql)
        db.all(sql, [...values, limit, offset], (err, data) => {
            if (err) {
                console.error(err);
            }
            res.render('list', { rows: data, pages, page, filter })
        })
    })
})


app.get('/add', (req, res) => {
    res.render('add')
})

app.post('/add', (req, res) => {
    add(req.body.id, req.body.string, parseInt(req.body.integer), parseFloat(req.body.float), req.body.date, req.body.boolean, (err) => {
        if (err) {
            console.error(err);
        }
    })
    res.redirect('/');
})

app.get('/delete/:id', (req, res) => {
    const index = req.params.id
    remove(index, (err) => {
        if (err) {
            console.error(err);
        }
    })
    res.redirect('/');
})

app.get('/edit/:id', (req, res) => {
    select(req.params.id, (err, data) => {
        if (err) {
            console.error(err);
        }
        res.render('edit', { item: data[0] })
    })
})

app.post('/edit/:id', (req, res) => {
    update(req.body.id, req.params.id, req.body.string, parseInt(req.body.integer), parseFloat(req.body.float), req.body.date, req.body.boolean, (err) => {
        if (err) {
            console.error(err)
        }
        res.redirect('/');
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})