const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

// en este proceso se entra solo cuando estas haciendo un login, para generarte tu cookie 
//initialize recibe el password y el email y chequea si esta en la bd y le crea un cookie, serialize
function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (mail, contrasena, done) => {
    const user = getUserByEmail(mail)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(contrasena, trabaya.contrasena)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'mail',passwordField: 'contrasena' }, authenticateUser))
  //envia al browser el cookie
  passport.serializeUser((user, done) => done(null, user.id))
  //envia al servidor el cookie
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize