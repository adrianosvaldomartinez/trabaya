
//fetch para get--------------------------------------------------------
function actualizar () {return fetch('http://localhost:3000/b')
// .then(res=> console.log(res))
.then(res=> res.json())
}

async function pepe () {
  databd =await actualizar()
 console.log(databd[1].movilidad)
 console.log (databd[1])
}
pepe()



//   {
//   if(res.ok){
//     console.log("fetch exitoso")
//   } else{
//     console.log("fetch erroneo")
//   }
// }

// .then(res=> let databd = res
// .catch(error=> console.log("error de algun then"))
// }
// console.log(actualizar())


// async function guardarultimaactualizacion() {
//   const databd = await actualizar()}


 


//   guardarultimaactualizacion()
  // let databd = actualizar()
  // console.log (databd)




//fetch para post-------------------------------------------------------
// fetch('path', {
//   method: 'POST',
//   headers:{
//     'Content type' : 'aplication/json'
//   },
//   body: JSON.stringify({
//     name: 'contenido de prueba'
//   })
// })
// .then(res=>{
//   if(res.ok){
//     console.log("fetch exitoso")
//   } else{
//     console.log("fetch erroneo")
//   }
// })
// .then(data=> console.log (data))
// .catch(error=> console.log("error atajado en catch"))





// hacer formulario de carga de datos  y armar un objeto con esos datos
// recibir  datos de formulario y estructurar en uan tabla

// -----------------------------------------------------------------------------------------------------------sacar 1 comentario
var dbinteresados  = databd 
// [
//     {id:1, estudio:"primaria", movilidad:"auto",sexo:"masculino"},
//     {id:2, estudio:"secundaria", movilidad:"moto",sexo:"femenino"},
//     {id:3, estudio:"universitario",movilidad:"moto",sexo:"femenino"}
// ]


// enviar estos valores a la tabla 
// iterar por cada uno de los objetos del array
// enviar id a tr 

// for (var i = 0; i < 9; i++) {
//     n += i;
//     mifuncion(n);
//  }

//el lugar donde va a ir mi tabla
let tables = document.querySelector(".table"); 

//identifica y separa en un array solo los keys del objeto de acuerdo al indice que le di (o es el primero)si tengo mas key en otro indice, no van a aparecer
let data = Object.keys(dbinteresados[0]);
//verificacion de punto anterior
// console.log(data)

// genera la tabla y todos los datos
function generateTable(table, data) {
    for (let valoriterableAM of data) { // por cada VALOR del array (como es posible si data solo tenia la cabecera(4 VALORES) e inserto 3 rows)
      let row = table.insertRow();
      for (valordelkey in valoriterableAM) { // por cada key del objeto iterado en ese momento
        let cell = row.insertCell();
        let text = document.createTextNode(valoriterableAM[valordelkey]);//
        cell.appendChild(text);
      }
    }
  }

// genera solo los table headers
  function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }
  
  

//llamado de funciones
  generateTable(tables, dbinteresados);// generate the table first
  generateTableHead(tables, data); // then the head