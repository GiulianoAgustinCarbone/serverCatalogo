CREATE TABLE IF NOT EXISTS atributo (
    id_A INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    valor INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS categoria (
    id_C INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    id_Rubro_Rel INTEGER NOT NULL,
    FOREIGN KEY (id_Rubro_Rel) REFERENCES rubro(id_R)
);

CREATE TABLE IF NOT EXISTS rubro (
    id_R INTEGER PRIMARY KEY AUTOINCREMENT,
    nombreR TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS usuario (
    id_U INTEGER PRIMARY KEY AUTOINCREMENT,
    nombreU TEXT NOT NULL,
    contraseña TEXT NOT NULL,
    email TEXT NOT NULL,
    rol TEXT CHECK(rol IN ('admin', 'usuario'))
);

CREATE TABLE IF NOT EXISTS producto (
    id_P INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    precio REAL NOT NULL,
    cantidad INTEGER NOT NULL,
    imagen TEXT NOT NULL,
    id_Categoria_Pert INTEGER,
    FOREIGN KEY (id_Categoria_Pert) REFERENCES categoria(id_C)
);

CREATE TABLE IF NOT EXISTS prod_posee_atr (
    id_prod INTEGER,
    id_atri INTEGER,
    PRIMARY KEY (id_prod, id_atri),
    FOREIGN KEY (id_prod) REFERENCES producto(id_P),
    FOREIGN KEY (id_atri) REFERENCES atributo(id_A)
);