import nodemailer from 'nodemailer';
import ProductoDAOImp from '../Datos/ProductoDAOImp.js';
import db from '../Datos/database.js';
import dotenv from "dotenv"; // esta libreria es la que se encarga de buscar al archivo.env

dotenv.config(); // Para evitar el hardcodeo de las credenciales. Directamente las toma del .env

const productoDAO = new ProductoDAOImp(db);
const correoBase = 'catalogowebingenieria@gmail.com'; //Correo creado para enviar y/o recibir los mails del servidor

// Configuramos la conexión con Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: correoBase, // Tu correo de Gmail
        pass: process.env.CLAVECORREOBASE // La contraseña de aplicación
    }
});

export async function construirMensaje(id, nombreCliente, correoCliente,mensaje, correoEmisor =correoBase){
    
    try{
        const producto = await productoDAO.read(id);
        if (producto) {
                const paraQuien = '"Catálogo de Productos" <'+correoEmisor+'>'; //Es el "Para" de los correos
                const asunto = "Información sobre el producto IDº"+id+" - "+producto.titulo;
                const mensajeFormateado = mensaje.replace(/\n/g, '<br>'); //Formatear el mensaje para que quede en formato html
                const mensajeCorreo = `
                    <h3>Nueva consulta desde el Catálogo</h3>
                    <p><strong>Enviado por:</strong> ${nombreCliente}</p>
                    <p><strong>Consultando por el producto:</strong> ${producto.titulo}</p>
                    <p><strong>Mensaje:</strong><br><br>${mensajeFormateado}</p>
                    <p><strong>Correo del Cliente:</strong> ${correoCliente}</p>
                `;
                await enviarCorreo(paraQuien, asunto, correoBase, mensajeCorreo);
        } else {
            throw new Error("Producto no encontrado en la base de datos");
        }
    } catch (error) {
        console.error("Error armando el mensaje:", error);
        throw error;
    }
}

/**Funcion unicamente para enviar un correo*/
async function enviarCorreo(paraQuien, asunto, correoReceptor, mensaje) {
    
    try {
        console.log("Enviando Correo...")
        const info = await transporter.sendMail({
            from: paraQuien, 
            to: correoReceptor,
            subject: asunto,
            html: mensaje,
        });

        console.log("Mensaje enviado con éxito: ", info.messageId);
    } catch (error) {
        console.error("Error al enviar:", error);
        throw error;
    }
}