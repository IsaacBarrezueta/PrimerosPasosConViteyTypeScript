export class Heroe
{
    public Codigo:number;
    public Nombre:string;
    public Edad:number;
    public Ciudad:string;
    public urlImagen:string;
    constructor(codigo:number, nombre:string, edad:number, ciudad:string, urlImagen:string)
    {
        this.Codigo = codigo;
        this.Nombre = nombre;
        this.Edad = edad;
        this.Ciudad = ciudad;
        this.urlImagen = urlImagen;
    }
}