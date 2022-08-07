const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
// const fs = require('fs');
// const dataPath = "./data.json"
//const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
const port = 3000;
const sqlite3 = require('sqlite3');
const { constants } = require('buffer');
const { off } = require('process');

const db = new sqlite3.Database('data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) { console.log(`gak nyambung didatabase`, err) };
});

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

function update(id, string, integer, float, date, boolean, callback) {
    db.run('UPDATE data SET string = ?, integer = ?, float = ?, date = ?, boolean = ? WHERE id = ?', [string, integer, float, date, boolean, id], (err) => {
        callback(err);
    });
}

function remove(id, callback) {
    db.run('DELETE FROM data WHERE id = ?', [id], (err) => {
        callback(err);
    })
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    const page = req.query.page || 1
    const values = []
    const limit = 3
    const offset = (page - 1) * limit
        db.all('SELECT COUNT(*) AS total FROM data', values, (err, data) => {
            if (err){
                console.error(err)}
                const pages = Math.ceil(data[0].total / limit)
            db.all('SELECT * FROM data LIMIT ? OFFSET ?', [...values, limit, offset], (err, data) => {
                    if (err){
                        console.error(err);}
                    res.render('index', { rows: data, pages, page})
            })
        })
    })


app.get('/add', (req, res) => {
    res.render('add')
})

app.post('/add', (req, res) => {
    db.run('INSERT INTO data(string,integer,float,date, boolean) VALUES (?, ?, ?, ?, ?)',
        [req.body.string, parseInt(req.body.integer), parseFloat(req.body.float), req.body.date, req.body.boolean], (err) => {
            if (err) {
                console.error(err);
            }
            res.redirect('/');
        })
    console.log(`ini eror ${req.params.id}`)
})

app.get('/delete/:id', (req, res) => {
    db.run('DELETE FROM data WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');

    })
    console.log(`ini eror ${req.params.id}`)
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
    update(req.body.id, req.body.string, parseInt(req.body.integer), parseFloat(req.body.float), req.body.date, req.body.boolean, (err) => {
        if (err) {
            console.error(err)
        }
        res.redirect('/');
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})