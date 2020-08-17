const controller = {};
const bcrypt = require('bcrypt')


// SELECT EXISTS (SELECT * FROM trabayauser WHERE mail = 'papa' AND contrasena = 'locote')
// SELECT * FROM trabayauser WHERE mail = 'papa' AND contrasena = 'locote'
// SELECT id FROM trabayauser WHERE mail = 'mail' 
// conn.query ('SELECT * FROM trabayauser WHERE mail = ? AND contrasena = ?'),

// controller.login = async(req, res) => {
//    {
//   console.log (req.body.mail)
//   console.log (req.body.contrasena)  
// let userprovided="papa"
// let paswordprovided="1"
// req.getConnection ((err, conn) => {
//    conn.query ('SELECT * FROM trabayauser WHERE mail = ?', [req.body.mail],

//   (err, infobtenida) => {
//     console.log (err)
//     console.log (infobtenida) 
//     res.send(infobtenida)
//   })})
//   }
//   }
controller.cerrarsesion = (req, res) => {
  if(req.hasOwnProperty('user')){
    req.logout()
    res.redirect('/')
  } 
  else{
    res.send("no estas logeado")
  };
  
};

controller.sabersesion = (req, res) => {
  console.log ("xxxxxxxxxxxxxxxxxxxxxxxx")
  if(req.hasOwnProperty('user')){
    console.log(req.user.id)
  } 
  else{
    res.send("plz login")
  };
  console.log ("el boton JAJAJAJAJAJ")
  res.redirect('/')
};



controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT id, estudio, movilidad, sexo, telefono FROM tablatraba', (err, tablatraba) => {
     if (err) {
      res.json(err);
     }
     res.send(tablatraba);
    //  
    //  , {data: customers}  
    });
  });
};

controller.save = (req, res) => {
  if(req.hasOwnProperty('user')){
    const databody = req.body;
    const dataid = req.user.id;
    console.log(databody)
    console.log(dataid)
    req.getConnection((err, connection) => {
      if (err)
        {res.send("error en coneccion")}
      else {
       connection.query('UPDATE tablatraba SET ? WHERE id = ? ', [databody, dataid], (err, tablatraba) => {
         if (err){
           console.log(err)
         }
        // UPDATE tablatraba SET estudio='primaria', movilidad='auto', sexo ='masculino', telefono= '111' WHERE id = 2;
        console.log(tablatraba)
        res.redirect('/')
        //la linea de abajo no funciona, era para redirigir a login , pero tampoco afecta funcionamiento
        // getElementById('modallogueo').style.display = "block"
        })
      }
    })
    }
  
  else
  res.send("plz login")
};
// achieve that hashedpassword is stored
controller.register = async (req, res) => {
  try {
    const mail = req.body.mail
    const contra = await bcrypt.hash(req.body.contrasena, 10)
    console.log(mail)
    console.log(contra)
    req.getConnection((err, connection) => {
      connection.query('INSERT INTO tablatraba (mail, contrasena) VALUES ?',[[[mail,contra]]],
      (err, tablatraba) => { 
        console.log("respuesta existosa") 
        
        res.redirect('/') 
        // and click on btnlogueo
        console.log(tablatraba)
      })
    })
  }
  catch {
    res.send("error en el catch")
  }
}

  // controller.register =  (req, res) => {
  //   try{res.send('<p>Nice to Eat Ya!</p>')}
       
  //    catch {
  //     res.redirect('/register')
  //   }
  // }
  module.exports = controller;
  

