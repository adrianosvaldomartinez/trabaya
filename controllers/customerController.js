const controller = {};
const bcrypt = require('bcrypt')

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM trabayamain', (err, trabayamain) => {
     if (err) {
      res.json(err);
     }
     res.send(trabayamain
    //  
    //  , {data: customers}
     );
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO trabayamain set ?', data, (err, trabayamain) => {
      console.log(trabayamain)
      res.redirect('/');
    })
  })
};
//achieve that hashedpassword is stored
controller.register = async (req, res) => {
  try {
    const mail = req.body.mail
    const contra = await bcrypt.hash(req.body.contrasena, 10)
    // const contra = req.body.contrasena
    console.log(mail)
    console.log(contra)

    req.getConnection((err, connection) => {
    // connection.query('INSERT INTO trabayauser (mail, contrasena) VALUES ?', [mail,contra] ,(err, trabayauser) => {
    // connection.query('INSERT INTO trabayauser (mail, contrasena) VALUES ("papa","locote")' ,(err, trabayauser) => {  
    connection.query('INSERT INTO trabayauser (mail, contrasena) VALUES ?',[[[mail,contra]]] ,(err, trabayauser) => {  
      res.redirect('/')
      console.log(trabayauser)
      })})}
   catch {
    res.send("error en el catch")
  }}

  // controller.register =  (req, res) => {
  //   try{res.send('<p>Nice to Eat Ya!</p>')}
       
  //    catch {
  //     res.redirect('/register')
  //   }
  // }




  module.exports = controller;


