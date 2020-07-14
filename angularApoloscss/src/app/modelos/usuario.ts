export interface Usuario {
    _id?:string;
    nombre:string;
    apellido:string;
    edad:number;
    email:string;
    passw?:string;
    foto:string
    rol:string;
    sessionID?:string;
    createAt?:string
}
