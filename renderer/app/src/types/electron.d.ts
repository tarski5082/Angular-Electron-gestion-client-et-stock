import { Client } from "./client";

import { CustomerProfile } from "./customer-profil";
import { Stock } from "./product";
import { Commande } from "./productCommande"; 
export interface ElectronApi{
    addCustomer:(CustomerProfile)=> Promise<any>;
    loadCustomer:()=>Promise<CustomerProfile[]>;
    deleteClientById:(id:number)=>Promise<void>;
    getCustomer:(id:number)=>Promise<CustomerProfile>;
    updateCustomer:(id:number,customer:CustomerProfile)=>Promise<CustomerProfile>;
    loadProduct:()=>Promise<Stock[]>;
    addProduct:(product:Stock)=>Promise<Stock>;
    updateStock:(id:number,quantite:number)=>Promise<void>;
    createFacture:(id_client:number)=>Promise<void>;
    finishFacture:(id_facture:number)=>Promise<void>;
    takeCommande:(commande:Commande)=>Promise<Commande>;
    factureClientId:(id_facture:number)=>Promise<number>;
}


declare global {
    interface Window {
        api: ElectronApi;
    }
}