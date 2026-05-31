import { Component,input,inject,computed } from '@angular/core';
import { Commande } from '../../../types/productCommande';
import { ReactiveFormsModule,FormBuilder,Validators } from '@angular/forms';
import { CommandeService } from '../../services/commande-service';
@Component({
  selector: 'app-product-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  id_facture=input<string>();
  id_produit=input<string>();

  commande = input.required<Commande>();
  fb=inject(FormBuilder);
  take = inject(CommandeService);
  commandeForm = this.fb.group({
    quantite:[0, [Validators.required, Validators.min(1)]]
  });

  onSubmit(){
    if(this.commandeForm.valid){
      const {quantite} = this.commandeForm.getRawValue();
      const value:Commande = this.commande();
      const id_produit = Number(this.id_produit());
      const id_facture = Number(this.id_facture());
      if (isNaN(id_produit) || isNaN(id_facture) || this.id_produit() === undefined || this.id_facture() === undefined) {
        console.error("Route parameters are missing!");
        return;
      }
      this.take.takeCommande({
        id_produit:Number(id_produit),
        id_facture:Number(id_facture),
        quantite:quantite ?? 0
      });
    }
  }

}
