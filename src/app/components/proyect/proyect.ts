import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Servproyect } from '../../services/servproyect';


@Component({
  selector: 'app-proyect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyect.html',
  styles: ``
})
export class Proyect {

  proyecto: any = {
    titulo: "",
    fechas: "",
    sexartist: "",
    altura: "",
    lugar: "",
    edad: "",
    remunerado: "Trabajo remunerado económicamente",
  


  }

  constructor(private servproy: Servproyect) { }

  ngOnInit() {
    this.servproy.reciveDates().subscribe({
      next: (data: any) => {
        if (data.length > 0) {
          this.proyecto = data[0];
        }
      },
      error: (err) => {
        console.error("Error al traer los datos del proyecto:", err);
      },
      complete: () => {
        console.log("Datos del proyecto cargados");
      }
    });
  }
}
