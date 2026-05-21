// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import { CustomerProfile } from 'renderer/app/src/types/electron';
contextBridge.exposeInMainWorld('api', {
  addCustomer: (customer:CustomerProfile) => ipcRenderer.invoke('cust:add-customer',customer),
});