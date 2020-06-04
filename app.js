const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const favicon = require('serve-favicon'); //known as a shortcut icon, website icon, tab icon, URL icon, or bookmark icon
const logger = require('morgan');  //Morgan is used for logging request details
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');

//npm var hbs = require('hbs');
const session = require('express-session');

//const index = require('./resurse/index');

const app = express();
const port = 6790;


// // directorul 'views' va conține fișierele .ejs (html + js executat la server)
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))




app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'public'));

app.get('/', (req, res) => res.send('Hello World'));
//app.use('/', index);
var Cart = require('./javascript/cos_cumparaturi');
var products = JSON.parse(fs.readFileSync('./json/produse.json', 'utf8'));

app.get('/index', (req, res) => {
  
  res.render('index', { title: 'cel mai tare shop de insecte ',products: products});

});
app.get('/contact', (req, res) => {
  
  res.render('contact', { title: 'Us '});

});

app.get('/cos_cumparaturi',(req, res)=> {
  if (!req.session.cart) {
    return res.render('cos_cumparaturi', {title: 'Cosul de cumparatui',products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('cos_cumparaturi', {
    title: 'Cos de cumparaturi',
    products: cart.getItems(),
    totalPrice: cart.totalPrice
    
  });
});
app.get('/add/:id', function(req, res, next) {
  var productId = req.params.id;
  console.log("Aici solicit productID ul",productId);
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  console.log("Aici ma joc cu variabila cart",cart);
  var product = products.filter(function(item) {
    return item.id == productId;
  });
  console.log("Ma joc cu variabile product");
  cart.add(product[0], productId);
  req.session.cart = cart;
  res.redirect('/index');
});

app.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  console.log("Vreau sa sterg in ceapa ma tii",productId);
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/cos_cumparaturi');
});

app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`,port ));
/*
// catch 404 and forward to error handler
/*
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/
/*
const http = require('http');
const hostname = '127.0.0.1';s
const port = 6789;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Serverul rulează la adresa http://${hostname}:${port}/`);
});

**/