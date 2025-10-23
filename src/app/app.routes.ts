import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user';
import { App } from './app';
import { Sala1 } from './components/sala1/sala1';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    

    { path: 'actor', component: Sala1},

  {
  path: 'user', component: UserComponent}

];
