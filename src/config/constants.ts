import environments from './environments';

if (process.env.NODE_ENV !== 'production') {
    const environment = environments;
}

export const SECRET_KEY = process.env.SECRET || 'midavid48';

export const COLLECCION= {
    USERS: "users",
    APLICACIONES: "aplicaciones",
    DATOS_USUARIOS: "datos_usuarios",
    ACTAS: "actas",
    ORDEN_DEL_DIA:"orden_del_dia",
    PARTICIPACION:"participacion",
    ELECIONES:"eleciones",
    PLANCHAS:"planchas",
    CANDIDATOS:"candidatos",
    VOTOS_CANDIDATO:"votos_candidato",
    VOTOS_PLANCHA:"Votos_plancha"
}