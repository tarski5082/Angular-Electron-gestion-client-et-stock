

import { createAdress } from './adresse';
import { addLocalite } from './localite';
import { addClient,_Client } from './client';
import { prisma } from './dbconnect';



export interface CustomerProfile {
  id_client?:number,
  nom: string;
  prenom: string;
  email?:string;
  adresse: {
    rue:string;
    numero:string;
    boite?:string;
    localite?:{
        code_postale?:string;
        province?:string;
        localite?:string;
    }
  }
}



export async function createCustomer(data: CustomerProfile) {
  try {
    const loc = await addLocalite({
      code_postale:data.adresse.localite?.code_postale,
      province:data.adresse.localite?.province,
      localite:data.adresse.localite?.localite
    })

    const add = await createAdress({
      rue:data.adresse.rue,
      numero:data.adresse.numero,
      boite:data.adresse.boite||'',
      id_localite:loc.id_localite
    });

    const client = await addClient({
      nom:data.nom,
      prenom:data.prenom,
      email:data.email,
      id_adresse:add.id_adresse
    })
  } catch (error) {
    console.error("Erreur lors de la création du client :", error);
    throw error; // Ne laisse pas le catch vide, sinon la fonction renverra `undefined` silencieusement
  }
}


export async function updateCustomer(id_client:number,data:CustomerProfile) {
    try{
      const updateClient = await prisma.client.update({where:{id_client},data:{
        nom:data.nom,
        prenom:data.prenom,
        email:data.email,

        adresse:{
          update:{
            rue:data.adresse.rue,
            numero:data.adresse.numero,
            boite:data.adresse.boite,

            localite:{
              update:{
                code_postale:data.adresse.localite?.code_postale,
                province:data.adresse.localite?.province,
                localite:data.adresse.localite?.localite
              }
            }
          }
        }
      }});
      return updateClient;
    }catch(error){
      
    }
}


export async function getCustomerProfile(id_client: number): Promise<CustomerProfile | null> {
  // 1. Fetch the client with nested relation data
  const client = await prisma.client.findUnique({
    where: { id_client },
    include: {
      adresse: {
        include: {
          localite: true,
        },
      },
    },
  });

  // 2. If no client is found, return null
  if (!client) {
    return null;
  }

  // 3. Map the Prisma model structure to your CustomerProfile interface structure
  return {
    id_client: client.id_client,
    nom: client.nom,
    prenom: client.prenom,
    email: client.email ?? undefined, 
    adresse: client.adresse
      ? {
          rue: client.adresse.rue,
          numero: client.adresse.numero,
          boite: client.adresse.boite ?? undefined,
          localite: client.adresse.localite
            ? {
                code_postale: client.adresse.localite.code_postale ?? undefined,
                province: client.adresse.localite.province ?? undefined,
                localite: client.adresse.localite.localite ?? undefined,
              }
            : undefined,
        }
      : { rue: '', numero: '' }, 
  };
}



export async function loadCustomer(): Promise<_Client[]>{
    const clients = await prisma.client.findMany({
    include: {
      adresse: true,
    },
  });
  return clients.map((client) => ({
    id_client:client.id_client,
    prenom: client.prenom,
    nom: client.nom,
    email:client.email || undefined,
    id_adresse:client.id_adresse||undefined,
  }));
}



