import { IResolvers } from 'graphql-tools';
import { getDatosUsuarioPorId } from '../lib/database-operations';

const type : IResolvers = {
    User:{
        datosUsuario: async(parent: any, __:any, {db}) => {
            return await getDatosUsuarioPorId(db, parent.datosUsuario.id);
        }
    }
}

export default type;