
const router = require('express').Router();
const passport = require('passport')
LocalStrategy = require('passport-local').Strategy;
// const flash = require('express-flash')
const helpersp = require('./helpers');
const {connectionadri} = require('../conecction2');
const customerController = require('../controllers/customerController');


//esta ruta es llamada al abrir la pagina buscar los datos de la bd para poder usar eso datos para poblar las tablas con la func actualizar 
router.get('/b', customerController.list);
//esta ruta envia los datos a la bd trabaya1 desde el anadir
router.post('/anadir', customerController.save);
//esta ruta permite almacenar los datos de registro en la bd
router.post('/register', customerController.register);
// router.post('/login', customerController.login);

connectionadri.query('SELECT * FROM trabayamain', function (error, results, fields) {
  if (error) throw error;
  });

router.post('/login', passport.authenticate('local.signin', {
    successRedirect: '/',
    failureRedirect: '"error caca"',
    failureFlash: true
}))

  // const test= connectionadri.query('SELECT * FROM trabayauser WHERE mail = ?', ['test@test.com'], function (error, results, fields){
  //   console.log (results[0].id)
  // });

passport.use('local.signin', new LocalStrategy({
  usernameField: 'mail',
  passwordField: 'contrasena',
  passReqToCallback: true 
  }
  ,async (req, username, password, done) => {
    const rows= await connectionadri.query('SELECT * FROM trabayauser WHERE mail = ?', [username]);   
    console.log (rows[0].id, "estes es el id")
    if (rows.length > 0) {
      const user = rows[0];
      console.log (user.contrasena)
      //password solo es el que enviar el usuario y user.passwrod es el de la db
      const validPassword = await helpersp.matchPassword(password, user.contrasena)
      console.log( "MIRA ACA A VER SI DICE TRUE O FALSE" +validPassword)
      if (validPassword) {
        done(null, user, req.flash('success', 'Welcome ' + user.username));
      } else {
        done(null, false, req.flash('message', 'Incorrect Password'));
      }}
      else {
        return done(null, false, req.flash('message', 'The Username does not exists.'));
      }
  }));


  //en mi ejemplo esto esta dentro de local strategy, pero en documentation no dice donde debe ir
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    const rows = await connectionadri.query('SELECT * FROM trabayauser WHERE id = ?', [id]);
    done(null, rows[0]);
  });
  

  
// router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true}))

// //si el browser te entrega el cookie, req. is authenticated (true) te redirige a next (en este caso index) 
// function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next()
//     }
//     res.redirect('/login')
//   }
  
//   //si el browser no te entrega el cookie, req. is authenticated (false) te redirige al login
//   function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return res.redirect('/')
//     }
//     next()
//   }

//   //corregir nomre de base de datos
  
//   const initializePassport = require('./passport-config')
// //funcion creada en passport config, tengo que reemplaze user por nombre de db de users?
// //Esta funcion tiene que estar en el scope de la ruta que usa  passport
// initializePassport(
//   passport,
//   email => trabayauser.find(user => user.email === email),
//   id => trabayauser.find(user => user.id === id)
// )


 

// router.get('/update/:id', customerController.edit);
// router.post('/update/:id', customerController.update);
// router.get('/delete/:id', customerController.delete);

module.exports = router;

