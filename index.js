const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const greeting = require('./factory.js');
const Greet = greeting();
const session = require('express-session');
const flash = require('express-flash')

const app = express();

app.use(session({
    secret: "<My flash>",
    resave: false,
    saveUninitialized: true
}));

// app.get('/', function (req, res) {
//     ('index');

// });
// app.get('/addFlash', function (req, res) {
//     req.flash('info', 'Flash Message Added');
//     res.redirect('/');
// });
// app.get('/', function (req, res) {
//     req.flash('info', 'Welcome');
//     res.render('index', {
//         title: 'home'
//     })
// });
app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', function (req, res) {

    res.render('index');

});

app.post("/greet", function (req, res) {
    var nam = req.body.namesGreeted
    var lang = req.body.language
    Greet.setNames(nam)
    // if (nam) {
    //     res.render('index', {
    //         msg: nam
    //     });
    // }



    res.render('index', {
        msg: Greet.langauges(nam, lang),
        count: Greet.counterFun(),

    });

});

app.get("/greeted", function (req, res) {
    res.render('greeted', {
        greeted: Greet.getNames()
    })

});

app.get("/greeted/:count", function (req, res) {
    console.log(req.params.count);

    var user = req.params.count;
    var namesList = Greet.userCounter(user)

    res.render('counter', {
        greeted: namesList,
        user
    });
});


const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at PORT:", PORT)

});
