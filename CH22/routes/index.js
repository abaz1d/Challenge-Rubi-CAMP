var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
var moment = require('moment')


module.exports = function (db) {
  //const collection = db.collection('users');

  //GET, READ USERS
  // router.get('/', async function (req, res,) {
  //   const url = req.url == '/' ? '/?page=1' : req.url;
  //   const page = req.query.page || 1;
  //   const limit = 2;
  //   const offset = (page - 1) * limit;
  //   const wheres = {}
  //   const filter = `&idCheck=${req.query.idCheck}&id=${req.query.id}&stringCheck=${req.query.stringCheck}&string=${req.query.string}&integerCheck=${req.query.integerCheck}&integer=${req.query.integer}&floatCheck=${req.query.floatCheck}&float=${req.query.float}&dateCheck=${req.query.dateCheck}&startDate=${req.query.startDate}&endDate=${req.query.endDate}&booleanCheck=${req.query.booleanCheck}&boolean=${req.query.boolean}`
  //   var count = 1;
  //   var sortBy = req.query.sortBy == undefined ? 'id' : req.query.sortBy;
  //   var sortMode = req.query.sortMode == undefined ? 1 : req.query.sortMode;
  //   var sortMongo = `{"${sortBy}" : ${sortMode}}`;
  //   sortMongo = JSON.parse(sortMongo);

  //   // console.log(req.query)
  //   // console.log(filter)

  //   // if (req.query.id && req.query.idCheck == 'on') {
  //   //   wheres.push(`"id" : ${req.query.id}`);
  //   // }

  //   if (req.query.string != '' && req.query.stringCheck == 'on') {
  //     wheres(`string : ${req.query.string}`);
  //   }

  //   if (req.query.integer && req.query.integerCheck == 'on') {
  //     wheres.push(`"integer" : ${req.query.integer}`);
  //   }

  //   if (req.query.float && req.query.floatCheck == 'on') {
  //     wheres.push(`"float" : ${req.query.float}`);
  //   }

  //   if (req.query.dateCheck == 'on') {
  //     if (req.query.startDate != '' && req.query.endDate != '') {
  //       wheres.push(`"date" :{ "$gt": "${req.query.startDate}", "$lte": "${req.query.endDate}"}`)
  //     }
  //     else if (req.query.startDate) {
  //       wheres.push(`"date": {"$gt": "${req.query.startDate}"}`)
  //     }
  //     else if (req.query.endDate) {
  //       wheres.push(`"date": {"$lte": "${req.query.endDate}"}`)
  //     }
  //   }

  //   if (req.query.boolean && req.query.booleanCheck == 'on') {
  //     wheres.push(`"boolean" : ${req.query.boolean}`);
  //   }


  //   // let noSql = '{';
  //   // if (wheres.length > 0) {
  //   //   noSql += `${wheres.join(',')}`
  //   // }
  //   // noSql += '}'

  //   // noSql = JSON.parse(noSql)
    

  //   //console.log(noSql)

  //   db.collection("users").find({}).toArray(function (err, result) {
  //     if (err) {
  //       console.error(err);
  //     }
  //     var total = result.length;
  //     const pages = Math.ceil(total / limit)
  //     db.collection("users").find({}).skip(offset).limit(limit).sort(sortMongo).toArray(function (err, result) {
  //       if (err) {
  //         console.error(err)
  //       }
  //       res.render('list', { data: result, pages, page, filter, url, moment, query: req.query, sortBy, sortMode })

  //     })
  //   })
  // })
  router.get('/', async function (req, res,) {
    const url = req.url == '/' ? '/?page=1' : req.url;
    const page = req.query.page || 1;
    const limit = 5;
    const offset = (page - 1) * limit;
    const wheres = []
    const filter = `&idCheck=${req.query.idCheck}&id=${req.query.id}&stringCheck=${req.query.stringCheck}&string=${req.query.string}&integerCheck=${req.query.integerCheck}&integer=${req.query.integer}&floatCheck=${req.query.floatCheck}&float=${req.query.float}&dateCheck=${req.query.dateCheck}&startDate=${req.query.startDate}&endDate=${req.query.endDate}&booleanCheck=${req.query.booleanCheck}&boolean=${req.query.boolean}`
    var count = 1;
    var sortBy = req.query.sortBy == undefined ? 'id' : req.query.sortBy;
    var sortMode = req.query.sortMode == undefined ? 1 : req.query.sortMode;
    var sortMongo = `{"${sortBy}" : ${sortMode}}`;
    sortMongo = JSON.parse(sortMongo);

    console.log(req.query)
    console.log(filter)

    if (req.query.id && req.query.idCheck == 'on') {
        wheres.push(`"id" : ${req.query.id}`);
    }

    if (req.query.integer && req.query.integerCheck == 'on') {
        wheres.push(`"integer" : ${req.query.integer}`);
    }

    if (req.query.float && req.query.floatCheck == 'on') {
        wheres.push(`"float" : ${req.query.float}`);
    }

    if (req.query.dateCheck == 'on') {
        if (req.query.startDate != '' && req.query.endDate != '') {
            wheres.push(`"date" :{ "$gt": "${req.query.startDate}", "$lte": "${req.query.endDate}"}`)
        }
        else if (req.query.startDate) {
            wheres.push(`"date": {"$gt": "${req.query.startDate}"}`)
        }
        else if (req.query.endDate) {
            wheres.push(`"date": {"$lte": "${req.query.endDate}"}`)
        }
    }

    if (req.query.boolean && req.query.booleanCheck == 'on') {
        wheres.push(`"boolean" : ${req.query.boolean}`);
    }


    let noSql = '{';
    if (wheres.length > 0) {
        noSql += `${wheres.join(',')}`
    }
    noSql += '}'

    noSql = JSON.parse(noSql)
    if (req.query.string && req.query.stringCheck == 'on') {
        noSql["string"] = new RegExp(req.query.string)
    }

    console.log(noSql)

    db.collection("users").find(noSql).toArray(function (err, result) {
        if (err) {
            console.error(err);
        }
        var total = result.length;
        const pages = Math.ceil(total / limit)
        db.collection("users").find(noSql).skip(offset).limit(limit).sort(sortMongo).toArray(function (err, result) {
            if (err) {
                console.error(err)
            }
            res.render('list', { data: result, pages, page, filter, query: req.query, sortBy, sortMode, moment, url })
        })
    })
})

  router.get('/add', (req, res) => {
    res.render('add')
  })

  router.post('/add', (req, res) => {
    var myobj = {
      string: `${req.body.string}`,
      integer: parseInt(req.body.integer),
      float: JSON.parse(req.body.float),
      date: new Date(`${req.body.date}`),
      boolean: JSON.parse(req.body.boolean)
    };
    db.collection("users").insertOne(myobj, function (err, res) {
      if (err) throw err;
      //console.log("1 data masuk");
    });
    res.redirect('/')
  })


  // //POST, CREATE USERS
  // router.post('/', async function (req, res, next) {
  //   try {
  //     const insertResult = await collection.insertOne({ name: req.body.name, address: req.body.address });
  //     res.status(201).json(insertResult)
  //   } catch (e) {
  //     res.json(e)
  //   }
  // });

  // //PUT, EDIT USERS
  // router.put('/:id', async function (req, res, next) {
  //   try {
  //     const updateResult = await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: req.body.name, address: req.body.address } });
  //     res.status(201).json(updateResult)
  //   } catch (e) {
  //     res.json(e)
  //   }
  // });

  // //DELETE, USSER DELETE
  // router.delete('/:id', async function (req, res, next) {
  //   try {
  //     const deleteResult = await collection.deleteOne({ _id: ObjectId(req.params.id) });
  //     res.status(201).json(deleteResult)
  //   } catch (e) {
  //     res.json(e)
  //   }
  // });

  // db.collection('users').count().then((count) => {
  //     console.log(count);
  // });

  // router.post('/add', (req, res) => {

  //   db.collection("counters").findOneAndUpdate({ _id: 'productid' },
  //     { $inc: { seq: 1 } },
  //     { new: true }).then((result) => {
  //       console.log(result.value.seq)
  //       var myobj = {
  //         _id: result.value.seq,
  //         string: `${req.body.string}`,
  //         integer: parseInt(req.body.integer),
  //         float: JSON.parse(req.body.float),
  //         date: new Date(`${req.body.date}`),
  //         boolean: JSON.parse(req.body.boolean)
  //       };
  //       db.collection("data").insertOne(myobj, function (err, res) {
  //         if (err) throw err;
  //         console.log("1 document inserted");

  //       });
  //       res.redirect('/')
  //     }
  //     ).catch((err) => {
  //       console.log(err)
  //     })

  // })

  return router;
}

// db.users.insert(
//   { _id : 1, string : "abc", integer : 2, float :  3.45,  date :new Date("<2022-12-09>"), boolean : false },
// )