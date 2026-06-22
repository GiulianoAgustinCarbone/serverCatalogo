// Recordar: NO USEN EL COMMONJS PARA IMPORTAR O EXPORTAR.
// Usen el sistema ES MODULES, es decir, con import y export, no require ni module.exports.
// Esto porque el CommonJS ya esta casi obsoleto

export default class DAO{
    constructor(){
        if (new.target === DAO) { // Esto para evitar que se instancie un objeto de la clase DAO directamente
            throw new Error("No se puede instanciar la clase abstracta DAO");
        }
    }

    // async porque las clases hijas van a realizar operaciones con la base de datos,
    // y estas operaciones son asíncronas. Por defecto, en JS, los metodos son sincronas
    
    async create(object){
        throw new Error("Metodo create() debe ser implementado");
    }

    async read(id){
        throw new Error("Metodo read() debe ser implementado");
    }

    async update(object){
        throw new Error("Metodo update() debe ser implementado");
    }

    async delete(id){
        throw new Error("Metodo delete() debe ser implementado");
    }
}