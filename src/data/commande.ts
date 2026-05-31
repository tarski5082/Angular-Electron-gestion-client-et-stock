import { prisma } from "./dbconnect";

export interface Commande{
  id_commande?:number;
  id_produit:number;
  id_facture:number;
  quantite:number;
}

export async function takeCommande(data:Commande){
    try{
        const commande = await prisma.produitCommande.findFirst({where:data});
        if(commande){
            return commande;
        }
        
        const newCommande = await prisma.$transaction([
            prisma.produitCommande.create({data:{
                id_produit:data.id_produit,
                id_facture:data.id_facture,
                quantite:data.quantite
            }}),prisma.produitStock.update({
                where:{ id_produit: data.id_produit,
                                                    id_facture: data.id_facture,
                                                }
                                                ,data:{
                                                    quantite:{
                                                        decrement:data.quantite
                                                    }
                                                }
                                            })
        ])
    }catch(error){

    }
}