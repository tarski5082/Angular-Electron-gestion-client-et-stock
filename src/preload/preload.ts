// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer } from 'electron';
import { CustomerProfile } from 'renderer/app/src/types/electron';
import { addClient, deleteClientById, getClientById, updateClient } from 'src/data/client';
import { loadCustomer } from 'src/data/customer';
import { Client } from 'src/generated/prisma/client';
contextBridge.exposeInMainWorld('api', {
  addCustomer: (customer:CustomerProfile) => ipcRenderer.invoke('customer:add-customer',customer),
  loadCustomer:()=>ipcRenderer.invoke('customer:load-customer'),

  getClientById:(id:number)=>ipcRenderer.invoke("client:getById",id),
  deleteClientById:(id:number)=>ipcRenderer.invoke("client:deleteById",id),
  addClient:(client:Client)=>ipcRenderer.invoke("client:add",client),
  updateClient:(id:number,nom:string,prenom:string)=>ipcRenderer.invoke("client:update",id,nom,prenom)

  
});