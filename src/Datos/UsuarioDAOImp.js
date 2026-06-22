import DAO from "./DAO.js";

export default class UsuarioDAOImp extends DAO {
    constructor(conexionDB) {
        super();
        this.db = conexionDB;
    }

    async create(objeto) {
        try {
            const query = "INSERT INTO usuario (nombreU, contraseña, email, rol) VALUES (?, ?, ?, ?)";
            const valores = [objeto.nombre, objeto.contraseña, objeto.email, objeto.rol];
            
            return await this.db.run(query, valores);
        } catch (error) {
            console.error("Error al crear usuario en la BD:", error.message);
            throw error;
        }
    }

    async read(id) {
        throw new Error("El metodo read() no esta implementado para UsuarioDAOImp");
    }

    async update(objeto) {
        throw new Error("El metodo update() no esta implementado para UsuarioDAOImp");
    }

    async delete(id) {
        throw new Error("El metodo delete() no esta implementado para UsuarioDAOImp");
    }

    async buscarPorMail(email) {
        try {
            const query = "SELECT * FROM usuario WHERE email = ?";
            return await this.db.get(query, [email]);
        } catch (error) {
            console.error("Error al buscar usuario:", error.message);
            throw error;
        }
    }

    async getAll(){
        try {
            return await this.db.all("SELECT * FROM usuario");
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}