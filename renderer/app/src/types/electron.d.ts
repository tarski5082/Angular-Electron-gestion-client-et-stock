import { Client } from "./client";

import { CustomerProfile } from "./customer-profil";

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