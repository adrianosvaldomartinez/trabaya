mysql = require('mysql')
const { promisify }= require('util');
const { all } = require('./routes/customer');
/////////////////////////////////////////////////////////////////////////
// const connectionadri = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     port: 3306,
//     database: 'trabaya1'
//   }, 'single');

var db_config ={
  host: 'us-cdbr-east-02.cleardb.com',
  user: 'be2b611aeaf7f0',
  password: 'f986f3e0',
  port: 3306,
  database: 'heroku_013a915d24208e2'
}
todo ()
function todo(){
// const connectionadri = mysql.createConnection(db_config, 
const connectionadri = mysql.createPool(db_config, 
  'pool'
  );
// connectionadri.connect(function(err) { 
  // if (err) {
  //   console.error('error ADRIIIII connecting: ' + err.stack);
  //   setTimeout(handleDisconnect, 2000);
  // }
  // console.log('connected conectionadri as id ' + connectionadri.threadId);
// }
// );

connectionadri.on('error', function(err) {
  console.log('db error', err);
  if(err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log("LA GRAAAANA POROOOOONGAAAAAAA")
    handleDisconnect();
    console.log("LA 777777777777777777777777777777777777777777777")

  } else {
    throw err;   
  }
});

connectionadri.query = promisify(connectionadri.query);
module.exports =  {connectionadri}
}

function handleDisconnect() {
  todo()
};