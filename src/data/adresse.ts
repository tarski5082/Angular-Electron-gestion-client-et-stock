import { prisma } from './dbconnect';





export interface _Adresse{
  rue:string;
  numero:string;
  boite:string;
  id_localite?:number;
}


export async function createAdress(data: _Adresse) {
  try {
    const newAdress = await prisma.adresse.create({data});
    return newAdress;
  } catch (error) {
    console.error("Error inserting address:", error);
    throw error;
  }
}

export async function getAdresse(id: number) {
  return prisma.adresse.findUnique({
    where: {
      id_adresse: id,
    },
  })
}

export async function updateAdresse(
  id: number,
  data: _Adresse,
) {
  return prisma.adresse.update({
    where: {
      id_adresse: id,
    },
    data,
  })
}

export async function deleteAdresseById(id: number) {
  return prisma.adresse.delete({
    where: {
      id_adresse: id,
    },
  })
}