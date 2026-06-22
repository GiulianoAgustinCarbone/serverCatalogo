/*import { open } from "sqlite";
import sqlite3 from "sqlite3";

import fs from "fs/promises";

const db = await open({
    filename: "./bd_Catalogo.db",
    driver: sqlite3.Database,
});

// Leer archivo SQL
const sql = await fs.readFile("src/BD_codigo/init.sql", "utf8");

// Ejecutar SQL
await db.exec(sql);

console.log("Base de datos inicializada");

export default db;*/

import { createClient } from "@libsql/client";

import dotenv from "dotenv";

dotenv.config();

const turso = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
});


const db = {
    run: async (query, values = []) => {
        const res = await turso.execute({ sql: query, args: values });
        return { changes: res.rowsAffected, lastID: res.lastInsertRowid };
    },
    get: async (query, values = []) => {
        const res = await turso.execute({ sql: query, args: values });
        return res.rows[0]; 
    },
    all: async (query, values = []) => {
        const res = await turso.execute({ sql: query, args: values });
        return res.rows;
    }
};

export default db;
