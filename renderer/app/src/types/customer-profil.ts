import { Client } from "./client";
export interface CustomerProfile {
  id_client?:number;
  nom: string;
  prenom: string;
  email:string;
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