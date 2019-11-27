const express = require('express');
const app = express();
const port = 3000;
const db = require("./dbModels.js")
const path = require('path');
const bodyParser = require('body-parser');

const dbController = {};

// ! controllers for queries
//get user info
dbController.getUser = (req, res, next) => { 
    //TODO Current query is for a single test user, ID 2  
    const testUser = 'SELECT * FROM "Users" WHERE _id=2';
    
    db.query(testUser, null, (err, results) => {
        if (err) {
            console.log('Error getting user from database');
            next(err);
        }
        res.locals.userInfo = results.rows[0]
        return next();
    })    
}

//get cat info
dbController.getCats = (req, res, next) => {
    //TODO Current query is for a single test user, ID 2  
    const getCats = 'SELECT c.* FROM "Users" u JOIN "Cats" c ON u.cat_1 = c._id OR u.cat_2 = c._id OR u.cat_3 = c._id OR u.cat_4 = c._id WHERE u._id=2';
    
    db.query(getCats, null, (err, results) => {
        if (err) {
            console.log('Error getting cats from database');
            next(err);
        }
        res.locals.catInfo = results.rows
        return next();
    })    
}

//update cat info
dbController.updateCats = (req, res, next) => {
    //TODO Current query is for a single test user, ID 2  
    let whichCat = req.body.whichCat;
    let currentCat = req.body.currentID;
    let queryString = `UPDATE "Users" SET cat_${whichCat + 1}=${currentCat + 1} WHERE _id=2 RETURNING *`;

    db.query(queryString, null, (err, results) => {
        if (err) {
            console.log('Error updating cat in database');
            return res.status(500).send('Error updating cat');
        }
        res.locals.userInfo = results.rows[0]
        return next();
    }) 
}




app.use(express.static('/catPNGs/'))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

app.get('/build/bundle.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/bundle.js'))
})
app.get('/stylesheet.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../stylesheet.css'))
})

//data needed to start:
//username, fishes, cat_1-cat_4 IDs
//data for cat_1-cat_4
app.get('/data', dbController.getUser, dbController.getCats, (req,res) => {
    //query for user info: username, fishes, cat1-cat
    //query for cat info this user needs
    //send it all back to be put into state on the front end
    // console.log("FROM /data GET: ", res.locals);
    res.status(200).json(res.locals);
    
})

app.post('/updateCat', dbController.updateCats, dbController.getCats, (req,res) => {
    // need to change column whichCat (cat_[whichCat]) to be currentID + 1
    res.status(200).json(res.locals);
})

app.post('/saveData', (req, res) => {
    //TODO Current query is for a single test user, ID 2  
    console.log(req.body);
    let fishToSave = req.body.fishes;
    let queryString = `UPDATE "Users" SET fishes=${fishToSave} WHERE _id=2`;

    db.query(queryString, null, (err, results) => {
        if (err) {
            console.log('Error updating cat in database');
            return res.status(500).send('Error updating cat');
        }
        return res.status(200).json('Update compete!');
    }) 
})

app.post('/login', (req, res) => {
    console.log(req.body)
    let username = req.body.username;
    let password = req.body.password;
    let loginString = `SELECT username, password FROM "Users" WHERE username='${username}' AND password='${password}'`
    
    db.query(loginString, null, (err, results) => {
        if (err) {
            console.log('Error checking login in database');
            return res.status(500).send('Error checking login');
        }
        console.log("RESULTS FROM LOGIN", results);
        if (results.rows.length === 1) {
            return res.status(200).json(true);
        }
        else return res.status(200).json(false);
    }) 
})




app.listen(port, () => console.log('Listening on port:', port));