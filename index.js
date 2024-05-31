const express = require("express");
const app = express();
const port = 4000

app.set('view engine', 'ejs');
app.use(express.static('public'))

require('./routes/home.js')(app);

app.listen(port, ()=> console.log('started in http://localhost:'+port))