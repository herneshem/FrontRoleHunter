import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Servform } from '../../services/servform';

@Component({
  selector: 'app-userComponent',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './userComponent.html',
  styles: ``
})
export class UserComponent {
  name = new FormControl('');
  private userServ = inject(Servform);
  private formBuilder = inject(FormBuilder);

  formu = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    password: ['', [Validators.required]],

  })


  handleSend() {

    if (this.formu.valid) {
      const { nombre, password } = this.formu.value;
      console.log('Enviando datos:', { nombre, password });

      this.userServ.loginUser({ nombre, password }).subscribe({
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


