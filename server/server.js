const express = require('express');
const app = express();
const port = 3000;
const db = require("./dbModels.js")


app.get('/', (req,res) => {
    res.send('Hello Kitty Clicker');
})

app.get('/dbtest', (req,res) => {
    //query for all cats
    const allCats = 'SELECT * from "Cats"'; 
    
    db.query(allCats, null, (err, results) => {
        res.locals = results.rows;
        console.log(res.locals);
        res.send(res.locals);
    })
    
    
})




app.listen(port, () => console.log('Listening on port:', port));