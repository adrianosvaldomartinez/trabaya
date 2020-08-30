const controller = {};
const bcrypt = require('bcrypt')
const {connectionadri} = require('../conecction2');


//go main no se usa porque no encuentra reque dentro de ruta
function gomain (){
if(req.hasOwnProperty('user')){
  res.render('index.ejs', { 
    usuario :"Bienvenido"+ req.user.mail }   
  )
}
else{
  res.render('index.ejs', { 
    usuario :"Bienvenido visitante, porfavor logueate o registrate"
  })
}
}

controller.index = (req, res) => {
  if(req.hasOwnProperty('user')){
    res.render('index.ejs', { 
      usuario :"Bienvenido"+ req.user.mail }   
    )
  }
  else{
    res.render('index.ejs', { 
      usuario :"Bienvenido visitante, porfavor logueate o registrate"
    })
  }
}

controller.esconderme = (req, res) => {
  if(req.hasOwnProperty('user')){
    const databody = req.body;
    const dataid = req.user.id;
    console.log(dataid)
    req.getConnection((err, connection) => {
      if (err)
        {res.send("error en coneccion")}
      else {
       connection.query('UPDATE tablatraba SET oculto = 0 WHERE id = ? ', dataid, (err, tablatraba) => {
         if (err){
           console.log(err)
         }
        // UPDATE tablatraba SET estudio='primaria', movilidad='auto', sexo ='masculino', telefono= '111' WHERE id = 2;
        else {
          console.log(tablatraba)
          res.render('index.ejs', { 
            usuario :"Bienvenido"+ req.user.mail }   
        )}
        })
      }
    })
    }
  else {
  res.send("Solo los usuario logueados pueden borrar sus registros")
  }
};

controller.otrapaginatest = (req, res) => {
  res.redirect('publicbyserver.html')  
};

controller.cerrarsesion = (req, res) => {
  if(req.hasOwnProperty('user')){
    req.logout()
    res.render('index.ejs', { 
      usuario :"Bienvenido visitante, porfavor logueate o registrate"
    })
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
  res.render('index.ejs')
};

controller.list = (req, res) => {
    if(req.hasOwnProperty('user')){
      req.getConnection((err, conn) => {
        // conn.query('SELECT id, estudio, movilidad, sexo, telefono, SEC_TO_TIME(86400-((now()-ModifiedTime))) AS `Tiempo restante` FROM tablatraba WHERE ModifiedTime >= now() - INTERVAL 86400 SECOND AND oculto = 1', (err, tablatraba) => {
        conn.query('SELECT id, estudio, movilidad, sexo, telefono, SEC_TO_TIME(86400-(TIMEDIFF(now(),ModifiedTime))) AS `Tiempo restante` FROM tablatraba WHERE ModifiedTime >= now() - INTERVAL 86400 SECOND AND oculto = 1', (err, tablatraba) => {
        if (err) {
          res.json(err);
        }
        res.send(tablatraba);
        });
      });
    }
   else{
    req.getConnection((err, conn) => {
      // conn.query('SELECT id, estudio, movilidad, sexo, TELEFONE, SEC_TO_TIME(86400-((now()-ModifiedTime))) AS `Tiempo restante` FROM tablatraba WHERE ModifiedTime >= now() - INTERVAL 86400 SECOND AND oculto = 1', (err, tablatraba) => {
      conn.query('SELECT id, estudio, movilidad, sexo, TELEFONE, SEC_TO_TIME(86400-(TIMEDIFF(now(),ModifiedTime))) AS `Tiempo restante` FROM tablatraba WHERE ModifiedTime >= now() - INTERVAL 86400 SECOND AND oculto = 1', (err, tablatraba) => {
      if (err) {
        res.json(err);
      }
      res.send(tablatraba);
      });
    });

   }
}
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
       connection.query('UPDATE tablatraba SET ?,oculto = 1 WHERE id = ? ', [databody, dataid], (err, tablatraba) => {
         if (err){
           console.log(err)
         }
        // UPDATE tablatraba SET estudio='primaria', movilidad='auto', sexo ='masculino', telefono= '111' WHERE id = 2;
        console.log(tablatraba)
        if(req.hasOwnProperty('user')){
          res.render('index.ejs', { 
            usuario :"Bienvenido"+ req.user.mail }   
          )
        }
        else{
          res.render('index.ejs', { 
            usuario :"Bienvenido visitante, porfavor logueate o registrate"
          })
        }
        //la linea de abajo no funciona, era para redirigir a login , pero tampoco afecta funcionamiento
        // getElementById('modallogueo').style.display = "block"
        })
      }
    })
    }
  
  else{
  res.send("plz login")
  }
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
        
        res.render('index.ejs', { 
          usuario :"Bienvenido visitante, porfavor logueate o registrate"
        }) 
        // and click on btnlogueo
        console.log(tablatraba)
      })
    })
  }
  catch {
    res.send("error en el catch")
  }
}

  module.exports = controller;
  

