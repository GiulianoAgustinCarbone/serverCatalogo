import DAO from "./DAO.js";

export default class CategoriaDAOImp extends DAO {
    constructor(conexionDB) {
        super();
        this.db = conexionDB;
    }   

    async create(objeto) {
        throw new Error("El metodo create() no esta implementado para CategoriaDAOImp");
    }

    async read(id) {
        try {
            const query = "SELECT * FROM categoria WHERE id_C = ?";
            // .get() devuelve el objeto o undefined si no existe
            return await this.db.get(query, [id]); 
        } catch (error) {
            console.error("Error de DB en read():", error.message);
            throw error;
        }
    }

    async update(objeto) {
        throw new Error("El metodo update() no esta implementado para CategoriaDAOImp");
    }

    async delete(id) {
        throw new Error("El metodo delete() no esta implementado para CategoriaDAOImp");
    }

    async getAll() {
        try {
            // .all() devuelve el array de resultados o un array vacío []
            return await this.db.all("SELECT * FROM categoria");
        } catch (error) {
            console.error("Error de DB en getAll():", error.message);
            throw error;
        }
    }

    // obtener las categorias asociadas a un rubro
    async getByRubro(idRubro) {
        try {
            const query = "SELECT * FROM Categoria WHERE id_Rubro_Rel = ?";
            return await this.db.all(query, [idRubro]);
        } catch (error) {
            console.error("Error de DB en getByRubro():", error.message);
            throw error;
        }
    }
}