

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
        code_postal?:string;
        province?:string;
        localite?:string;
    }
  }
}



export async function createCustomer(data: CustomerProfile) {
  try{
    return await prisma.client.create({
    data: {
      nom: data.nom,
      prenom: data.prenom,
      email: data.email || null, // Map optional string to null for Prisma
      
      // 1. Create the Address at the same time
      adresse: {
        create: {
          rue: data.adresse.rue,
          numero: data.adresse.numero,
          boite: data.adresse.boite || '',
          
          localite: data.adresse.localite
            ? {
                create: {
                  code_postale: data.adresse.localite.code_postal, 
                  province: data.adresse.localite.province,
                  localite: data.adresse.localite.localite,
                },
              }
            : undefined, // Skips locality creation if data.adresse.localite is missing
        },
      },
    },
    // Optional: include the relation data in the returned object
    include: {
      adresse: {
        include: {
          localite: true,
        },
      },
    },
  });}catch(error){
    
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
                code_postale:data.adresse.localite?.code_postal,
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


export async function test() {
  const clientId = 7; // The ID of the client you want to update

  // 1. Prepare the updated data object
  const updatedData: CustomerProfile = {
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@example.com",
    adresse: {
      rue: "Rue de la Loi",
      numero: "16",
      boite: "B5",
      localite: {
        code_postal: "1000",
        province: "Bruxelles",
        localite: "Bruxelles"
      }
    }
  };
  const testfunction = await updateCustomer(clientId,updatedData);
  console.log(testfunction);

}




export async function loadCustomer(): Promise<_Client[]>{
    const clients = await prisma.client.findMany({
    include: {
      adresse: true,
    },
  });
  console.log(clients.map((client)=>({prenom:client.prenom})));
  return clients.map((client) => ({
    id_client:client.id_client,
    prenom: client.prenom,
    nom: client.nom,
    id_adresse:client.id_adresse,
  }));
}


export async function runExample() {
  try {
    // 1. Prepare data matching the CustomerProfile interface
    const newCustomerData: CustomerProfile = {
      nom: "Dupont",
      prenom: "Jean",
      email: "jean.dupont@example.com", // Optional
      adresse: {
        rue: "Rue de la Loi",
        numero: "16",
        boite: "B3", // Optional
        localite: {  // Optional nested object
          code_postal: "1000",
          province: "Bruxelles",
          localite: "Bruxelles"
        }
      }
    };

    console.log("Creating customer in database...");
    
    // 2. Call the function exactly once
    const createdCustomer = await createCustomer(newCustomerData);
    
    // 3. Log the result (which includes the relations thanks to your `include` block)
    console.log("Customer created successfully!", createdCustomer);
    
  } catch (error) {
    console.error("Error creating customer:", error);
  }
}
