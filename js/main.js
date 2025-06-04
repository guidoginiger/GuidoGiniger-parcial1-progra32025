let listadoFrutas = [
  { id: 1, nombre: "arandano", precio: 5000, img: "img/arandano.jpg" },
  { id: 2, nombre: "banana", precio: 1000, img: "img/banana.jpg" },
  { id: 3, nombre: "frambuesa", precio: 4000, img: "img/frambuesa.png" },
  { id: 4, nombre: "frutilla", precio: 3000, img: "img/frutilla.jpg" },
  { id: 5, nombre: "kiwi", precio: 2000, img: "img/kiwi.jpg" },
  { id: 6, nombre: "mandarina", precio: 800, img: "img/mandarina.jpg" },
  { id: 7, nombre: "manzana", precio: 1500, img: "img/manzana.jpg" },
  { id: 8, nombre: "naranja", precio: 9000, img: "img/naranja.jpg" },
  { id: 9, nombre: "pera", precio: 2500, img: "img/pera.jpg" },
  { id: 10, nombre: "anana", precio: 3000, img: "img/anana.jpg" },
  {
    id: 11,
    nombre: "pomelo-amarillo",
    precio: 2000,
    img: "img/pomelo-amarillo.jpg",
  },
  { id: 12, nombre: "pomelo-rojo", precio: 2000, img: "img/pomelo-rojo.jpg" },
  { id: 13, nombre: "sandia", precio: 2000, img: "img/sandia.jpg" },
];

// ***** Listado de Productos ***** //

let contenedorProductos = document.querySelector(".contenedor-productos");

// Muestra los productos del listado de las frutas
function mostrarProductos(listado) {
  let htmlProductos = "";

  for (let i = 0; i < listado.length; i++) {
    htmlProductos += `<div class="card-producto">
                        <img src= "${listado[i].img}" alt="">
                        <h3>${listado[i].nombre}</h3>
                        <p>$ ${listado[i].precio}</p>
                        <button onclick="agregarCarrito(${listado[i].id})">Agregar al carrito</button>
                      </div>`;
  }

  contenedorProductos.innerHTML = htmlProductos;
}

// Imprime los datos del alumno
function imprimirDatosAlumno() {
  const alumno = {
    dni: "43105648",
    nombre: "Guido",
    apellido: "Giniger",
  };

  console.log(
    `Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`
  );

  const alumnoHeader = document.querySelector(".nombreAlumno");

  alumnoHeader.textContent = `${alumno.nombre} ${alumno.apellido}`;
}

// ***** Barra de Búsqueda ***** //

let barraBusqueda = document.querySelector(".barra-busqueda");
barraBusqueda.addEventListener("keyup", filtrarProductos);

// Filtra por los productos que coinciden con la búsqueda
function filtrarProductos() {
  let valorInput = barraBusqueda.value;

  let filtrado = listadoFrutas.filter((producto) =>
    producto.nombre.toLowerCase().includes(valorInput.toLowerCase())
  );

  mostrarProductos(filtrado);
}

// ***** Carrito ***** //
let carrito = [];
let itemsCarrito = document.getElementById("items-carrito");
let contador = document.getElementById("contador-carrito"); // Header
let precioTotal = document.getElementById("precio-total");

function agregarCarrito(idProducto) {
  let objeto = listadoFrutas.find((producto) => producto.id == idProducto);
  console.log(`ID del objeto: ${idProducto}`);

  carrito.push(objeto);
  console.log(carrito);
  console.log(`Cantidad de productos en el carrito: ${carrito.length}`);

  mostrarCarrito(carrito);
  guardarCarritoEnLocalStorage(); // localStorage
}

function eliminarProducto(idProducto) {
  let index = carrito.findIndex((producto) => producto.id === idProducto);

  if (index !== -1) {
    carrito.splice(index, 1);
    console.log("Carrito después de eliminar:", carrito);
    console.log(`Cantidad de productos en el carrito: ${carrito.length}`);

    mostrarCarrito(carrito);
    guardarCarritoEnLocalStorage(); // localStorage
  } else {
    console.log(`Producto con ID ${idProducto} no encontrado en el carrito.`);
  }
}

function vaciarCarrito() {
  carrito = []; // Se vacía el carrito
  mostrarCarrito(carrito);
  guardarCarritoEnLocalStorage(); // localStorage
}

function mostrarCarrito(listado) {
  let htmlCarrito = "";
  let totalItems = 0;
  let totalPrecio = 0;

  if (listado.length === 0) {
    htmlCarrito = "<p>No hay elementos en el carrito.</p>";
  } else {
    listado.forEach((producto) => {
      htmlCarrito += `
                <li class="bloque-item">
                    <p class="nombre-item">${producto.nombre} - $${producto.precio}</p>
                    <button class="boton-eliminar" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                </li>`;

      totalItems++;
      totalPrecio += producto.precio;
    });
  }

  itemsCarrito.innerHTML = htmlCarrito;

  // Actualiza el contador de productos en el HTML
  if (contador) {
    contador.textContent = totalItems;
  }

  // Actualiza el precio total en el HTML
  if (precioTotal) {
    precioTotal.textContent = `$${totalPrecio}`;
  }
}

// ***** LocalStorage ***** //

// Función para guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carritoLS", JSON.stringify(carrito));
}

// Función para cargar el carrito desde localStorage
function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carritoLS");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  } else {
    carrito = [];
  }
}

// ***** Ordenar **** //
let productosOrdenados = listadoFrutas.slice(); // Copio el array de objetos

function ordenarPorNombre() {
  productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre)); // localeCompare para comparar las cadenas
  mostrarProductos(productosOrdenados);
}

function ordenarPorPrecio() {
  productosOrdenados.sort((a, b) => a.precio - b.precio);
  mostrarProductos(productosOrdenados);
}

// ***** Funcion inicializadora ***** //
function init() {
  cargarCarritoDesdeLocalStorage();
  mostrarProductos(listadoFrutas);
  mostrarCarrito(carrito);
  imprimirDatosAlumno();
}

init();
