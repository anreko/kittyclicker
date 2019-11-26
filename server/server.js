const express = require('express');
const app = express();
const port = 3000;
const db = require("./dbModels.js")


app.get('/data', (req,res) => {
    //query for all cats
    const allCats = 'SELECT * from "Cats"'; 
    const testUser = 'SELECT * FROM "Users" WHERE _id=2'
    
    db.query(testUser, null, (err, results) => {
        res.locals = results.rows;
        console.log("FROM SERVER: ", res.locals);
        res.send(res.locals);
    })
    
    
})




app.listen(port, () => console.log('Listening on port:', port));