import { Component } from '@angular/core';
import { NavItem } from '../../../../types/nav';
import { RouterOutlet, RouterLinkWithHref,RouterLinkActive,RouterLink } from '@angular/router';

@Component({
  selector: 'app-navcomponent',
  imports: [RouterLinkWithHref,RouterLinkActive,RouterLink],
  templateUrl: './navcomponent.html',
  styleUrl: './navcomponent.css',
})
export class Navcomponent {
  navItems:NavItem[] =[
    {label:'Acceuil',link:'/'},
    {label:'Produit',
      open:false,
      children:[
        {label:'Ajouter',link:'/productForm'},
        {label:'Catalogue',link:'/productfolder'}
      ]
    },
    {
      label:'Client',link:'/profileCreate'
    },
    {label:'Commande',link:'/command'}
  ]

}
