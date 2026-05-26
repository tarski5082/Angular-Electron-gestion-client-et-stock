import { Routes } from '@angular/router';
import { CustomerListPage } from './pages/customer-list-page/customer-list-page';
import { ProfileForm } from './component/profile/profile-form/profile-form';

export const routes: Routes = [{path:'',component:CustomerListPage},{path:'addProfile',component:ProfileForm}];
