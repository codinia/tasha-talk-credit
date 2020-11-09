import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingFormComponent } from './landing-form/landing-form.component';

const routes: Routes = [
  { path: '', component: LandingFormComponent },
  // { path: 'second-component', component: SecondComponent },
  { path: '**',   redirectTo: '', pathMatch: 'full' }, 
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
