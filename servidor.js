// if (process.env.NODE_ENV !== 'production') {
//   require('.env').config()
// }
const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');
      const bcrypt = require('bcrypt')
      // const flash = require('express-flash')
      const flash = require('connect-flash');
      const session = require('express-session')    
      const passport = require('passport')
      const methodOverride = require('method-override')
      
const app = express();

app.use(session({
  secret: "cats",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});

// importing routes
const customerRoutes = require('./routes/customer');

// settings
app.set('port', process.env.PORT || 3000);

// linea de abajo indicaria  donde esta la carpeta views, que en mi caso no uso
// app.set('views', path.join(__dirname, 'views'));
//linea de abajo se usa si se quiere usar template engine como ejs
// app.set('view engine', 'html')

// middlewares
app.use(morgan('dev')); 

app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'trabaya1'
}, 'single'));

//la linea de abajo se debe usar para que expreses pueda entender los datos enviados por un formulario
app.use(express.urlencoded({extended: false}));

// routes si esto no estam no carga la tabla, osea que encuentra y envia la carpeta public, pero no la ruta customers route
//las routas indican que hacer cuando se recibe un post o get
app.use('/', customerRoutes);

// static files si esto no esta sale cannot GET, osea no encuentra los archivos
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});



