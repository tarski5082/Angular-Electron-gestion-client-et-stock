import { inject, Injectable } from '@angular/core';
import { ElectronService } from './electron-service';
import { Commande } from '../../types/productCommande';
@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  electron= inject(ElectronService)
    takeCommande(commande:Commande):Promise<Commande>{
      return this.electron.getApi().takeCommande(commande);
    }
}
