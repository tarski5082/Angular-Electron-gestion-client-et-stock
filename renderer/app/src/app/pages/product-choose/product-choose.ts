import { Component,inject,input } from '@angular/core';
import { ProductCatalogue } from '../../component/product-catalogue/product-catalogue';
import { Commande } from '../../../types/productCommande';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-choose',
  imports: [ProductCatalogue],
  templateUrl: './product-choose.html',
  styleUrl: './product-choose.css',
})
export class ProductChoose {
  id=input<string>();
  
  router:Router=inject(Router);
  redirectCommandeDetails(id_product:number){
    this.router.navigate(['/productDetails',this.id(),id_product]);
  }

}
