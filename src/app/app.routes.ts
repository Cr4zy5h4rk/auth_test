import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { CallbackComponent } from './component/callback/callback.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
