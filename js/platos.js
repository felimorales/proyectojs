//funcion constructora de productos
class Producto {
  constructor(nombre, precio, img, tipo) {
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.tipo = tipo;
    this.cantidad = 0;
  }

  vender(cantidad) {
    precioTotal = suma(precioTotal, cantidad * this.precio);
    this.cantidad = this.cantidad + cantidad;
  }
}



/* console.log(productos[]); */

//Creación del carrito y la funcion que agrega al carrito.
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const guardarCarrito = (producto, cant) => {
  carrito.push({ producto: producto, cantidad: cant });
};

//Function que crea el div de cada producto
function createPlato(producto) {
  //Creación del div del producto
  const plato = document.createElement("div");

  //Imagen del producto, que se agrega al div plato.
  const image = document.createElement("img");
  image.src = producto.img;
  image.className = "plato";
  plato.append(image);

  //Nombre del producto, que se agrega al div plato.
  const paragraph = document.createElement("p");
  paragraph.innerText = producto.nombre;
  plato.append(paragraph);

  //Boton de comprar, que se agrega al div plato.
  const button = document.createElement("button");
  button.className = "btn";/* 
  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("data-bs-target", "#modalComprar"); */
  button.innerText = "Comprar";
  plato.append(button);

  //Input de cantidad, que se agrega al div plato.
  const input = document.createElement("input");
  input.type = "number";
  input.className = "campoCantidad";
  input.value = "1";
  plato.append(input);

  //Event Listener de que cuando compras se guarde en el localStorage carrito el producto y la cantidad indicada en el input.
  button.addEventListener("click", (e) => {
    guardarCarrito(producto, parseInt(input.value));
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire({
      position: 'middle',
      icon: 'success',
      title: 'Producto agregado al carrito!',
      showConfirmButton: false,
      timer: 1000
    })
  });
  
  //La function me devuelve el div del plato creado
  return plato;
}

//Creación de las secciones segun "tipo" y los productos en el html.
let contenedorVegie = document.getElementById("platos-vegie");
let contenedorCarne = document.getElementById("platos-carne");


//traer con fetch los platos
fetch("../productos.json")
.then(response => response.json())
.then(productos => 
  productos.forEach(prod => {
    const prods = createPlato(prod);

  if (prod.tipo === "vegie") {
    contenedorVegie.append(prods);
  } else {
    contenedorCarne.append(prods);
  }
  prods.className = "platos";
  })
  )

  console.log(carrito);