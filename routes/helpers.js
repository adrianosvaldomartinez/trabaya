const bcrypt = require('bcrypt');
const { promisify }= require('util');
const helpers = {};
const value =[]

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword)
    //  console.log (value[0])
  } 
  catch (e) {
    console.log(e)
  }
};


// helpers.matchPassword("test","$2b$10$Uxy4zNWmf9V8Ipi2MS05B.am00vwgAeY9h87FYYrsBVq7yXpkLNle")
                              
                              

// helpersp = promisify(helpers.matchPassword);

//  async function usar  (helpersp(test,test){
//     try{ 
//       let veamos = await helpers.matchPassword ("test", "test")
//       (console.log(veamos))
//       }
//       catch(error){console.log("error")}
//   })


// const validPassword = await helpersp.matchPassword(password, user.contrasena)
//   if (validPassword) {
//     done(null, user, req.flash('success', 'Welcome ' + user.username));
//   } 
//   else {
//   done(null, false, req.flash('message', 'Incorrect Password'));
//   }
//   else {
//   return done(null, false, req.flash('message', 'The Username does not exists.'));
//   }



module.exports = helpers;
