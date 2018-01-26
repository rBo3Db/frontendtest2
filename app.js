const express = require('express');
const app = express();
var port = process.env.PORT || 3000;
/* app.get('/', (request, response) => {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
    host: 'aahf5x4fkzvlmb.cgcsc13jbtcg.us-east-2.rds.amazonaws.com',
    port: '3305',
    user: 'rBo3Db',
    password: 'fktrctqfktitymrf',
    database : 'ebdb'
    });
    var me = response; 
    connection.query('SELECT * FROM countries', function(error, result, fields){
        me.send(JSON.stringify(result));
    });
}); */

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

