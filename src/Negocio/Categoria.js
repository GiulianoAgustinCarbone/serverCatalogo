export default class Categoria{
    constructor(id, nombre, rubro){
        this.id = id;
        this.nombre = nombre;
        this.rubro = rubro;
        
        // control para verificar que el rubro sea un objeto valido y que este tenga un metodo agregarCategoria
        // que sea una funcion que pueda ejecutar. Asi evito errores cuando haga el post de cargar Producto.
        if(rubro && typeof rubro.agregarCategoria === 'function'){
            rubro.agregarCategoria(this); //Para guardar la instancia de la categoria dentro del rubro al que pertenece
        }
    }

    getidCategoria(){
        return this.id;
    }

    getNombre(){
        return this.nombre;
    }

    getRubro(){
        return this.rubro;
    }

}