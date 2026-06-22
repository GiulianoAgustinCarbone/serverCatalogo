import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"; // esta libreria es la que se encarga de buscar al archivo.env

dotenv.config(); // Para evitar el hardcodeo de las credenciales. Directamente las toma del .env

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Les dejo esto para que prueben la conexion
const pruebita = async () => {
    try {
        const respuesta = await cloudinary.api.ping(); // hace una llamada de prueba a la API para comprobar la conexion
        console.log("Conexion exitosa a Cloudinary :D");
    } catch (error) {
        console.error("No se conecto...");
        console.error("Error:", error.message);
    }
};

// pruebita();

export default cloudinary;