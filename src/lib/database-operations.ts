import { COLLECCION } from '../config/constants';

//QUERYS
//user-LISta de usuarios ordenados por id
export async function getUsers(db: any){
    return await db.collection(COLLECCION.USERS)
    .find().sort({id: 1}).toArray();
}
//user-ver usuario por email
//user-ver usuario por ID
export async function getUserPorId(db: any,  id: any){
    return await db.collection(COLLECCION.USERS)
    .findOne({ id });
}
//user-validacion de usuario - login
//user-hallar mis datos por el token
//aplicacion-hallar la aplicacion 
export async function getAap(db: any, institucion: any){
    return await db.collection(COLLECCION.USERS)
    .find({institucion}).sort({id: 1}).toArray();
}
//export asignar ID a la app
export async function asignIdApp(db: any){    
   const appLast = await db.collection(COLLECCION.APLICACIONES).find()
                .limit(1).sort({ id: -1 }).toArray();
            if (appLast.length === 0) {
                return 1;
            } else {
                return (parseInt(appLast[0].id) + 1);
            }            
}
//aplicacion-hallar la aplicacion por institución
export async function getAplicacionName(db: any, name: string){
    return await db.collection(COLLECCION.APLICACIONES)
    .findOne({ institucion: name});
}
//aplicacion-Lista de aplicaciones instaladas
//DatosUsuario-hallar los datos del usuario por id
export async function getDatosUsuarioPorId(db: any, id: any){
    return await db.collection(COLLECCION.DATOS_USUARIOS)
    .findOne({ user: id});
}
//DatosUsuario-hallar los datos del usuario por user
//Acta-Hallar el acta por id
//Acta-Hallar el acta por numero
//Acta-Hallar el acta por fecha
//Acta-Lista de actas por estado
//Acta-Lista de actas por tipo
//Acta-Lista de actas por lugar
//OrdenDelDia
//Participacion
//Eleccion
//Plancha
//Candidato
//VotoCandidato
//VotoPlancha


//MUTATIONS - Crear, Actualizar, Eliminar 
//aplicacion
//user
//DatosUsuario
export async function setDatosUsuarioPorId(db: any, id: any){
    return await db.collection(COLLECCION.DATOS_USUARIOS)
    .findOne({ user: id});
}

//Acta
//OrdenDelDia
//Participacion
export async function actualizarAplicacion(db: any, aplicacion: any){
    return await db.collection(COLLECCION.APLICACIONES)
    .updateOne({id:aplicacion.id}, {$set: {institucion:aplicacion.institucion}});    
}
//Eleccion
//Plancha
//Candidato
//VotoCandidato
//VotoPlancha

//Subscriptions - inside mutations
