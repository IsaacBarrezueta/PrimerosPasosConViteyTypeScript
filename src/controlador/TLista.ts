import { Heroe } from "../entidades/Heroe";

export let ListaHeroes: Heroe[] = [
    new Heroe(1, "Batman", 40, "Gotica", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp6bQa-oRymMK6pBhXmsKGaenNpIAj2mYVXg&s"),
    new Heroe(2, "Spiderman", 20, "New York", "https://cdn1-production-images-kly.akamaized.net/wYlgfuYkSSzxG0mLgv0Cl_B-OsU=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/908624/original/090170500_1435112456-spiderman3.jpeg"),
    new Heroe(3, "Superman", 35, "Metropolis", "https://e.rpp-noticias.io/xlarge/2024/07/11/292329_1610934.webp")
];

export function Insertar(): void {
    const cod = Number((<HTMLInputElement>document.getElementById("codigo")).value);
    const nom = (<HTMLInputElement>document.getElementById("nombre")).value;
    const eda = Number((<HTMLInputElement>document.getElementById("edad")).value);
    const ciu = (<HTMLInputElement>document.getElementById("ciudad")).value;
    const img = (<HTMLInputElement>document.getElementById("urlImagen")).value;

    const heroe = new Heroe(cod, nom, eda, ciu, img);
    ListaHeroes.push(heroe);
    Listar();
}

export function Editar(codigo: number): void {
    const cod = Number((<HTMLInputElement>document.getElementById("codigo")).value);
    const nom = (<HTMLInputElement>document.getElementById("nombre")).value;
    const eda = Number((<HTMLInputElement>document.getElementById("edad")).value);
    const ciu = (<HTMLInputElement>document.getElementById("ciudad")).value;
    const img = (<HTMLInputElement>document.getElementById("urlImagen")).value;

    const index = ListaHeroes.findIndex(heroe => heroe.Codigo === codigo);
    if (index !== -1) {
        ListaHeroes[index] = new Heroe(cod, nom, eda, ciu, img);
    }
    Listar();
}

export function Eliminar(codigo: number): void {
    const index = ListaHeroes.findIndex(heroe => heroe.Codigo === codigo);
    if (index >= 0) {
        ListaHeroes.splice(index, 1);
    }
    Listar();
}

export function Listar(): void {
    const lista = document.getElementById("lista-h");
    if (!lista) return;

    const rows = ListaHeroes.map(heroe => `
        <tr>
            <td>${heroe.Codigo}</td>
            <td>${heroe.Nombre}</td>
            <td>${heroe.Edad}</td>
            <td>${heroe.Ciudad}</td>
            <td><img src="${heroe.urlImagen}" alt="${heroe.Nombre}" style="width: 50px; height: 50px;"></td>
            <td>
                <button class="editar btn btn-warning me-2">Editar</button>
                <button class="eliminar btn btn-danger">Eliminar</button>
            </td>
        </tr>
    `).join('');

    lista.innerHTML = rows;
}