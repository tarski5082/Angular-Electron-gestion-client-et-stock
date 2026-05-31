import { Component,input,output,OnInit } from '@angular/core';
import { Stock } from '../../../types/product';
@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem{
  product=input.required<Stock>();
  id = output<number>();
  
  onSubmit(){
    this.id.emit(this.product().id_produit);
  }

  
}
