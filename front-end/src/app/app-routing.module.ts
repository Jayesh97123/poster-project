import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PosterComponent } from './poster/poster.component';
import { CreateUpdatePosterComponent } from './poster/components/create-update-poster/create-update-poster.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'poster-list/:email', component: PosterComponent },
  {
    path: 'poster-form/:email/:id/:isUpdate',
    component: CreateUpdatePosterComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
