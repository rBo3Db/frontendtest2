const express = require('express');
const app = express();
const port = 3000
app.get('/countries', (request, response) => {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'fktrctq',
    database : 'aliosha'
    });
    var me = response; 
    connection.query('SELECT * FROM countries', function(error, result, fields){
        me.send(JSON.stringify(result));
    });
});

app.get('/', (request, response) =>{
    var fs = require("fs");
    var fileContent = fs.readFileSync("index.html", "utf8");
    response.send(fileContent);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`); 
}); 

