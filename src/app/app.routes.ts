import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user';
import { App } from './app';
import { Sala1 } from './components/sala1/sala1';
import { NewuserComponent } from './components/newuser/newuser.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },


  { path: 'user', component: UserComponent },

  { path: 'newuser', component: NewuserComponent },
  { path: 'actor', component: Sala1 }

];
