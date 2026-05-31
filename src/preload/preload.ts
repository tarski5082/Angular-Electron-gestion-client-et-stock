// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer } from 'electron';
import { CustomerProfile } from 'src/data/customer'; 
import { Client } from 'src/generated/prisma/client';
import { _Adresse} from 'src/data/adresse';
import { _Localite} from 'src/data/localite';
import { Stock } from 'src/data/stock';
import {Commande} from 'src/data/commande';



contextBridge.exposeInMainWorld('api', {


//Commande

  takeCommande:(commande:Commande)=>ipcRenderer.invoke('commande:take'),


  
//Facture
  createFacture:(id_client:number)=>ipcRenderer.invoke('facture:create',id_client),
  finishFacture:(id_facture:number)=>ipcRenderer.invoke('facture:finish',id_facture),
  factureClientId:(id_facture:number)=>ipcRenderer.invoke('facture:get-client',id_facture),
  //Customer
  addCustomer: (customer:CustomerProfile) => ipcRenderer.invoke('customer:add-customer',customer),
  loadCustomer:()=>ipcRenderer.invoke('customer:load-customer'),
  getCustomer:(customer:CustomerProfile)=>ipcRenderer.invoke("customer:get",customer),
  updateCustomer:(id:number,customer:CustomerProfile)=>ipcRenderer.invoke("customer:update",id,customer),
  //Product
  loadProduct:()=>ipcRenderer.invoke('product:loading'),
  addProduct:(product:Stock)=>ipcRenderer.invoke('product:add',product),
  updateStock:(id_product:number,quantite:number)=>ipcRenderer.invoke('product:update',id_product,quantite),
  //Client
  getClientById:(id:number)=>ipcRenderer.invoke("client:getById",id),
  deleteClientById:(id:number)=>ipcRenderer.invoke("client:deleteById",id),
  addClient:(client:Client)=>ipcRenderer.invoke("client:add",client),
  updateClient:(id:number,nom:string,prenom:string)=>ipcRenderer.invoke("client:update",id,nom,prenom),

  addLocalite:(localite:_Localite)=>ipcRenderer.invoke("localite:add",localite),
  createAdress:(adresse:_Adresse)=>ipcRenderer.invoke("adresse:add",adresse),
  
});