export class Product {
    desProveedor: string;
    artDes: string;
    artPres: string;
    marDes: string;
    subCategoria: string;
    categoria: string;
    artEan: string;

    constructor(
        artDes: string,
        artPres: string,
        marDes: string,
        categoria: string,
        subCategoria: string,
        desProveedor: string,
        artEan: string
    ) {
        this.artDes = artDes;
        this.artPres = artPres;
        this.marDes = marDes;
        this.subCategoria = subCategoria;
        this.categoria = categoria;
        this.desProveedor = desProveedor;
        this.artEan = artEan;
    }
}