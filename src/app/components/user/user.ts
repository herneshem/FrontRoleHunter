import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Servform } from '../../services/servform';
import { Router } from '@angular/router';

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
  private router: Router = inject(Router);



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
           localStorage.setItem('user', JSON.stringify(response)); 
          this.router.navigate(['/']);
          this.formu.reset();
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


