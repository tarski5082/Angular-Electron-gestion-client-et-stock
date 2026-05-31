import { Component,signal,input } from '@angular/core';
import { ProductDetail } from '../../component/product-detail/product-detail';
@Component({
  selector: 'app-product-card',
  imports: [ProductDetail],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

}
