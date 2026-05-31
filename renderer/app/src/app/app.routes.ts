import { Routes } from '@angular/router';
import { CustomerListPage } from './pages/customer-list-page/customer-list-page';
import { ProfileForm } from './component/profile/profile-form/profile-form';
import { CustomerProfileUpdate } from './pages/customer-profile-update/customer-profile-update';
import { ProductFolder } from './pages/product-folder/product-folder';
import { ProductAdding } from './pages/product-adding/product-adding';
import { CreateProfile } from './pages/create-profile/create-profile';
import { Commande } from './pages/commande/commande';
import { ProductChoose } from './pages/product-choose/product-choose';
import { ProductDetail } from './component/product-detail/product-detail';

export const routes: Routes = [{path:'',component:CustomerListPage},
                                {path:'command',component:Commande},
                                {path:'profileCreate',component:CreateProfile},
                                {path:'addProfile',component:ProfileForm},
                                {path:'client/:id',component:CustomerProfileUpdate},
                                {path:'productfolder',component:ProductFolder},
                                {path:'productForm',component:ProductAdding},
                                {path:'productChoose/:id',component:ProductChoose},
                                {path:'productDetails/:id_facture/:id_produit',component:ProductDetail}];
