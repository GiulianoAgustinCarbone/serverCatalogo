export class Usuario{
    constructor(id, nombre, rol, contraseña, email){
        this.id = id;
        this.nombre = nombre;
        this.rol = rol;
        this.contraseña = contraseña;
        this.email = email;
    }

    getIdUsuario(){
        return this.id;
    }

    getNombre(){
        return this.nombre;
    }

    getRol(){
        return this.rol;
    }

    getContrasenia(){
        return this.contraseña;
    }

    getEmail(){
        return this.email;
    }
}