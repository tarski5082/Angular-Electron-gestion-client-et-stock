import { Component,inject } from '@angular/core';
import { CustomerList } from '../../component/customer-list/customer-list';
import { FactureService } from '../../services/facture-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-commande',
  imports: [CustomerList],
  templateUrl: './commande.html',
  styleUrl: './commande.css',
})
export class Commande {
  product = inject(FactureService);
  route:Router = inject(Router);
  makeCommande(id:number){
    this.product.createFacture(id);
    this.route.navigate(['/productChoose/id']);
  }
}
