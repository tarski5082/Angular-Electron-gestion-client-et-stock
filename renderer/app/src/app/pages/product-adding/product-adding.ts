import { Component } from '@angular/core';
import { ProductForm } from '../../component/product-form/product-form';
@Component({
  selector: 'app-product-adding',
  imports: [ProductForm],
  templateUrl: './product-adding.html',
  styleUrl: './product-adding.css',
})
export class ProductAdding {}
