import { Injectable,inject } from '@angular/core';
import { Stock } from '../../types/product';
import { ElectronService } from './electron-service';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  electron = inject(ElectronService);

  loadProduct():Promise<Stock[]>{
    return this.electron.getApi().loadProduct();
  }
  addProduct(product:Stock):Promise<Stock>{
    return this.electron.getApi().addProduct(product);
  }

  updateStock(id:number,quantite:number){
    const update = this.electron.getApi().updateStock(id,quantite);
  }
}
