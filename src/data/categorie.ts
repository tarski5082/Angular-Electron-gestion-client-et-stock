import { prisma } from "./dbconnect";

export interface _Categorie{
    intitule:string;
}

export async function addCategorie(data:_Categorie){
    try{
        const newCategorie = await prisma.categorie.create({data});

    }catch(error){
        console.error("Error adding categorie:", error);
        throw error;
    }
    
   
}

export async function deleteCategorieById(id_cat:number){
    try{
        const delCategorie = await prisma.categorie.delete({where:{id_cat}});

    }catch(error){
        console.error("Error adding categorie:", error);
        throw error;
    }
    
   
}

export async function getCategorieById(id_cat:number){
    try{
        return await prisma.categorie.findUnique({where:{id_cat}});

    }catch(error){
        console.error("Error adding categorie:", error);
        throw error;
    }  
   
}

export async function updateCategorieById(id_cat:number,data:_Categorie){
    try{
        const updateCategorie = await prisma.categorie.update({where:{id_cat},data});

    }catch(error){
        console.error("Error adding categorie:", error);
        throw error;
    }  
   
}
