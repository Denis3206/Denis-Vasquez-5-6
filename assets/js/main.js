const nav = document.querySelector(".nav");

window.addEventListener('scroll',function(){
    nav.classList.toggle('active', window.scrollY >0)
})


 let btnCrear = document.getElementById("btn-crear");
let formulario = document.getElementById("formulario");
let inicio_login= document.getElementById("inicio_login");
let insertUser=document.getElementById("User")
let prod_comprados=document.getElementById("prod-comprados");
let deletableProd= false;

let  btnLogin=document.getElementById("btn-login");


const adminLogin=JSON.parse(localStorage.getItem("adminLogin")) || {
    admin:false
}

if (adminLogin.admin){
    inicio_login.innerText="Cerrar";
    
    insertUser.innerHMTL = `
    <p id="user-name">Hola, Administrador</p>
    `
    deletableProd=true;
    }
    else{
        deletableProd=false;
        btnCrear.style.display="none";

    }

    const estadoFormulario ={
        mostrar:false,
    };
    btnCrear.onclick=(e)=>{
        e.preventDefault();
        if(estadoFormulario.mostrar){
            btnCrear.innertext="Crear un producto";
            formulario.style.display="none";
            estadoFormulario.mostrar=false
        }
        else {
            btnCrear.innerText="cancelar";
            formulario.style.display="flex";
            estadoFormulario.mostrar=true;
        }
    };




///////////////////////////////
const contenido =document.getElementById("contenido");
const cart_container=document.getElementById("cart-container");
const carrito_1=document.getElementById("carrito_1");

const nombre=document.getElementById("nombre")
const precio=document.getElementById("precio")

class producto{
    constructor(id,nombre,precio){
        this.id=id
        this.nombre=nombre
        this.precio=precio
       
    }
}
let productos=[]

if(!localStorage.getItem("prod")){

productos=[
    {
        id:1,nombre: "Pes 6", precio:30000},
    {id:2,nombre:"Fifa 23", precio:20000}
    
];
localStorage.setItem("prod",JSON.stringify(productos));
}
else{
    productos=JSON.parse(localStorage.getItem("prod"));
};


let id = productos.length;
const agregarProducto = () => {
  let nombre = document.getElementById("nombre").value;
  nombre = nombre.toUpperCase();
  let precio = document.getElementById("precio").value;
  id++;
  let productoNuevo = new producto(nombre, precio, id);
  productos.unshift(productoNuevo);
  
  localStorage.setItem("prod", JSON.stringify(productos));
  return productoNuevo;
}


const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let btnAñadir = document.getElementById("añadir");

btnAñadir.addEventListener("click", (e) => {
    e.preventDefault();
    if (nombre.value != "" && precio.value != "") {
      document.getElementById("contenido").innerHTML = "";
      agregarProducto();
      document.getElementById("nombre").value = "";
      document.getElementById("precio").value = "";

        productos.forEach((elemento) => {
        let nodo = document.createElement("div");
        nodo.setAttribute("class", "card");
        nodo.setAttribute("style", "width: 18rem;");
        nodo.innerHTML = `
                  <img src="https://dummyimage.com/600x400/000/fff" class="card-img-top" alt="${elemento.nombre}">
                  <div class="card-body" id="card-body">
                      <h5 class="card-title">${elemento.nombre}</h5>
                      <p class="card-text">$${elemento.precio}</p>
                      <button class="btn btn-primary" id="button${elemento.id}">Añadir al carrito</button>
                  </div>
              `;
        document.getElementById("contenido").appendChild(nodo);
        const addToCart = document.getElementById(`button${elemento.id}`);
        const deleteProduct = document.getElementById(`delete${elemento.id}`);
        if (deletableProd) {
          nodo.innerHTML += `
                      <a class="close-icon" id="delete${elemento.id}"><i class="fa-solid fa-xmark"></i></a>
                      `;
        }
        addToCart.addEventListener("click", () => {
            contadorProductos++;
            contadorProd();
            carrito.unshift(elemento);
            localStorage.setItem("carrito", JSON.stringify(carrito));

            Swal.fire("Agregaste: " + elemento.nombre);
          });
          document.addEventListener("DOMContentLoaded", function () {
            deleteProduct.addEventListener("click", () => {
              let deleteIndex = productos.findIndex(function (product) {
                return product.nombre === elemento.nombre;
              });
              if (deleteIndex !== -1) {
                productos.splice(deleteIndex, 1);
                document.getElementById("contenido").removeChild(nodo);
                localStorage.setItem("prod", JSON.stringify(productos));
              }
            });
          });
        });
      } else {
        Swal.fire("Por favor, ingrese un valor en ambos campos");
      }
    });

    let contadorProductos = localStorage.getItem("prod-comprados");

/* function contadorProd() {
  
  prod_Comprados.innerHTML = `${contadorProductos}`;
  prod_Comprados.style.display = "block";
  localStorage.setItem("prod-comprados", contadorProductos);
}
if (contadorProductos > 0 && contadorProductos != undefined) {
  contadorProd();
} else {
  prod_Comprados.style.display = "none";
} */


    productos.forEach((elemento) => {
        let nodo = document.createElement("div");
        nodo.setAttribute("class", "card");
        nodo.setAttribute("style", "width: 18rem;");
        nodo.innerHTML = `
              <img src="https://dummyimage.com/600x400/000/fff" class="card-img-top" alt="${elemento.nombre}">
              <div class="card-body" id="card-body">
                  <h5 class="card-title">${elemento.nombre}</h5>
                  <p class="card-text">$${elemento.precio}</p>
                  <button class="btn btn-primary" id="button${elemento.id}">Añadir al carrito</button>
              </div>
              `;
        document.addEventListener("DOMContentLoaded", function () {
          if (deletableProd) {
            nodo.innerHTML += `
              <a class="close-icon" id="delete${elemento.id}"><i class="fa-solid fa-xmark"></i></a>
              `;
            const deleteProduct = document.getElementById(`delete${elemento.id}`);
            console.log(deleteProduct);
            deleteProduct.addEventListener("click", () => {
              let deleteIndex = productos.findIndex(function (product) {
                return product.nombre === elemento.nombre;
              });
              if (deleteIndex !== -1) {
                productos.splice(deleteIndex, 1);
                document.getElementById("contenido").removeChild(nodo);
                localStorage.setItem("productos", JSON.stringify(productos));
              }
            });
          }
        });
      
        document.getElementById("contenido").appendChild(nodo);
        const addToCart = document.getElementById(`button${elemento.id}`);
        addToCart.addEventListener("click", () => {
            contadorProductos++;
            contadorProd();

        carrito.unshift(elemento);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        Swal.fire("Agregaste: " + elemento.nombre);
      })
    });
   

 /* let carrito1=[]
productos.forEach((el)=>{
        let nodo = document.createElement("div");
        nodo.className="producto";
        nodo.setAttribute("id",el.nombre);
        nodo.innerHTML=`

        <img src="${"https://dummyimage.com/600x400/000/fff"} ">"
        <h2>${el.nombre}</h2>
        <p class="precio">${el.precio}</p>`;
        contenido.append(nodo);
        

        let agregar =document.createElement("button")
        agregar.innerText="Agregar"
        agregar.className="Agregar"
        nodo.append(agregar);
       
        agregar.addEventListener("click",()=>{
            carrito.push({
            id:el.id,
            img:el.img,
            nombre:el.nombre,
            precio:el.precio
           });
           console.log(carrito1);
        })

}) */
/* carrito_1.addEventListener("click",()=>{


const modalHeader=document.createElement("div");
modalHeader.className="modal-header"
modalHeader.innerHTML=`
<h1 class="modal-header-title">Carrito.</h1>`;

cart_container.append(modalHeader);
const modalbutton=document.createElement("h1");
modalbutton.innerText="X";
modalbutton.className="modal-button";

modalHeader.append(modalbutton)


})   */




/* 
const agregarProducto =() =>{
    let nombre=document.getElementById("nombre").value;
    nombre=nombre.toUpperCase();
    let precio = document.getElementById("precio").value;
    let productoNuevo =new producto(nombre,precio);
    productos.unshift(productoNuevo);

    localStorage.setItem("productos", JSON.stringify(productos));
    return productoNuevo;
}; */