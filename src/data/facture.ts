import {prisma} from './dbconnect';

export interface Facture{
    id_facture:number;
    id_client:number;
}

export async function factureClientId(id_facture:number){
    const id = await prisma.facture.findFirst({where:{id_facture},select:{id_client:true}});
    return id.id_client;
}


export async function createFacture(id_client:number){
    try{
        const exist = await prisma.facture.findFirst({where:{id_client,etat:'a_payer'}});
        if(exist){
            return exist
        }
        const newFacture = await prisma.facture.create({data:{
            id_client
        }});
        return newFacture;

    }catch(error){

    }
}

export async function finishFacture(id_facture:number){
    try{
        const update = await prisma.facture.update({
            where:{
                id_facture
            },data:{
                etat:'payer'
            }

        })
    }catch(error){

    }
}