import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user';
import { App } from './app';
import { Sala1 } from './components/sala1/sala1';
import { NewuserComponent } from './components/newuser/newuser.component';
import { Home } from './components/home/home';
import { Proyect } from './components/proyect/proyect';
import { Live } from './components/live/live';

export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },

  { path: 'home', component: Home },

  { path: 'live', component: Live },

  { path: 'proyect', component: Proyect },

  { path: 'user', component: UserComponent },

  { path: 'newuser', component: NewuserComponent },

  { path: 'actor', component: Sala1 }


];
