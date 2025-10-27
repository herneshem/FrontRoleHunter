import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Servform } from '../../services/servform';

@Component({
  selector: 'app-newuser',
  imports: [ReactiveFormsModule],
  templateUrl: './newuser.component.html',
  styles: ``
})
export class NewuserComponent {
  name = new FormControl('');
 private userServ = inject(Servform);
  private formBuilder = inject(FormBuilder);

  inscription = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirm: ['', [Validators.required]]
  })

    newhandleSend() {

    if (this.inscription.valid) {
      const data = this.inscription.value;
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
    console.log(this.inscription)
  }
}
