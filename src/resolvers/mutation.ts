import { IResolvers } from 'graphql-tools';
import { Datetime } from '../lib/datetime';
import bcryptjs from 'bcryptjs';
import { getUserPorId, getUsers, getDatosUsuarioPorId, getAap, asignIdApp, getAplicacionName, actualizarAplicacion } from '../lib/database-operations';
import { COLLECCION } from '../config/constants';
const mutation: IResolvers = {
    Mutation: {
        async registerUser(_: void, { user }, { db }): Promise<any> {
            const userCheck = await db.collection('users').findOne({ email: user.email });
            if (userCheck !== null) {
                return {
                    status: false,
                    message: `Usuario NO registrado porque ya existe el usuario ${user.email}`,
                    user: null
                };
            }
            const lastUser = await db.collection('users').find()
                .limit(1).sort({ registerDate: -1 }).toArray();
            if (lastUser.length === 0) {
                user.id = 1;
            } else {
                user.id = lastUser[0].id + 1;
            }
            user.password = bcryptjs.hashSync(user.password, 10);
            user.registerDate = new Datetime().getCurrentDateTime();
            return await db.collection('users').insertOne(user)
                .then((result: any) => {
                    return {
                        status: true,
                        message: `Usuario ${user.name} ${user.lastname} añadido correctamente`,
                        user
                    };
                })
                .catch((err: any) => {
                    return {
                        status: false,
                        message: `Usuario NO añadido correctamente`,
                        user: null
                    };
                });
        },
        async updateUser(_: void, { id, user }, { db }): Promise<any>{
            //encontrar al usuario por id
            const lastUser = await db.collection('users').findOne({id});
            //actualizar datos del usuario
        },
        async addDatosUsuario(_: void,  { id, inputDatos }, { db }): Promise<any>{            
            //encontrar al usuario por id           
            const selectUser = await getUserPorId(db, id);
            if(selectUser === null || selectUser === undefined){
                return {
                    status: false,
                    message: "no existe",
                    user: null
                }
            }
            inputDatos.id= selectUser.id;
            const datosUsuario = inputDatos;
            
            return await db.collection(COLLECCION.USERS)
            .updateOne({id:selectUser.id}, {$set: {datosUsuario}}).then(
                async()=>{
                    return {
                        status: true,
                        message: "el usuario si  existe y se asignaron los datos correctamente - id:"+ inputDatos.id,
                        user : getUserPorId(db, selectUser.id)
                    }
                }
            ).catch(
                async()=>{
                    return {
                        status: false,
                        message: "A ocurrido un error al buscar y fuardar los datos del usuario",
                        user: null
                    }
                }
            );

        },
        async registerApp(_: void, {aplicacion}, { db }):Promise<any>{
            const nombre = aplicacion.institucion;
            const appl = await getAap(db, nombre);
            if(appl.length > 0  ){
                return {
                    status: false,
                    message: `La aplicación con el nombre ${nombre} existe!!`,
                    aplicacion: appl[0]
                }
            }
            //crear el ID de la app
            const idapp = await asignIdApp(db);
            console.log('id: ', idapp);
            /*const app = ()=> {
               return { 
                    id: idapp,
                    institucion: 'Alcoholicos2'
                }
            }*/
            console.log("id: ", typeof(idapp)+ ' '+idapp);
            //aplicacion = app;
            aplicacion.id =`${idapp}`;
            aplicacion.institucion = 'EL Taller';
            return await db.collection(COLLECCION.APLICACIONES).insertOne(aplicacion).then(
                async()=>{                    
                    return {                    
                        status: true,
                        message: `La aplicación con el nombre ${aplicacion.institucion} se creó con éxito!!`,
                        aplicacion                    
                    }
                }
            ).catch(
                async()=>{                      
                    return {                    
                        status: false,
                        message: `Error al crear aplicación con el nombre ${nombre} !! `,
                        aplicacion                    
                    }
                }

            );
        },
        async upddateApp(_: void, {name, aplicacion}, { db }):Promise<any>{
            //encontrar la app
            const appDB = await getAplicacionName(db, name);

                if(appDB === null && appDB.institucion.length === 0) {                
                    return {
                        status:false,
                        message: `No hay la aplicacion de nombre ${appDB.institucion} esta en la db`,
                        aplicacion: appDB
                    
                    }
                }
                console.log(appDB);
                appDB.institucion = aplicacion.institucion;                
                console.log(aplicacion);
                return await actualizarAplicacion(db, appDB).then(                    
                    async () => {
                        return {
                            status:true,
                            message: `la aplicacion ${appDB.institucion} esta en la db  y se actualizo correctamente`,
                            aplicacion: getAplicacionName(db, appDB.institucion)
                        }
                    }
                ).catch(
                    async () => {
                        return {
                            status:false,
                            message: `error en la actualizacion de ${appDB.institucion} `,
                            aplicacion: appDB
                        
                        }
                    }
                );
                
           
            //actualizar la app
        }

    }
};

export default mutation;