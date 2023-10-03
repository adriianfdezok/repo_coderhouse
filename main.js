let modalBodyCarrito = document.getElementById("modal-bodyCarrito");
let productosCarrito = [];

class Celular {
    constructor(id, marca, modelo, precio, imagen) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.imagen = imagen;
    }
}

const celular1 = new Celular(1, "motorola", "e12", 67999, "moto_e15.jpg");
const celular2 = new Celular(2, "samsung", "a4", 80000, "sam_a4.jpg");
const celular3 = new Celular(3, "motorola", "e15", 98600, "moto_e15.jpg");
const celular4 = new Celular(4, "iPhone", "12 Pro", 215000, "iphone12.jpg");
const celular5 = new Celular(5, "Xiaomi", "Mi 11", 176500, "xiam.jpg");
const celular6 = new Celular(6, "Alcatel", "H3", 64400, "3H.jpg");
const celular7 = new Celular(7, "asdasdasd", "asdasdasd", 1276500, "xiam.jpg");

const celulares = [celular1, celular2, celular3, celular4, celular5, celular6, celular7];

function mostrar_catalogoHTML(celular) {
    return `
    <div  style="width:300px; padding-top:20px;">
        <div class="card">
            <img src="src="assets/${celular.imagen}" class="card-img-top" alt="Imagen 1">
            <div class="card-body">
                <h5 class="card-title text-center" style="font-size:20px;"> La marca es el :    ${celular.marca}
                <br>    
                el modelo es ${celular.modelo}</h5>
                <br>  
                <h5 class="card-title text-center"> El precio es de: $${celular.precio}</h5>
                <button id="agregarBtn${celular.id}" class="btn btn">Agregar al carrito</button>
                </button>
            </div>
        </div>
    </div>  
    `;
}
//PROMESA
function cargarProductosDesdeLocalStorage() {
    return new Promise((resolve) => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || []; /* || [] -> proporcionar un valor por defecto */
       
        productosCarrito = carrito;
        document.getElementById("contar-items").innerHTML =productosCarrito.length 

        resolve();
    });
}
//EL ASINC
async function mostrar_catalogo() {
    let celulares_container = document.getElementById("catalogoHTML");
    celulares_container.innerHTML = "";

    //ESPERA LA PROMESA
    await cargarProductosDesdeLocalStorage();

    for (const celular of celulares) {
        let celulares_div = document.createElement("div");
        celulares_div.className = "col-8 pt-4 py-4 col-sm-8 col-md-4    ";
        celulares_div.innerHTML = `
            <div id="${celular.id}" class="card" style="width: 18rem;">
                    <img class="card-img-top img-fluid" style="width: 150px;" src="assets/${celular.imagen}" alt="${celular.marca} de ${celular.modelo} ">
                    <div class="card-body">
                         <p>La Marca es : ${celular.marca}</p>
                        <p>El Modelo es : ${celular.modelo}</p>
                        <p class="${celular.precio}">Precio: ${celular.precio}</p>
                    <button id="agregarBtn${celular.id}" class="btn btn">Agregar al carrito</button>
                    </div>
        </div> `;

        celulares_container.append(celulares_div);

        let agregarBtn = document.getElementById(`agregarBtn${celular.id}`);
        agregarBtn.addEventListener("click", () => {
            agregarAlCarrito(celular);
        });
    }
}

 

setTimeout(() => {
    mostrar_catalogo();
}, 250);

 

function calcularCuotas() {

    let Cuotas = document.getElementById("cuotas").value;
    let totalReduce = 0;
    //SI NO EXISTE document.getElementById("totalReduce").textContent; queda en cero.
        try {
            totalReduce = document.getElementById("totalReduce").textContent;
            if(totalReduce == null) {
                throw new Error('El div no existe');
            }
        } catch(error) {   }     //console.error(error);    

        //let modelo_celular = document.getElementById("modelo_celular").value;

        if (isNaN(Cuotas) || Cuotas <= 0) {
                document.getElementById("resultado").innerHTML = '<span "text-center fs-2 p-2">  La cantidad de cuotas ingresadas es inválida.😭 <span> ';
        } else {
                resultado = 'Precio de cuota: $' + dividir_cuotas(totalReduce, Cuotas).toFixed(2) + '<br>';
                document.getElementById("resultado").innerHTML = resultado;
        
        }
}
 


function dividir_cuotas(precio, cantidad_cuotas) {
    const cuota_mensual = precio / cantidad_cuotas;
    return cuota_mensual;
}



function buscar(modelo) {
    const celulares_encontrados = celulares.filter((celular) => celular.marca.toLowerCase() === modelo.toLowerCase()  );
    return celulares_encontrados;
}


 function buscarinfo(buscado) {
    const celulares_encontrados = buscar(buscado);
     if (buscado.trim().length > 0) {
        mostrar_catalogoBusqueda(celulares_encontrados);
    } else {
        mostrar_catalogo();
    }


}


document.getElementById("buscar_Btn").addEventListener("click", () => {
    console.log("buscar_Btn click")
    let busquedaInput = document.getElementById("busquedaInput");
    buscarinfo(busquedaInput.value);
});

//setTimeout(() => {
    document.getElementById("busquedaInput").addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            let busquedaInput = document.getElementById("busquedaInput");
            buscarinfo(busquedaInput.value);
        }
    });
    
//}, 2000);

document.getElementById("Calcualr_Btn").addEventListener("click", () => {
     let nombre_cliente = document.getElementById("nombre_cliente").value;
    document.getElementById("clieteHtml").innerHTML = generarInfoClienteHTML(nombre_cliente)
    calcularCuotas();
});

botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosCarrito)
})
 
function generarInfoClienteHTML(nombre_cliente) {
    return `
    <div class=" col-8">
        <div class="card text-start rounded-2 border border-white" style="font-size:20px; background-color: #fffdfd;">
            <div class="card-body">
                <br>
                <span class="text-center text-dark">Hola Cliente 🙌  ${nombre_cliente}'</span>
            </div>
        </div>
    </div>
    `;
}

function mostrar_catalogoBusqueda(celulares_encontrados) {
    const catalogoNODOS = document.getElementById("catalogoHTML");
    let catalogoHTML = "";
    if (celulares_encontrados) {

    }

    for (const celular of celulares_encontrados) {
        catalogoHTML += mostrar_catalogoHTML(celular);
        console.log(celular);
    }

    catalogoNODOS.innerHTML = catalogoHTML;
    
};

function mostrarCliente() { 
    let nombre_cliente = document.getElementById("nombre_cliente").value;
    const ClienteNodo = document.getElementById("clienteHTML");
    let clienteHTML = "";
    clienteHTML = generarInfoClienteHTML(nombre_cliente);
    ClienteNodo.innerHTML = clienteHTML;
}

 document.getElementById("Calcualr_Btn").addEventListener("click", () => {
    let nombre_cliente = document.getElementById("nombre_cliente").value;
    document.getElementById("clieteHtml").innerHTML = generarInfoClienteHTML(nombre_cliente);
    calcularCuotas();
});
 
 function agregarAlCarrito(elemento){ 
    let CelularAgregado = productosCarrito.find((Celular) => Celular.id == elemento.id)
    if( CelularAgregado == undefined  )
            {
                document.getElementById("contar-items").innerHTML =productosCarrito.length+1//"9999";//
                productosCarrito.push(elemento),
                
                localStorage.setItem("carrito", JSON.stringify(productosCarrito)),
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se agrego al carrito',
                    showConfirmButton: false,
                    timer: 1000
                })           
            }                        
            else
            {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `este ${CelularAgregado.marca}    ${CelularAgregado.modelo} no se puede agregar  por que ya existe en el carrito`,
                    showConfirmButton: false,
                    timer: 1000
                }) ;
            }
        }
            // console.log(`El Celular ${elemento.titulo} ya existe en el carrito`)




function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach(
        (productoCarrito) => {
            modalBodyCarrito.innerHTML += `
            <div class="card   mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${productoCarrito.marca}</h4>
                        <p class="card-text">${productoCarrito.modelo}</p>
                         <p class="card-text">$${productoCarrito.precio}  </p> 
                         <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
            `
        }
    )
    //segundo for each quiero adjuntar evento eliminar
    array.forEach(
        (productoCarrito) => {
            //similar let btnBorrar = document.getElementById(`botonEliminar${productoCarrito.id}`)
            //capturar nodo sin guardarlo en variable:
            document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () =>{
                //borrar del DOM
                let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
                cardProducto.remove()
                //borrar del array
                //obtener posición del elemento y lo borro
                let posicion = array.indexOf(productoCarrito)
                array.splice(posicion, 1)
                //borrar del storage
                localStorage.setItem("carrito", JSON.stringify(array))
                //actualizamos el total
                calcularTotal(array) 
                document.getElementById("contar-items").innerHTML = array.length;//'currentTime.getSeconds().tosting';
            })
        }
    )
    calcularTotal(array)    
}
function calcularTotal(array){
     const totalReduce = array.reduce(
         (acumulador, Celular)=>
        {return acumulador + Celular.precio},
        0
    )
   

    totalReduce > 0 ? precioTotal.innerHTML = `  
    <strong>  El total de su compra es:<div id="totalReduce">${totalReduce}</div></strong>` : precioTotal.innerHTML = `No hay productos en el carrito` 
  } 
//finalizar compra

let botonFinalizarCompra = document.getElementById(`botonFinalizarCompra`)

function finalizarCompra(array){
    //alguna alerta nos diga que finalizo (con el .then agregamos confirmar compra)
    let total = calcularTotal(array)
    Swal.fire({
        text: `Gracias por su compra, usted ha gastado ${total}`
    })
    //limpiar el carrito (desp mejoramos forma)
    productosCarrito = []
    //actualizar storage
    localStorage.removeItem("carrito")
    document.getElementById("contar-items").innerHTML ="0";
} 


 let loader =document.getElementById("loader")
setTimeout(() => {

    mostrar_catalogo();

}, 6500);

setTimeout(() => {
    loader.remove() 
}, 500);
new kursor({
    type: 1
 
    
}) 