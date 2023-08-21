const nav = document.querySelector(".nav");

window.addEventListener('scroll', function () {
  nav.classList.toggle('active', window.scrollY > 0);
});

let btnCrear = document.getElementById("btn-crear");
let formulario = document.getElementById("formulario");
let inicio_login = document.getElementById("inicio_login");
let insertUser = document.getElementById("User");

let deletableProd = false;

let btnLogin = document.getElementById("btn-login");
insertUser.style.display="None";

const adminLogin = JSON.parse(localStorage.getItem("adminLogin")) || {
  admin: false
};

if (adminLogin.admin) {
  inicio_login.innerText = "Cerrar";
  insertUser.style,display="flex";
  insertUser.innerHTML = `
    <p id="user-name">Hola, Administrador</p>
    `;
  deletableProd = true;
} else {
  deletableProd = false;
  btnCrear.style.display = "none";
}

const estadoFormulario = {
  mostrar: false,
};
btnCrear.onclick = (e) => {
  e.preventDefault();
  if (estadoFormulario.mostrar) {
    btnCrear.innerText = "Crear un producto";
    formulario.style.display = "none";
    estadoFormulario.mostrar = false;
  } else {
    btnCrear.innerText = "Cancelar";
    formulario.style.display = "flex";
    estadoFormulario.mostrar = true;
  }
  
};


const contenido = document.getElementById("contenido");
const carrito_1 = document.getElementById("carrito_1");

const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const img=document.getElementById("ImagenAñadir");

class producto {
  constructor(nombre, precio, id, img) {

    this.nombre = nombre;
    this.precio = precio;
    this.id = id;
    this.img=img;
  }
}
let productos = JSON.parse(localStorage.getItem("productos")) || [];

if (productos.length===0) {

  productos = [
    {
     
      nombre: "PES 6",
      precio: 30000,
     id:1,
      img:"https://i.3djuegos.com/juegos/1506/pro_evolution_soccer_6/fotos/ficha/pro_evolution_soccer_6-1681866.webp"
    },
    {
      nombre: "EA SPORTS FC 24",
      precio: 20000,
      id: 2,
      img:"https://prod.assets.earlygamecdn.com/images/EA-Sports-FC-Cover-Messi.png?transform=article3x_webp"

    }

  ];
  localStorage.setItem("productos", JSON.stringify(productos));
} 

function displayDefaultProducts() {
  

  defaultProducts.forEach((elemento) => {
    let nodo = document.createElement("div");
    nodo.setAttribute("class", "card");
    nodo.setAttribute("style", "width: 18rem;");
    nodo.innerHTML = `
      <img src="${elemento.img}" class="card-img-top" style="width: 50%;" >
      <div class="card-body" id="card-body">
          <h5 class="card-title">${elemento.nombre}</h5>
          <p class="card-text">$${elemento.precio}</p>
          <button class="btn btn-primary" id="button${elemento.id}">Añadir al carrito</button>
      </div>
      `;
    if (deletableProd) {
      nodo.innerHTML += `
        <a class="close-icon" id="delete${elemento.id}"><i class="fa-solid fa-xmark"></i></a>
        `;
    }
    document.getElementById("contenido").appendChild(nodo);
    const addToCart = document.getElementById(`button${elemento.id}`);
    addToCart.addEventListener("click", () => {
      carrito.unshift(elemento);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      Swal.fire("Agregaste: " + elemento.nombre);
    });
  });

  const deleteButtons = document.querySelectorAll(".close-icon");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (e) => {
      const buttonId = e.currentTarget.id;
      const idToDelete = parseInt(buttonId.substring(6));
      const deleteIndex = productos.findIndex((product) => product.id === idToDelete);
      if (deleteIndex !== -1) {
        productos.splice(deleteIndex, 1);
        localStorage.setItem("productos", JSON.stringify(productos));
        const cardToDelete = document.querySelector(`#delete${idToDelete}`).parentNode;
        cardToDelete.parentNode.removeChild(cardToDelete);

        
        if (productos.length === 0) {
          localStorage.removeItem("productos");
          displayDefaultProducts();
        }
      }
    });
  });
}

let id = productos.length;

const agregarProducto = () => {
  let nombreValue = nombre.value;
  nombreValue = nombreValue.toUpperCase();
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].nombre === nombreValue) {
      Swal.fire("Producto ya existe");
      return false;
    }
  }
  let precioValue = precio.value;
  let imgValue=img.value;
  id++;
  let productoNuevo = new producto(nombreValue, precioValue, id,imgValue);
  productos.unshift(productoNuevo);

  localStorage.setItem("productos", JSON.stringify(productos));
  return productoNuevo;
};

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let btnAñadir = document.getElementById("añadir");

btnAñadir.addEventListener("click", (e) => {
  e.preventDefault();
  if (nombre.value !== "" && precio.value !== "") {
    document.getElementById("contenido").innerHTML = "";
    const productoAgregado = agregarProducto();
    if (productoAgregado) {
      document.getElementById("nombre").value = "";
      document.getElementById("precio").value = "";
      document.getElementById("ImagenAñadir").value="";
    }

    productos.forEach((elemento) => {
      let nodo = document.createElement("div");
      nodo.setAttribute("class", "card");
      nodo.setAttribute("style", "width: 18rem;");
      nodo.innerHTML = `
                  <img src="${elemento.img}" class="card-img-top" style="width: 50%;">
                  <div class="card-body" id="card-body">
                      <h5 class="card-title">${elemento.nombre}</h5>
                      <p class="card-text">$${elemento.precio}</p>
                      <button class="btn btn-primary" id="button${elemento.id}">Añadir al carrito</button>
                  </div>
              `;
      if (deletableProd) {
        nodo.innerHTML += `
                      <a class="close-icon" id="delete${elemento.id}"><i class="fa-solid fa-xmark"></i></a>
                      `;
      }
      document.getElementById("contenido").appendChild(nodo);
      const addToCart = document.getElementById(`button${elemento.id}`);
      addToCart.addEventListener("click", () => {
        carrito.unshift(elemento);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        Swal.fire("Agregaste: " + elemento.nombre);
      });
    });

    const deleteButtons = document.querySelectorAll(".close-icon");
    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", (e) => {
        const buttonId = e.currentTarget.id;
        const idToDelete = parseInt(buttonId.substring(6));
        const deleteIndex = productos.findIndex((product) => product.id === idToDelete);
        if (deleteIndex !== -1) {
          productos.splice(deleteIndex, 1);
          localStorage.setItem("productos", JSON.stringify(productos));
          const cardToDelete = document.querySelector(`#delete${idToDelete}`).parentNode;
          cardToDelete.parentNode.removeChild(cardToDelete);
        }
      });
    });
  } else {
    Swal.fire("Por favor, ingrese un valor en ambos campos");
  }
  displayDefaultProducts()
});

let prod_comprados = document.getElementById("prod-comprados");
let contadorProductos = parseInt(localStorage.getItem("prod-comprados")) || 0;

function contadorProd() {
  prod_comprados.innerHTML = `${contadorProductos}`;
  prod_comprados.style.display = "block";
  localStorage.setItem("prod-comprados", contadorProductos);
}

if (contadorProductos > 0) {
  contadorProd();
} else {
  prod_comprados.style.display = "none";
}

productos.forEach((elemento) => {
  let nodo = document.createElement("div");
  nodo.setAttribute("class", "card");
  nodo.setAttribute("style", "width: 18rem;");
  nodo.innerHTML = `
              <img src="${elemento.img}" class="card-img-top" style="width: 50%;">
              <div class="card-body" id="card-body">
                  <h5 class="card-title">${elemento.nombre}</h5>
                  <p class="card-text">$${elemento.precio}</p>
                  <button class="btn btn-primary" id="button${elemento.id}">Añadir al carrito</button>
              </div>
              `;
  if (deletableProd) {
    nodo.innerHTML += `
              <a class="close-icon" id="delete${elemento.id}"><i class="fa-solid fa-xmark"></i></a>
              `;
  }


  document.getElementById("contenido").appendChild(nodo); 
  const addToCart = document.getElementById(`button${elemento.id}`);
  addToCart.addEventListener("click", () => {
    carrito.unshift(elemento);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire("Agregaste: " + elemento.nombre);
  });
});

const deleteButtons = document.querySelectorAll(".close-icon");
deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", (e) => {
    const buttonId = e.currentTarget.id;
    const idToDelete = parseInt(buttonId.substring(6));
    const deleteIndex = productos.findIndex((product) => product.id === idToDelete);

    if (deleteIndex !== -1) {
      productos.splice(deleteIndex, 1);
      localStorage.setItem("productos", JSON.stringify(productos));
      const cardToDelete = document.querySelector(`#delete${idToDelete}`).parentNode;
      cardToDelete.parentNode.removeChild(cardToDelete);
    }
  });
});

//// CAMBIO DE MONEDA 
const monedaEl_one = document.getElementById('moneda-uno');
const monedaEl_two = document.getElementById('moneda-dos');
const cantidadEl_one = document.getElementById('cantidad-uno');
const cantidadEl_two = document.getElementById('cantidad-dos');
const cambioEl = document.getElementById('cambio');
const tazaEl = document.getElementById('taza');


function calculate(){
    const moneda_one = monedaEl_one.value;
    const moneda_two = monedaEl_two.value;

   fetch(`https://api.exchangerate-api.com/v4/latest/${moneda_one}`)
   .then(res => res.json() )
   .then(data => {
       const taza = data.rates[moneda_two];
       
       cambioEl.innerText = `1 ${moneda_one} = ${taza} ${moneda_two}`;

       cantidadEl_two.value = (cantidadEl_one.value * taza).toFixed(2);

    } );
    
}

monedaEl_one.addEventListener('change', calculate);
cantidadEl_one.addEventListener('input', calculate);
monedaEl_two.addEventListener('change', calculate);
cantidadEl_two.addEventListener('input', calculate);

taza.addEventListener('click', () =>{
    const temp = monedaEl_one.value;
    monedaEl_one.value = monedaEl_two.value;
    monedaEl_two.value = temp;
    calculate();
} );


calculate();

