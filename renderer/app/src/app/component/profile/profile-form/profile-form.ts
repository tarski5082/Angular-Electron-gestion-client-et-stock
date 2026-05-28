import { Component,inject, OnInit } from '@angular/core';
import {ReactiveFormsModule,FormBuilder,Validators} from '@angular/forms';
import { CustomerProfile} from '../../../../types/customer-profil';
@Component({
  selector: 'app-profile-form',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.css',
})
export class ProfileForm{
    private readonly fb = inject(FormBuilder);

    customerForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email:['',Validators.required],
    
      adresse: this.fb.group({
        rue: ['', Validators.required],
        numero: ['', Validators.required],
        boite: [''], 
        localite:this.fb.group({
          code_postal:['',[Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
          province:['Hainaut', Validators.required],
          localite:['', Validators.required]
        })
      })
    });

    onSubmit(){
      if (this.customerForm.valid) {
        const formValue = this.customerForm.getRawValue() as unknown as CustomerProfile;
        window.api.addCustomer(formValue);  
    } else {
      this.customerForm.markAllAsTouched();
      }
    }
    

}
