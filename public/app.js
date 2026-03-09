const API = "https://10.21.51.55:3000/api/articulos";

const form = document.getElementById("formArticulo");
const lista = document.getElementById("lista");

/* =========================
   CARGAR ARTICULOS
========================= */

async function cargarArticulos(){

  const res = await fetch(API);
  const articulos = await res.json();

  lista.innerHTML = "";

  if(articulos.length === 0){
    lista.innerHTML = "<p>No hay artículos registrados</p>";
    return;
  }

  articulos.forEach(a => {

    const div = document.createElement("div");
    div.className = "articulo";

    div.innerHTML = `
      <h3>${a.titulo}</h3>
      <p><b>Autor:</b> ${a.autor}</p>
      <p>${a.resumen}</p>
      <button onclick="eliminar(${a.id})">Eliminar</button>
    `;

    lista.appendChild(div);

  });

}

/* =========================
   GUARDAR ARTICULO
========================= */

form.addEventListener("submit", async (e)=>{

  e.preventDefault(); // evita recarga de la página

  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const resumen = document.getElementById("resumen").value;

  const articulo = {
    id: Date.now(),
    titulo,
    autor,
    resumen,
    fecha: new Date().toISOString().split("T")[0],
    version: 1
  };

  await fetch(API,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(articulo)
  });

  form.reset();

  cargarArticulos();

});

/* =========================
   ELIMINAR
========================= */

async function eliminar(id){

  await fetch(API + "/" + id,{
    method:"DELETE"
  });

  cargarArticulos();

}

/* =========================
   INICIO
========================= */

window.onload = ()=>{

  cargarArticulos();

  // sincronización cada 5 segundos
  setInterval(cargarArticulos,5000);

};