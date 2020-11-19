//hacer la pr

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', actualizar())
} else {
  actualizar()
}

function openandcloseinstrucction(){
  var instructions = document.getElementById("instructions");
  var botoncerrar = document.getElementById("botoncerrar");
  var botonshowinstrucction = document.getElementById("showinstructions");

  botoncerrar.onclick = function() {
    instructions.style.display = "none"
  }
  botonshowinstrucction.onclick = function() {
    instructions.style.display = "block"
  }
}
openandcloseinstrucction()




function openSlideMenu(){
  document.getElementById('side-menu').style.width = '250px';
  document.getElementById('main').style.marginLeft = '250px';
}

function closeSlideMenu(){
  document.getElementById('side-menu').style.width = '0';
  document.getElementById('main').style.marginLeft = '0';
}



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

//FUNCIONES QUE SE LLAMAN TAMBIEN AL ABRIR LA PAGINA, COMO PARA QUE ESTEN LISTAS CUANDO HACES CLICK Y MOSTRARTE EL MODAL
crearmodales('modal',"myModal",'btn',"myBtn",'span' ,"closet");
crearmodales('modalregistro',"modalderegistro","btnregistro","registrarme","spanregistro" ,"closeregistro")
crearmodales('modallogueo',"modaldelogueo","btnlogueo","logearme","cierrelogueo" ,"closelogueo")

// genera la tabla y mete los datos que se le da como parametro-----------------------------------------------------------------------------------
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

//def de de funcion para realizar el fetch de los datos para poblar la tabla y luego llama las funciones que crean y muestran la tabla ---
//usar para probar en red local, si se usa este, no va generar tabla porque no trae ningun dato
function actualizar () {return fetch('https://trabayapy.herokuapp.com/b')
// usar para probar fuera de red local
// function actualizar () {return fetch('http://181.126.2.189:3000/b')

// function actualizar () {return fetch('http://192.168.0.5:3000/b')


.then(res=> res.json())
.then(function (res){ let dbinteresados = res
//el lugar donde va a ir mi tabla
let tables = document.querySelector(".table"); 
//identifica y separa en un array solo los keys del objeto de acuerdo al indice que le di (o es el primero)si tengo mas key en otro indice, no van a aparecer
let data = Object.keys(dbinteresados[0]);
//llamado de funciones de generacion de tablas
generateTable(tables, dbinteresados);// generate the table first
generateTableHead(tables, data); // then the head
}) 
}
//llamado a la funcion para que la tabla se actualize con los datos de la bd, LLAMAR AL ABRIR LA PAGINA
// actualizar()

// var areamensaje = document.getElementById("testeo");
// if (message != null){
//     consolelog (mesage)
//     areamensaje.innerHTML +="<h3>opa lalalaaaaa</h3>"
//   }




// mas 1000 contatos fueron logrados (contador de click en ver telefon)
// mas de 100 personas ofrecerieron su servicios (contador de personas que enviaron datos como empleado)
// mas de 50 empleadores buscaron contactar (cuenta y manda a suma solo el primer click en telefono de cada usuario) 

// formulario de ingreso de datos 
// anadirme a la lista 
// si estas logeado, 
// muetras una ventana donde podes ingresar tu datos (solo datos de db )









