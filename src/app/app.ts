import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Sala1 } from './components/sala1/sala1';





@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['../styles.css'] 
})
export class App {
  protected readonly title = signal('face');

  menuOpen = false;
  menuOpenmovil= false
 
}
