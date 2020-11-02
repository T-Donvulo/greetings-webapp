const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const greeting = require('./factory.js');
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




// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://thatodonvulo:pw123@localhost:5432/greeting_webapp';


const pool = new Pool({
    connectionString,
    // ssl : useSSL
});
const Greet = greeting(pool);

// app.get('/', function (req, res) {
//     ('index');
//could be the database password: pg123
// });
app.get('/addFlash', function (req, res) {
    res.redirect('/');
});
// app.get('/', function (req, res) {
//     req.flash('info', 'Welcome');
//     res.render('index', {
//         title: 'home'
//     })
// });
app.use(flash())
app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', async function (req, res) {

    res.render('index', { count: await Greet.getCounter() });
});

app.get("/", async function (req, res) {
    res.render('index');
});

app.post("/greet", async function (req, res) {
    var name = req.body.name
    var language = req.body.language;
   let greeted =  await Greet.langauges(name, language);
    if (name === '' && language === undefined) {
        req.flash('info', 'Please Enter Name & select language!')
    } else if (language === 'Swahili' && name === '') {
        req.flash('info', 'Ingiza Jina Lako')
    } else if (language === 'TshiVenda' && name === '') {
        req.flash('info', 'Dzina Lavho')
    } else if (language === 'Shona' && name === '') {
        req.flash('info', 'Pinda Zita')
    } else if (language === undefined) {
        req.flash('info', 'Select language!')
    } else if(isNaN(name) === false){
        req.flash('info', 'letters only A-Z, a-z!')
    }   else {
         await Greet.addNameToDatabase(name);
        
        //console.log(count)
    }
    res.render('index', {
        msg: greeted,
        count: await Greet.getCounter(name)
    });
});

app.get("/greeted", async function (req, res) {

    res.render('greeted', {
        greeted: await Greet.findNames()
    })

});

app.get("/counter/:name", async function (req, res) {

    var name = req.params.name;
    // if(name.startsWith('style.css'))
    // console.log({name});

    var namesList = await Greet.getUserCount(name)
    // console.log(namesList);

    const count = namesList.rows[0].counter || 0;


    res.render('counter', {
        greeted: count,
        user: name
    })

});


app.get("/clear", async function (req, res) {

    await Greet.remove();
    res.redirect('/');
});


const PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
    console.log("App started at PORT:", PORT)

});
