import path from 'node:path';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient,Client,Adresse } from '../generated/prisma/client';

const dbPath = path.join(__dirname, '..', '..', 'dev.db');
const adapter = new PrismaBetterSqlite3({ url: 'file:' + dbPath });

const prisma = new PrismaClient({adapter});

export interface CustomerProfile {
  prenom: string;
  nom: string;
  adresse: {
    rue: string;
    numero: string;
    boite?: string;
    codePostal: string;
    ville: string;
    province: string;
  };
}



export async function createCustomer(data: CustomerProfile): Promise<Client> {
  try {
    const newClient = await prisma.client.create({
      data: {
        prenom: data.prenom,
        nom: data.nom,
        
        adresse: {
          create: {
            rue: data.adresse.rue,
            numero: data.adresse.numero,
            boite: data.adresse.boite,
            codePostal: data.adresse.codePostal,
            ville: data.adresse.ville,
            province: data.adresse.province,
          },
        },
      },
      // Optional: Includes the address details in the returned object
      include: {
        adresse: true,
      },
    });

    return newClient;
  } catch (error) {
    console.error("Error inserting client and address:", error);
    throw error;
  }
}

