import { Injectable } from '@angular/core';
import { ElectronApi } from '../../types/electron';
@Injectable({
  providedIn: 'root',
})
export class ElectronService {

  isElectron(): boolean {
    return !!(window && window.api);
  }
  
  getApi(): ElectronApi {
    if (!this.isElectron()) {
      throw new Error('window.api est introuvable — l\'application doit tourner dans Electron.');
    }
    return window.api;
  }
}
