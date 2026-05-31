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
      this.take.takeCommande({
        id_produit:value.id_produit,
        id_facture:value.id_facture,
        quantite:quantite ?? 0
      });
    }
  }

}
