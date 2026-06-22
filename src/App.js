import express from "express";
import cors from "cors";
import productosRuta from "./Presentacion/productosRutas.js";
import rubrosRuta from "./Presentacion/rubrosRutas.js";
import categoriasRuta from "./Presentacion/categoriasRutas.js";
import emailsRuta from "./Presentacion/emailsRutas.js";
import iniciarSesion from "./Presentacion/inicioSesion.js";
import registroUsuario from "./Presentacion/registroUsuario.js"

const app = express();

app.use(cors());
app.use(express.json());



//Rutas
app.use("/productos", productosRuta);
app.use("/rubros", rubrosRuta);
app.use("/categorias", categoriasRuta);
app.use("/enviarMail", emailsRuta);
app.use("/iniciarSesion", iniciarSesion);
app.use("/registrarUsuario", registroUsuario);

app.listen(3000, () => console.log("Servidor corriendo"));
