import { Component,effect,inject,input,OnInit, output } from '@angular/core';
import {ReactiveFormsModule,FormBuilder,Validators} from '@angular/forms';
import { CustomerProfile} from '../../../../types/customer-profil';
@Component({
  selector: 'app-profile-form',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.css',
})
export class ProfileForm{
    id = input<string>();
    customer = input<CustomerProfile>();
    customerdata = output<CustomerProfile>();
    private readonly fb = inject(FormBuilder);
    att? = '';
    customerForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email:['',Validators.required],
    
      adresse: this.fb.group({
        rue: ['', Validators.required],
        numero: ['', Validators.required],
        boite: [''], 
        localite:this.fb.group({
          code_postale:['',Validators.required],
          province:['Hainaut', Validators.required],
          localite:['', Validators.required]
        })
      })
    });

    onSubmit(){
      if (this.customerForm.valid) {
        const formValue = this.customerForm.getRawValue() as CustomerProfile;
        this.customerdata.emit(formValue);
        
        
    } else {
      this.customerForm.markAllAsTouched();
      }
    }
    
   

    constructor() {
    effect(() => {
      const customer = this.customer();

      if (customer) {
        this.customerForm.patchValue({
          prenom: customer.prenom,
          nom: customer.nom,
          email:customer.email,
          adresse:{
            rue:customer.adresse.rue,
            numero:customer.adresse.numero,
            boite:customer.adresse.boite,
          }
        });


        this.customerForm.get('adresse.localite')?.patchValue({
          code_postale: customer.adresse.localite?.code_postale ?? '9999',
          province: customer.adresse.localite?.province ?? 'Hainaut',
          localite: customer.adresse.localite?.localite ?? ''
       });
        
      }
    });
  }
}
