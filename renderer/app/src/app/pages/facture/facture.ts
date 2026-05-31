import { Component,input } from '@angular/core';

@Component({
  selector: 'app-facture',
  imports: [],
  templateUrl: './facture.html',
  styleUrl: './facture.css',
})
export class Facture {
  id = input<string>;
}
