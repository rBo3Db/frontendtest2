const express = require('express');
const app = express();
var port = process.env.PORT || 3000;

app.get('/getCountries', (request, response) => {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
    host: 'countriesdb.cgcsc13jbtcg.us-east-2.rds.amazonaws.com',
    port: '3306',
    user: 'masterUser',
    password: 'QWer123!',
    database : 'countriesDB'
    });
    var me = response; 
    connection.query('SELECT * FROM countries', function(error, result, fields){
        if(error)
        {
            me.send(JSON.stringify(error));
            return;
        }
        
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

