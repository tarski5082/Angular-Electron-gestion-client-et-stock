import { Component,inject } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,Validators } from '@angular/forms';
import { Stock } from '../../../types/product';
import { ProductService } from '../../services/product-service';
@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  fb = inject(FormBuilder);
  prod = inject(ProductService);
  productForm = this.fb.group({
    urlImage:['',Validators.required],
    intitule_produit:['',Validators.required],
    quantite:[0, [Validators.required, Validators.min(1)]],
    prix_unitaire:[0,[Validators.required, Validators.min(0.01)]]
  });


  onSubmit(){
    if(this.productForm.valid){
      const formData = this.productForm.getRawValue() as Stock;
      this.prod.addProduct(formData);
    }else{
      this.productForm.markAllAsTouched();
    }
  }
}
