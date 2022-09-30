import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassDetailsComponent } from './Components/class-details/class-details.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegistrationPageComponent } from './Components/registration-page/registration-page.component';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { AuthGuard } from './Service/Guard/AuthGuard/auth.guard';

const routes: Routes = [
  {path:'login',component : LoginPageComponent,outlet:'primary'},
  {path:'registration',component:RegistrationPageComponent,outlet:'primary'},
  {path:'sidebar',component:SideBarComponent,outlet:'primary',canActivate:[AuthGuard]},
  {path:'home',component:HomeComponent,outlet:'content',canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,outlet:'content',canActivate:[AuthGuard]},
  {path:'class/:cod',component:ClassDetailsComponent,outlet:'content',canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
