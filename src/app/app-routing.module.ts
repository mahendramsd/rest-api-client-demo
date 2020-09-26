import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { FetchComponent } from './fetch/fetch.component';
import { ParentComponent } from './parent/parent.component';

const routes: Routes = [
  { path: '', component: FetchComponent, canActivate: [AuthGaurdService] },
  { path: 'parent', component: ParentComponent, canActivate: [AuthGaurdService] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
