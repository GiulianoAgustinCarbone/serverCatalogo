export default class Producto {
    constructor(id, titulo, descripcion, precio, cantidad, atributos, imagenLink, categoria){
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
        this.atributos = atributos;
        this.imagenLink = imagenLink;
        this.categoria = categoria;
    }
    
    mostrar(){
        let texto = `Titulo: ${this.titulo}\nDescripción: ${this.descripcion}\nPrecio: ${this.precio}\n`+
        `Categoria: ${this.categoria}\nAtributos:\n`;
        for(const atributo of this.atributos){
            texto += `${atributo.nombre}: ${atributo.valor}`;
        }
        return texto;
    }

    getidProducto(){
        return this.id;
    }

    getTitulo(){
        return this.titulo;
    }

    getCantidad(){
        return this.cantidad;
    }

    getDescripcion(){
        return this.descripcion;
    }
    
    getPrecio(){
        return this.precio; 
    }
    
    getCategoria(){
        return this.categoria;
    }

    getAtributos(){
        return this.atributos;
    }

    getImagenLink(){
        return this.imagenLink;
    }
}