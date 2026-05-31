import { Component,signal,inject,OnInit,output } from '@angular/core';
import { Stock } from '../../../types/product';
import { ProductService } from '../../services/product-service';
import { ProductItem } from '../../component/product-item/product-item';

@Component({
  selector: 'app-product-catalogue',
  imports: [ProductItem],
  templateUrl: './product-catalogue.html',
  styleUrl: './product-catalogue.css',
})
export class ProductCatalogue implements OnInit{
  products = signal<Stock[]>([]);
  productservice = inject(ProductService);
  id = output<number>();

  sendId(id:number){
    this.id.emit(id);
  }
  async load(){
    this.products.set(await this.productservice.loadProduct());
  }
  ngOnInit(): void {
    this.load();
  }
}
