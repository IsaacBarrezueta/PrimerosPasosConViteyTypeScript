import { ListaHeroes, Listar, Insertar, Editar, Eliminar } from "./controlador/TLista";

// Inicializar la lista
Listar();

// Referencias a elementos del DOM
const tabla = document.getElementById("tabla-H") as HTMLTableElement;
const modal = document.getElementById("container-form") as HTMLDivElement;
const button = document.getElementById("btn") as HTMLButtonElement;
const buttonAdd = document.getElementById("btn-add") as HTMLButtonElement;

let codigoActual = 0;
let modo = '';

// Event Listeners
button.addEventListener("click", guardar);
buttonAdd.addEventListener("click", abrirModal);

function abrirModal(): void {
    modal.classList.add('active');
    modo = '';
    limpiarFormulario();
}

function limpiarFormulario(): void {
    (document.getElementById("codigo") as HTMLInputElement).value = '';
    (document.getElementById("nombre") as HTMLInputElement).value = '';
    (document.getElementById("edad") as HTMLInputElement).value = '';
    (document.getElementById("ciudad") as HTMLInputElement).value = '';
    (document.getElementById("urlImagen") as HTMLInputElement).value = '';
}

function guardar(e: Event): void {
    e.preventDefault();
    
    if (modo === "editar") {
        Editar(codigoActual);
    } else {
        Insertar();
    }
    
    modal.classList.remove("active");
    codigoActual = 0;
    modo = '';
    limpiarFormulario();
}

// Event delegation para editar y eliminar
tabla.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target) return;

    const fila = (target.closest('tr') as HTMLTableRowElement);
    if (!fila) return;

    if (target.classList.contains("editar")) {
        modo = "editar";
        codigoActual = Number(fila.cells[0].textContent);
        
        modal.classList.add('active');
        (document.getElementById("codigo") as HTMLInputElement).value = fila.cells[0].textContent || '';
        (document.getElementById("nombre") as HTMLInputElement).value = fila.cells[1].textContent || '';
        (document.getElementById("edad") as HTMLInputElement).value = fila.cells[2].textContent || '';
        (document.getElementById("ciudad") as HTMLInputElement).value = fila.cells[3].textContent || '';
        const heroe = ListaHeroes.find(h => h.Codigo === codigoActual);
        if (heroe) {
            (document.getElementById("urlImagen") as HTMLInputElement).value = heroe.urlImagen;
        }
    }
    
    if (target.classList.contains("eliminar")) {
        if (confirm('¿Estás seguro de que deseas eliminar este héroe?')) {
            Eliminar(Number(fila.cells[0].textContent));
        }
    }
});

// Cerrar modal al hacer clic fuera
modal.addEventListener('click', (event: Event) => {
    if ((event.target as HTMLElement).classList.contains('container-form')) {
        modal.classList.remove('active');
        limpiarFormulario();
        modo = '';
    }
});