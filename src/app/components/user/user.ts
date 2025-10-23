import { Component, inject  } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Servform } from '../../services/servform';

@Component({
  selector: 'app-userComponent',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './userComponent.html',
  styles: ``
})
export class UserComponent {
name = new FormControl('');
 private userServ = inject(Servform);
  private formBuilder = inject(FormBuilder);

   formu = this.formBuilder.group({
    name: ['', [Validators.required]],
    passw: ['', [Validators.required]],
    confirm: ['', [Validators.required]]
  })
 

      handleSend() {

    if (this.formu.valid) {
      const data = this.formu.value;
      console.log('Enviando datos:', data);

      this.userServ.createUser(data).subscribe({
        next: (response) => {
          console.log('Respuesta del backend:', response);
        },
        error: (err) => {
          console.error('Error al enviar:', err);
        }
      });
    } else {
      console.warn('Formulario inválido');
    }
    console.log(this.formu)
  }
}


