mysql = require('mysql')
const { promisify }= require('util');
/////////////////////////////////////////////////////////////////////////
const connectionadri = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'trabaya1'
  }, 'single');
  
  connectionadri.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connectionadri.threadId);
  });
 
  
 

//   connectionadri.query('SELECT * FROM trabayamain', function (error, results, fields) {
//   if (error) throw error;

//   else(console.log(results))  });
// Promisify Pool Querys
connectionadri.query = promisify(connectionadri.query);



  module.exports =  {connectionadri}