import {prisma} from './dbconnect';

export interface _SousCategorie{
    intitule_sous_cat:string;
    id_cat?:number 
}

export async function addSousCategorie(data:_SousCategorie){
    try{
        const newCategorie = await prisma.sous_categorie.create({data});

    }catch(error){
        console.error("Error adding categorie:", error);
        throw error;
    }
    
   
}

export async function deleteSousCategorie(id_sous_cat:number){
    try{
        const newCategorie = await prisma.sous_categorie.delete({where:{
            id_sous_cat
        }
    });

    }catch(error){
        console.error("Error adding categorie:", error);
        throw error;
    }
    
   
}

export async function updateSousCategorieById(id_sous_cat:number,data:_SousCategorie){
    try{
        const newCategorie = await prisma.sous_categorie.update({
            where:{
                id_sous_cat}
            ,data
        });

    }catch(error){
        console.error("Error adding categorie:", error);
        throw error;
    }
    
   
}

export async function getSousCategorieById(id_sous_cat:number){
    try{
        return await prisma.sous_categorie.findUnique({where:{id_sous_cat}});

    }catch(error){
        console.error("Error getting sous-categorie:", error);
        throw error;
    }  
   
}
