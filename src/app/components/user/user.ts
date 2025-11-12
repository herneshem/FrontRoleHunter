import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Servform } from '../../services/servform';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-userComponent',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './userComponent.html',
  styles: ``
})
export class UserComponent {


  name = new FormControl('');
  private userServ = inject(Servform);
  private formBuilder = inject(FormBuilder);
  private router: Router = inject(Router);


  //FORMULARIO PARA VALIDAR
  formu = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    password: ['', [Validators.required]],

  })

  //FORMULARIO PARA ELIMINAR USUARIO EXISTENTE
  deleteForm = new FormGroup({
    id_Usuario: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required)


  });

  

  // FUNCIONES LOGIN Y ELIMINAR

  handleSend() {

    if (this.formu.valid) {
      const { nombre, password } = this.formu.value;
      console.log('Enviando datos:', { nombre, password });

      this.userServ.loginUser({ nombre, password }).subscribe({
        next: (response) => {
          console.log('Respuesta del backend:', response);
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/home']);
          this.formu.reset();
        },
        error: (err) => {
          alert("Usario no existente")
          console.error('Error al enviar:', err);
        }
      });
    } else {
      console.warn('Formulario inválido');
    }
    console.log(this.formu)
  }


  deleteUser() {
    const id_Usuario = Number(this.deleteForm.get('id_Usuario')?.value);

    if (!id_Usuario) {
      alert('Debes ingresar un ID/nombre válido');
      return;
    }

    this.userServ.deleteUser(id_Usuario).subscribe(() => {
      alert('Usuario eliminado ');
      this.deleteForm.reset();
    });

  }

}


