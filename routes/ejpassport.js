var passport = require('passport')
LocalStrategy = require('passport-local').Strategy;

//en el ejemplo que uso, bajo initialize hace el proceso de buscar el usuario y contra en la bd
app.use(passport.initialize());
  app.use(passport.session());

  //en mi ejemplo esto esta dentro de local strategy, pero en documentation no dice donde debe ir
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


//local strategy (defne la estrategia local, (verificar que si el usuario y la contra coinciden con la db))
passport.use(new LocalStrategy({
    //aclarar como es el name de nuestro use y password
    usernameField: 'mail',
    passwordField: 'contrasena'
  },
  //aca es donde compara el user y el passwrod con la db?
    function(username, password, done) {
      //aqui abajo User con mayuscala hace referencia a la DB
        User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        //exito, ususario autenticado, se pasa a passpor el usario que autentico
        return done(null, user);
 //     (esto es usa si hay error en la db)
        // return done(err,{ message: 'Incorrect password.' });
      });
    }
  ));




//Route (ejecuta la estrategia local)
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);



