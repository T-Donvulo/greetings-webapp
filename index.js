const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const greeting = require('./factory.js');
const separated = require('./separate-routes');
const session = require('express-session');
const flash = require('express-flash');
const pg = require("pg");
const Pool = pg.Pool;


const app = express();

app.use(session({
    secret: "<My flash>",
    resave: false,
    saveUninitialized: true
}));


let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://thatodonvulo:pw123@localhost:5432/greeting_webapp';


const pool = new Pool({
    connectionString,
});
const Greet = greeting(pool);
const separateInstance = separated(Greet)

app.get('/addFlash', separateInstance.flashset)

app.use(flash())
app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', separateInstance.getsCounter)

app.get("/", separateInstance.home)

app.post("/greet", separateInstance.myErrorsMSG)

app.get("/greeted", separateInstance.toFindNames)

app.get("/counter/:name", separateInstance.countIndividual)


app.get("/clear", separateInstance.clearingBTN)


const PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
    console.log("App started at PORT:", PORT)

});
