const express = require('express');
const app = express();
const port = 3000;
const db = require("./dbModels.js")

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




//data needed to start:
//username, fishes, cat_1-cat_4 IDs
//data for cat_1-cat_4
app.get('/data', dbController.getUser, dbController.getCats, (req,res) => {
    //query for user info: username, fishes, cat1-cat
    //query for cat info this user needs
    //send it all back to be put into state on the front end
    console.log("FROM /data GET: ", res.locals);
    res.status(200).json(res.locals);
    
})


app.listen(port, () => console.log('Listening on port:', port));