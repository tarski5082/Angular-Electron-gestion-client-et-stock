import{prisma} from './dbconnect';

export interface Stock{
    urlImage?:string;
    intitule_produit?:string;
    quantite?:number;
    prix_unitaire?:number;
    id_sous_cat?:number;
}


export async function addStock(data:Stock){
    try{
        const newClient = await prisma.produitStock.create({data})

    }catch(error){
        console.error("Error inserting produit:", error);
        throw error;
    }
}

export async function deleteStockById(id_produit:number){
    try{

        const _client = await prisma.produitStock.delete({
            where:{id_produit},
        })

    }catch(error){
        console.error("Error deleting client:", error);
        throw error;
    }
    
}

export async function getStockById(id_produit:number){
    try{
        const _client = await prisma.produitStock.findUnique({
            where:{id_produit}
            }
        )
        return _client;

    }catch(error){
        console.error("Error finding client:",error);
    }
}

export async function updateClient(id_produit:number,data:Stock){
    try{
        return await prisma.produitStock.update({
            where:{id_produit},
            data
        });
    }catch(error){
        console.error("Error updating client:",error);
    }
}