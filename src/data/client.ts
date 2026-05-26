import{prisma} from './dbconnect';


export interface _Client{
    nom:string;
    prenom:string;
    email?:string;
    id_adress?:number;
}



export async function addClient(data:_Client) {
    try{
        const newClient = await prisma.client.create({data})

    }catch(error){
        console.error("Error inserting client:", error);
        throw error;
    }
}

export async function deleteClientById(id:number){
    try{

        const _client = await prisma.client.delete({
            where:{
                id_client:id
            },
        })

    }catch(error){
        console.error("Error deleting client:", error);
        throw error;
    }
    
}

export async function getClientById(_id:number){
    try{
        const _client = await prisma.client.findUnique({
            where:{
                id_client:_id
                }
            }
        )
        return _client;

    }catch(error){
        console.error("Error finding client:",error);
    }
}

export async function updateClient(id_client:number,data:_Client){
    try{
        return await prisma.client.update({
            where:{id_client},
            data
        });
    }catch(error){
        console.error("Error updating client:",error);
    }
}