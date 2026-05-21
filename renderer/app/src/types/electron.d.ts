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

export interface ElectronApi{
    addCustomer:(CustomerProfile)=> Promise<any>;
}


declare global {
    interface Window {
        api: ElectronApi;
    }
}