import DAO from "./DAO.js";

export default class ProductoDAOImp extends DAO {
    constructor(conexionDB) {
        super();
        this.db = conexionDB;
    }

    async create(objeto) {
        try {
            const query = "INSERT INTO producto (titulo, descripcion, precio, cantidad, imagen, id_Categoria_Pert) VALUES (?, ?, ?, ?, ?, ?)";
            const values = [
                objeto.getTitulo(), 
                objeto.getDescripcion(), 
                objeto.getPrecio(), 
                objeto.getCantidad(), 
                objeto.getImagenLink(), 
                objeto.categoria.getidCategoria()
            ];
            const resultado = await this.db.run(query, values);
            
            return resultado.lastID; 
        } catch (error) {
            console.error("Error al agregar el producto:", error.message);
            throw error;
        }
    }

    async read(id) {
        try {
            const query = "SELECT * FROM producto WHERE id_P = ?";
            return await this.db.get(query, [id]); 
        } catch (error) {
            console.error("Error al leer el producto:", error.message);
            throw error;
        }
    }

    async update(objeto) {
        try {
            const query = "UPDATE producto SET titulo = ?, descripcion = ?, precio = ?, cantidad = ?, id_Categoria_Pert = ?, imagen = ? WHERE id_P = ?";
            const values = [
                objeto.getTitulo(), 
                objeto.getDescripcion(), 
                objeto.getPrecio(), 
                objeto.getCantidad(), 
                objeto.categoria.getidCategoria(), 
                objeto.getImagenLink(), 
                objeto.getidProducto() 
            ];
            const resultado = await this.db.run(query, values);
            
            return resultado.changes; 
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            const query = "DELETE FROM producto WHERE id_P = ?";
            const resultado = await this.db.run(query, [id]);
            
            return resultado.changes; // retorna la cantidad de filas que fueron afectadas[se espera que sea 1]
        } catch (error) {
            console.error("Error al intentar eliminar el producto:", error.message);
            throw error;
        }
    }

    // obtener todos los productos, sin filtros
    async getAll(filtros  = {}){
        try{
            // si el filtro esta vacio, sera 1
            const {categoria, rubro, titulo, pagina} = filtros;
            const productosPorPagina = 12;
            const numeroPagina = parseInt(pagina) || 1; // Si pagina tiene un error entonces mostrara 1.
            const offset = (numeroPagina - 1) * productosPorPagina;

            let query = " FROM producto WHERE 1=1"; // El 1=1 es para facilitar el encadenamiento de condiciones
            let values = [];
            if (categoria && categoria.length > 0) { // si tiene multiples categorias
                const categorias = String(categoria).split(',');
                const placeholders = categorias.map(() => '?').join(','); //Por cada categoria agrega un ? en el placeholder
                query += ` AND id_Categoria_Pert IN (${placeholders})`;
                values.push(...categorias);
            } // filtro por rubro
            else if(rubro){
                query += ` AND id_Categoria_Pert IN (SELECT id_C FROM categoria WHERE id_Rubro_Rel = ?)`;
                values.push(rubro);
            }

            // filtro por titulo
            if (titulo) {
                query += " AND titulo LIKE ?";
                values.push(`%${titulo}%`);
            }
            const countQuery = "SELECT COUNT(*) as total" + query;
            const resultadoCount = await this.db.get(countQuery, values);
            const totalProductos = resultadoCount.total; //Obtiene la cantidad de productos
            const totalPaginas = Math.ceil(totalProductos / productosPorPagina); //Obtiene la cantidad de productos por pagina

            const dataQuery = "SELECT *" + query + " LIMIT ? OFFSET ?";
            const dataValues = [...values, productosPorPagina, offset];
            const productos = await this.db.all(dataQuery, dataValues);

            return {
                exito: true,
                productos: productos,
                totalPaginas: totalPaginas
            };
        } catch (error) {
            console.error("Error al obtener los productos en DAO:", error.message);
            throw error;
        }
    }

    // obtener absolutamente todos los productos sin paginacion ni filtros
    async obtenerTodos() {
        try {
            return await this.db.all("SELECT * FROM producto");
        } catch (error) {
            console.error("Error al obtener todos los productos:", error.message);
            throw error;
        }
    }
}