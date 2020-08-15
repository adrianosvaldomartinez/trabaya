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

controller.sabersesion = (req, res) => {
  console.log ("xxxxxxxxxxxxxxxxxxxxxxxx")
  console.log (req.user.id) 
  
  console.log ("el boton JAJAJAJAJAJ")
  res.redirect('/')
  
};



controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM trabayamain', (err, trabayamain) => {
     if (err) {
      res.json(err);
     }
     res.send(trabayamain);
    //  
    //  , {data: customers}  
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO trabayamain set ?', data, (err, trabayamain) => {
      console.log(trabayamain)
      res.redirect('/')
      //la linea de abajo no funciona, era para redirigir a login , pero tampoco afecta funcionamiento
      // getElementById('modallogueo').style.display = "block"
    })
  })
};
// achieve that hashedpassword is stored
controller.register = async (req, res) => {
  try {
    const mail = req.body.mail
    const contra = await bcrypt.hash(req.body.contrasena, 10)
    console.log(mail)
    console.log(contra)
    req.getConnection((err, connection) => {
      connection.query('INSERT INTO trabayauser (mail, contrasena) VALUES ?',[[[mail,contra]]],
      (err, trabayauser) => { 
        console.log("respuesta existosa") 
        
        res.redirect('/') 
        // and click on btnlogueo
        console.log(trabayauser)
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
  

