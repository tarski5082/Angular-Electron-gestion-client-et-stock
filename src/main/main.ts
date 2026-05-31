import { app, BrowserWindow,ipcMain} from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { loadProduct,Stock,addStock, updateStock,getStockById } from '../data/stock';
import { _Client } from '../data/client';
import { CustomerProfile,getCustomerProfile} from '../data/customer';
import {createCustomer,loadCustomer,updateCustomer} from '../data/customer';
import { deleteClientById, getClientById,addClient} from '../data/client';
import { updateClient } from '../data/client';
import { addLocalite,_Localite } from '../data/localite';
import { createAdress,_Adresse } from '../data/adresse';
import { createFacture,finishFacture,factureClientId } from '../data/facture';
import { takeCommande,Commande } from '../data/commande';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}
//Commande
ipcMain.handle('commande:take',async(event,command:Commande)=>takeCommande(command));




//Facture
ipcMain.handle('facture:create',async(event,id_client)=>createFacture(id_client));

ipcMain.handle('facture:finish',async(event,id_facture)=>{
  const fact = finishFacture(id_facture);
});
ipcMain.handle('facture:get-client',async (event,id_facture) =>factureClientId(id_facture));

//Produit
ipcMain.handle('product:add',async(event,product:Stock)=>{
  const prod = addStock(product)
});

ipcMain.handle('product:update',async(event,id_produit:number,quantite:number)=>{
  const update = await updateStock(id_produit,quantite);
});
ipcMain.handle('product:get',async (event,id_produit:number)=>getStockById(id_produit));

//Customer

ipcMain.handle('customer:add-customer',async(_event,customer:CustomerProfile)=>{
  createCustomer(customer);
});
ipcMain.handle('customer:update',async(event,id:number,customer:CustomerProfile)=>updateCustomer(id,customer));



ipcMain.handle('customer:load-customer',async(event) =>loadCustomer());

ipcMain.handle('product:loading',async(event)=>loadProduct());



ipcMain.handle('customer:get',async(event,id:number)=>getCustomerProfile(id));
//client CRUD
ipcMain.handle("client:add", async (_event, data) => addClient(data));

// Delete Client
ipcMain.handle("client:deleteById", async (_event, id: number) => deleteClientById(id));

// Get Client By ID
ipcMain.handle("client:getById", async (_event, id: number) => getClientById(id));

// Update Client
ipcMain.handle("client:update",
async (_event,id_client: number,client:_Client ) => updateClient(id_client,client));

ipcMain.handle("localite:add",async (_event,localite:_Localite)=> addLocalite(localite));
ipcMain.handle("adresse:add",async (_event,localite:_Adresse)=> createAdress(localite));


function createWindow(): void {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox:false
    },
  });



  
  
  
    // If running the packaged/built app
    // Forge automatically maps MAIN_WINDOW_VITE_NAME to your window's assets
    win.loadFile(path.join(__dirname, '..', '..', 'renderer/app/dist/app/browser/index.html'));
  
}



app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

  // Open the DevTools.



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
