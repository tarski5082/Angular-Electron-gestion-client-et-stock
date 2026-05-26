import { Client } from "./client";

export interface CustomerProfile {
id_client:number;
  prenom: string;
  nom: string;
  adresse: Adresse|null;
}

export interface ElectronApi{
    addCustomer:(CustomerProfile)=> Promise<any>;
    loadCustomer:()=>Promise<CustomerProfile[]>;
    deleteClientById:(id:number)=>Promise<void>;
}


declare global {
    interface Window {
        api: ElectronApi;
    }
}