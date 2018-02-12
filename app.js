const express = require('express');
const app = express();
var port = process.env.PORT || 3000;

/* app.get('/getCountries', (request, response) => {
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

});  */ 

app.get('/', (request, response) =>{
    var fs = require("fs");
    var fileContent = fs.readFileSync("index.html", "utf8");
    response.send(fileContent);
});

app.get('/main.css', (request, response) =>{
    var fs = require("fs");
    var fileContent = fs.readFileSync("main.css", "utf8");
    response.send(fileContent);
});
app.get('/getCitiesByIdOfCountry', (request, response) =>{
    var mysql = require('mysql');
    var connection = mysql.createConnection({
    host: 'countriesdb.cgcsc13jbtcg.us-east-2.rds.amazonaws.com',
    port: '3306',
    user: 'masterUser',
    password: 'QWer123!',
    database : 'countriesDB'});
    var citiesByIdOfCountry = response; 
    var partOfName = request.query.partOfName;
    var pageNumber = Number(request.query.pageNumber);
    pageNumber = pageNumber * 5;
//    проверка на неправильные символы
        connection.query ("SELECT ID FROM countries where name like '%"+partOfName+"%'", function(error, res, fields) {
            var howManyCountries = res.length;
            if (howManyCountries == 0) {
                citiesByIdOfCountry.send(JSON.stringify(error));
                return;
            } else {
                for (var numberOfCountries = 0; numberOfCountries < howManyCountries; numberOfCountries++) { //генератор запроса в зависимости от совпадений символов в запросе
                    var idhui = res[numberOfCountries].ID;
                    if(numberOfCountries == 0) {
                    var req = 'WHERE countryID = '+ idhui; 
                    } else {
                        req = req + ' OR countryID = ' + idhui;
                    }
                };
                connection.query ('SELECT Count(*) as col FROM cities ' + req, function(error, result, fields)
                {
                    var col = result[0].col;
                    connection.query('SELECT name FROM cities ' + req +' LIMIT '+pageNumber+ ',5', function(error, data, fields){
                        if(error)
                        {
                            citiesByIdOfCountry.send(JSON.stringify(error));
                            return;    
                        }
                        var result = {count : col, cities : data};
                        citiesByIdOfCountry.send(JSON.stringify(result));
                    });
                });
            };           
        });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`); 
}); 

