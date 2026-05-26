import { Client } from "./client";
export interface CustomerProfile {
  prenom: string;
  nom: string;
  adresse?: {
    rue:string;
    numero:string;
    boite?:string;
    localite?:{
        code_postal?:string;
        province?:string;
        ville?:string;
    }
  }
}