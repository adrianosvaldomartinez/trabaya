const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');
      const bcrypt = require('bcrypt')
      const passport = require('passport')
      const flash = require('express-flash')
      const session = require('express-session')
      const methodOverride = require('method-override')

const app = express();

// importing routes
const customerRoutes = require('./routes/customer');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html')

// middlewares
app.use(morgan('dev')); 
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'trabaya1'
}, 'single'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));


// const initializePassport = require('./passport-config')
// //funcion creada en passport config, tengo que reemplaze user por nombre de db de users?
// initializePassport(
//   passport,
//   email => trabayauser.find(user => user.email === email),
//   id => trabayauser.find(user => user.id === id)
// )






// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
