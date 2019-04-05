const express = require("express");
const bodyParser = require("body-parser");

const path = require('path');
const app = express();
  
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use('/', bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/public/index.html");
});
app.post("#", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.userName} - ${request.body.userAge}`);
});
app.listen(80, () => console.log("Запущен"));