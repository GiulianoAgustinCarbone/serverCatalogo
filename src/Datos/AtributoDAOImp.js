import {DAO} from "./DAO";

export class AtributoDAOImp extends DAO {
    
    constructor(conexionDB) {
        super();
        this.db = conexionDB;
    }

    async create(objeto) {
        try {
            const query = "INSERT INTO atributo (nombre, valor) VALUES (?, ?)";
            const values = [objeto.getnombre(), objeto.getvalor()];
            const resultado = await this.db.run(query, values);
            // se retorna el id, el 
            return resultado.lastID; 
        } catch (error) {
            console.error("Error de BD al crear atributo:", error.message);
            throw error; // Lanzamos el error hacia arriba
        }
    }

    async read(id) {
        try {
            const query = "SELECT * FROM atributo WHERE id_A = ?";
            // Retornamos directamente el objeto encontrado (o undefined si no existe)
            return await this.db.get(query, [id]); 
        } catch (error) {
            console.error("Error de BD al leer atributo:", error.message);
            throw error;
        }
    }

    async update(objeto) {
        try {
            const query = "UPDATE atributo SET nombre = ?, valor = ? WHERE id_A = ?";
            const values = [objeto.getnombre(), objeto.getvalor(), objeto.getid()];
            const resultado = await this.db.run(query, values);
            
            // retornamos la cantidad de filas modificadas
            // Si es 0, el service entendera que no se actualizo nada
            return resultado.changes; 
        } catch (error) {
            console.error("Error de BD al actualizar atributo:", error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            const query = "DELETE FROM atributo WHERE id_A = ?";
            const resultado = await this.db.run(query, [id]);
            
            // retornamos la cantidad de filas eliminadas
            return resultado.changes; 
        } catch (error) {
            console.error("Error de BD al eliminar atributo:", error.message);
            throw error;
        }
    }
}