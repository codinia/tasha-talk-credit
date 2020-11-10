import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './guards/auth.guard';
import { LandingFormComponent } from './landing-form/landing-form.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LandingFormComponent,  },
  { path: 'login', component: LoginComponent },
  {path:'admin-panel', component: AdminPanelComponent,canActivate: [AuthGuard] },
  // { path: 'second-component', component: SecondComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
