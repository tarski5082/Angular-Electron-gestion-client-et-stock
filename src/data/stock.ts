import{prisma} from './dbconnect';

export interface Stock{
    id_produit?:number;
    urlImage?:string;
    intitule_produit?:string;
    quantite?:number;
    prix_unitaire?:number;
    id_sous_cat?:number;
}


export async function addStock(data:Stock){
    try{
        const currentStock = await prisma.produitStock.findFirst({where:{
            urlImage:data.urlImage,
            intitule_produit:data.intitule_produit,
        }})
        if(currentStock){
            return currentStock;
        }
        const newStock = await prisma.produitStock.create({data});
        return newStock;

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

export async function updateStock(id_produit:number,quantite:number){
    try{
        return await prisma.produitStock.update({
            where:{id_produit},
            data:{
                quantite
            }
        });
    }catch(error){
        console.error("Error updating stock:",error);
    }
}

export async function loadProduct():Promise<Stock[]> {
    const products =await prisma.produitStock.findMany(
        {
            select:{
                id_produit:true,
                urlImage:true,
                intitule_produit:true,
                prix_unitaire:true,
                id_sous_cat:true,
            }
        }
    );

    return products.map((product)=>({
        id_produit:product.id_produit,
        urlImage:product.urlImage||undefined,
        intitule_produit:product.intitule_produit||undefined,
        quantite:undefined,
        prix_unitaire:product.prix_unitaire?.toNumber(),
        id_sous_cat:product.id_sous_cat||undefined


    }));
}