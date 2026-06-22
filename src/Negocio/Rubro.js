export class Rubro{
    constructor(id,nombre, categorias){
        this.id = id;
        this.nombre = nombre;
        this.categorias = categorias;
    }

    getidRubro(){
        return this.id;
    }

    getNombre(){
        return this.nombre;
    }

    getCategorias(){
        return this.categorias;
    }

    agregarCategoria(categoria){
        this.categorias.push(categoria);
    }

    mostrar(){
        let texto = `Nombre de la Categoria: ${this.nombre}`
        texto = texto + `Categorias:`
        for(let categoria of this.categorias){
            texto = texto + `\t${categoria.nombre}\n`
        }
    }
}