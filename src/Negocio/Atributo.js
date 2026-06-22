export class Atributo{
    constructor(id, nombre, valor){
        this.id = id;
        this.nombre = nombre;
        this.valor = valor;
    }

    getidAtributo(){
        return this.id;
    }

    getNombre(){
        return this.nombre;
    }

    setNombre(nombreNuevo){
        this.nombre = nombreNuevo;
    }

    getValor(){
        return this.valor;
    }

    setValor(valorNuevo){
        this.valor = valorNuevo;
    }

}