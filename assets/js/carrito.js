let insertUser=document.getElementById("User");
let inicio_login=document.getElementById("inicio_login");
let cart_container=document.getElementById("cart-container");
let total=document.getElementById("total");
let confirmaCompra=document.getElementById("confirma-compra");
let vaciarCarrito=document.getElementById("vaciar-carrito")
let sumaTotal=0;

const adminLogin = JSON.parse(localStorage.getItem("adminLogin")) || {
    admin: false,
  };
  

  if (adminLogin.admin) {
    inicio_login.innerText = "Cerrar Sesión";
    insertUser.innerHTML = `
                  <p id="user-name">Hola, Administrador</p> `;
  };
  let prodComprados = document.getElementById("prod-comprados");
let contadorProductos = localStorage.getItem("prod-comprados");

function contadorProd() {
  prodComprados.innerHTML = `${contadorProductos}`;
  prodComprados.style.display = "block";
  localStorage.setItem("prod-comprados", contadorProductos);
}
if (contadorProductos > 0 && contadorProductos != undefined) {
  contadorProd();
} else {
  prodComprados.style.display = "none";
  vaciarCarrito.style.display="none"
};
  let idProd = 0;
const carritoCompleto = JSON.parse(localStorage.getItem("carrito")) || [];

carritoCompleto.forEach((producto) => {
  let prodCarrito = document.createElement("div");
  
  if (carritoCompleto.length > 0) {
    idProd++;
  }
  prodCarrito.innerHTML = `
        <div class="cart-item">
        <a class="close-icon-carrito" id="delete${idProd}" href="carrito.html"><i class="fa-solid fa-xmark"></i></a>
        <p class="card-title">${producto.nombre}</p>
        <p class="card-text">$${producto.precio}</p>
        </div>
        
          `;
  let precio = parseInt(producto.precio);
  sumaTotal = sumaTotal + precio;
  cart_container.appendChild(prodCarrito);
 
 let Borrar_unidad = document.getElementById(`delete${idProd}`); 
  Borrar_unidad.addEventListener("click",(e)=>{
    sumaTotal=sumaTotal-precio
    calcTotal()
    contadorProductos--
    contadorProd();
    if (contadorProductos <= 0 || contadorProductos == undefined) {
      prodComprados.style.display = "none";
      localStorage.setItem("prod-comprados", 0);
    }
    borrarProductos(e);
   
    const index = carritoCompleto.indexOf(producto);
    if (index > -1) {
      carritoCompleto.splice(index, 1);
    }
    
    localStorage.setItem("carrito", JSON.stringify(carritoCompleto));
  
  if (carritoCompleto.length == 0) {
    cart_container.innerHTML = `
                     <h3>El carrito está vacío</h3>
                    <a class="login-submit btn btn-primary" href="../index.html">¡Compra algo!</a>
                                      `;
    confirmaCompra.style.display = "none";
    vaciarCarrito.style.display="none";
  }
})
  vaciarCarrito.addEventListener("click", (e) => {
    window.location.href="index.html"
    sumaTotal = sumaTotal - precio;
    calcTotal();
    contadorProductos--;
    contadorProd();
    if (contadorProductos <= 0 || contadorProductos == undefined) {
      prodComprados.style.display = "none";
      localStorage.setItem("prod-comprados", 0);
    }
    borrarProductos(e);
   
    const index = carritoCompleto.indexOf(producto);
    if (index > -1) {
      carritoCompleto.splice(index, 1);
    }
    
    localStorage.setItem("carrito", JSON.stringify(carritoCompleto));
    if (carritoCompleto.length == 0) {
      cart_container.innerHTML = `
                       <h3>El carrito está vacío</h3>
                      <a class="login-submit btn btn-primary" href="../index.html">¡Compra algo!</a>
                                        `;
      confirmaCompra.style.display = "none";
      vaciarCarrito.style.display="none";
    }
  });
});

function borrarProductos(e){
  let botonBorrar = e.target;
  botonBorrar.parentElement.remove();

}

if (carritoCompleto === undefined || carritoCompleto.length == 0) {
  cart_container.innerHTML = `
                                  <h3>El carrito está vacío</h3>
                                  <a class="login-submit btn btn-primary" href="../index.html">¡Compra algo!</a>
                                  `;
    confirmaCompra.style.display = "none";
    vaciarCarrito.style.display="none";

  } else {
    
    confirmaCompra.style.display = "block";
   
    confirmaCompra.onclick = (e) => {
      localStorage.setItem("prod-comprados", 0);
      e.preventDefault();
      
      while (carritoCompleto.length > 0) {
        carritoCompleto.pop();
      }
      localStorage.setItem("carrito", JSON.stringify(carritoCompleto));
     
      
      Swal.fire(
        "¡Muchas gracias por su compra!",
        "¡Que tenga un buen día!",
        "success"
      ).then((resultado) => {
        if (resultado.isConfirmed) {
          window.location.reload();
        }
      });
    };
    vaciarCarrito.style.display="block";
    vaciarCarrito.addEventListener("click",function(){
      e.preventDefault()
      while(document.getElementById("cart-item").firstChild){
        document.getElementById("cart-item").removeChild;
      }
    })
      
      }
                                                            
  function calcTotal() {
    if (sumaTotal == 0) {
      total.style.display = "none";
    } else {
      total.innerHTML = `Total $${sumaTotal}`;
    }
  }
  calcTotal();
