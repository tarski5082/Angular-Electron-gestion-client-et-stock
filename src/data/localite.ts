import{prisma} from './dbconnect';

export interface _Localite{
    code_postal?:string;
    province?:string;
    localite?:string;
}

export async function addLocalite(data:_Localite){
    try{
        const newLocalite = await prisma.localite.create({data});
    }catch(error){
        console.error("Error inserting localite:", error);
        throw error;
    }
}

export async function getLocaliteById(id:number){
    try{
        return await prisma.localite.findFirst({
            where:{
                id_localite:id
            }
        })

    }catch(error){
        console.error("Error getting client:", error);
        throw error;
    }
}

export async function deleteLocaliteById(id:number) {
    try{
        return await prisma.localite.delete({
            where:{
                id_localite:id
            }
        })

    }catch(error){
        console.error("Error deleting client:", error);
        throw error;
    }
}

export async function updateLocaliteById(id:number,data:_Localite) {
    try{
        return await prisma.localite.update({
            where:{
                id_localite:id
            },
            data
        })

    }catch(error){
        console.error("Error getting client:", error);
        throw error;
    }
}