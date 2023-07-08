let insertUser=document.getElementById("User");
let inicio_login=document.getElementById("inicio_login");
let cart_container=document.getElementById("cart-container");
let total=document.getElementById("total");
let confirmaCompra=document.getElementById("confirma-compra");
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
        <p class="card-title">${producto.nombre}</p>
        <p class="card-text">$${producto.precio}</p>
        <button class="btn btn-danger btn-sm elim-prod" id="borrar${idProd}">x</button>
        </div>
                                `;
  let precio = parseInt(producto.precio);
  sumaTotal = sumaTotal + precio;
  carritoContainer.appendChild(prodCarrito);
  let btnBorrar = document.getElementById(`borrar${idProd}`);
  btnBorrar.addEventListener("click", (e) => {
    
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
      carritoContainer.innerHTML = `
                                        <h3>El carrito está vacío</h3>
                                        <a class="login-submit btn btn-primary" href="../index.html">¡Compra algo!</a>
                                        `;
      confirmaCompra.style.display = "none";
    }
  });
});

function borrarProductos(e){
  let botonBorrar = e.target;
  botonBorrar.parentElement.remove();

}

if (carritoCompleto === undefined || carritoCompleto.length == 0) {
    carritoContainer.innerHTML = `
                                  <h3>El carrito está vacío</h3>
                                  <a class="login-submit btn btn-primary" href="../index.html">¡Compra algo!</a>
                                  `;
    confirmaCompra.style.display = "none";
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
  }
  function calcTotal() {
    if (sumaTotal == 0) {
      totalCarrito.style.display = "none";
    } else {
      totalCarrito.innerHTML = `Total $${sumaTotal}`;
    }
  }
  calcTotal();