import { app, BrowserWindow,ipcMain} from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient,Client } from '../generated/prisma/client';
import { _Client } from '../data/client';
import { CustomerProfile } from '../data/customer';
import {createCustomer,loadCustomer} from '../data/customer';
import { deleteClientById, getClientById,addClient} from '../data/client';
import { updateClient } from '../data/client';
const dbPath = path.join(__dirname, '..', '..', 'dev.db');
const adapter = new PrismaBetterSqlite3({ url: 'file:' + dbPath });

const prisma = new PrismaClient({adapter});
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

ipcMain.handle('customer:add-customer',async(_event,customer:CustomerProfile)=>{
  createCustomer(customer);
});

ipcMain.handle('customer:load-customer',async(event) =>loadCustomer());


//client CRUD
ipcMain.handle("client:add", async (_event, data) => addClient(data));

// Delete Client
ipcMain.handle("client:deleteById", async (_event, id: number) => deleteClientById(id));

// Get Client By ID
ipcMain.handle("client:getById", async (_event, id: number) => getClientById(id));

// Update Client
ipcMain.handle("client:update",
async (_event,id_client: number,client:_Client ) => updateClient(id_client,client));




function createWindow(): void {
  const win = new BrowserWindow({
    width: 500,
    height: 450,
    webPreferences: {
      // Electron Forge + Vite automatically bundles the preload script. 
      // It exposes a global constant pointing to its built path.
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
