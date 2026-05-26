import { Component,inject } from '@angular/core';
import {ReactiveFormsModule,FormBuilder,Validators} from '@angular/forms';
import { CustomerProfile} from '../../../../types/customer-profil';
@Component({
  selector: 'app-profile-form',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.css',
})
export class ProfileForm {
    private readonly fb = inject(FormBuilder);

    customerForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
    // Grouping address fields makes data management cleaner
      adresse: this.fb.group({
        rue: ['', Validators.required],
        numero: ['', Validators.required],
        boite: [''], // Optional field
        localite:this.fb.group({
          code_postal:[Validators, Validators.pattern(/^[0-9]{4}$/)],
          province:['Hainaut', Validators],
          ville:['', Validators]
        })
      })
    });

    onSubmit(){
      if (this.customerForm.valid) {
      
        // 1. Get the raw value from the form (ignores disabled states, ensures complete data)
        const formValue = this.customerForm.getRawValue();

// 2. Map the form structure to match the CustomerProfile interface exactly
        const newCustomer: CustomerProfile = {
          prenom: formValue.prenom ?? '',
          nom: formValue.nom ?? '',
          adresse: {
            rue: formValue.adresse.rue ?? '',
            numero: formValue.adresse.numero ?? '',
            boite: formValue.adresse.boite || undefined, // Converts empty string '' to undefined if omitted
            localite?:{
              code_postal?:formValue.adresse.localite.code_postal ?? '',       // Mapping 'cp' from form to 'codePostal' in interface
              province?: formValue.adresse.localite.province ?? '',
              ville?: formValue.adresse.localite.ville ?? ''
            } 
          }
        };
        window.api.addCustomer(newCustomer);
      console.log('Form Submitted Data:', this.customerForm.value);
      
      // Example: Send this.userForm.value to a backend service here
    } else {
      // Mark all fields as touched to trigger visual validation errors
      this.customerForm.markAllAsTouched();
      console.log('Form is invalid, please check the fields.');
    }
    }


}
