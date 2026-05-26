

import {Client,Adresse } from '../generated/prisma/client';

import { prisma } from './dbconnect';



export interface CustomerProfile {
  id_client:number;
  prenom: string;
  nom: string;
  adresse: Adresse|null;
}



export async function createCustomer(data: CustomerProfile): Promise<Client> {
  try {
    const newClient = await prisma.client.create({
      data: {
        prenom: data.prenom,
        nom: data.nom,
      }
       
    });

    return newClient;
  } catch (error) {
    console.error("Error inserting client and address:", error);
    throw error;
  }
}

export async function loadCustomer(): Promise<CustomerProfile[]>{
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
    adresse:client.adresse,
  }));
}

