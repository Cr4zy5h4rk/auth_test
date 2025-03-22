import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'userprofile', component: UserProfileComponent },
];
