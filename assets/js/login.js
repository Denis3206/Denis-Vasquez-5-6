///FONDO LOGIN
const particleBackground = document.querySelector('.particle-background');

for (let i = 0; i < 50; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.style.width = `${Math.random() * 10}px`;
  particle.style.height = `${Math.random() * 10}px`;
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
  particleBackground.appendChild(particle);
}
////////////
const Usuario = document.getElementById("Usuario");
const Contraseña=document.getElementById("Contraseña");
let login =document.getElementById("login");
let inicio_login= document.getElementById("inicio_login");

let  btnLogin=document.getElementById("btn-login");
/* let insertUser=document.getElementById("User"); */

const adminLogin=JSON.parse(localStorage.getItem("adminLogin")) || {
    admin:false
}

if (adminLogin.admin){
/* insertUser.innerHTML=`<p id="user-name">Hola, Administrador</p>`; */
inicio_login.innerText="Cerrar";
login.innerHTML=""
login.innerHTML=`<h1>Hola, admin</h1>
<button type="submit" class="login-submit btn btn-primary" id="btn-unlog">Cerrar Sesión</button>
`;
let btnUnlog = document.getElementById("btn-unlog");
btnUnlog.onclick = (e) => {
    e.preventDefault();
    adminLogin.admin = false;
    localStorage.setItem("adminLogin", JSON.stringify(adminLogin));
    window.location.reload();
}

}


btnLogin.onclick = (e) => {
    e.preventDefault();
    
    if (Usuario.value == "admin" && Contraseña.value == "123") {
        adminLogin.admin = true;
        console.log(adminLogin.admin)
            
        window.location.href = "index.html";
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Hubo un problema...',
            text: 'No se pudo ingresar a "' + Usuario.value + '"',
        })
    }
    localStorage.setItem("adminLogin", JSON.stringify(adminLogin));
}
