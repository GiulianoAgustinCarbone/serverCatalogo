import DAO from "./DAO.js";

export default class RubroDAOImp extends DAO{
    constructor(conexionDB){
        super();
        this.db = conexionDB;
    }

    async create(objeto){
        throw new Error ("El metodo create() no esta implementado para RubroDAOImp");
    }

    async read(id){
        throw new Error( "El metodo read() no esta implementado para RubroDAOImp");
    }

    async update(objeto){
        throw new Error("El metodo update() no esta implementado para RubroDAOImp");
    }

    async delete(id){
        throw new Error("El metodo delete() no esta implementado para RubroDAOImp");
    }

    async getAll(){
        try {
            return await this.db.all("SELECT * FROM rubro");
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}