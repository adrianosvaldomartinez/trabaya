function crearmodales(modal1,idmodal,boton, idboton, cierre,idcierra ){
var modal1 = document.getElementById(idmodal);
// Get the button that opens the modal
var boton = document.getElementById(idboton);
// Get the <span> element that closes the modal
var cierre = document.getElementsByClassName(idcierra)[0];

// // When the user clicks the button, open the modal 
boton.onclick = function() {
  modal1.style.display = "block"
}
// // When the user clicks on <span> (x), close the modal
cierre.onclick = function() {
  modal1.style.display = "none"
}
// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == modal1) {
      modal1.style.display = "none"
  }
});}

crearmodales('modal',"myModal",'btn',"myBtn",'span' ,"closet");
crearmodales('modalregistro',"modalderegistro","btnregistro","registrarme","spanregistro" ,"closeregistro")
crearmodales('modallogueo',"modaldelogueo","btnlogueo","logearme","cierrelogueo" ,"closelogueo")







// genera la tabla y todos los datos-----------------------------------------------------------------------------------
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

//fetch para get--------------------------------------------------------
function actualizar () {return fetch('http://localhost:3000/b')
// .then(res=> console.log(res))
.then(res=> res.json())
.then(function (res){ let dbinteresados = res
//el lugar donde va a ir mi tabla
let tables = document.querySelector(".table"); 
//identifica y separa en un array solo los keys del objeto de acuerdo al indice que le di (o es el primero)si tengo mas key en otro indice, no van a aparecer
let data = Object.keys(dbinteresados[0]);
//llamado de funciones
generateTable(tables, dbinteresados);// generate the table first
generateTableHead(tables, data); // then the head
}) 
}

actualizar()

// mas 1000 contatos fueron logrados (contador de click en ver telefon)
// mas de 100 personas ofrecerieron su servicios (contador de personas que enviaron datos como empleado)
// mas de 50 empleadores buscaron contactar (cuenta y manda a suma solo el primer click en telefono de cada usuario) 

// formulario de ingreso de datos 
// anadirme a la lista 
// si estas logeado, 
// muetras una ventana donde podes ingresar tu datos (solo datos de db )









