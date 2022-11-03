import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './Components/chat/chat.component';
import { ClassDetailsComponent } from './Components/class-details/class-details.component';
import { ClassListComponent } from './Components/class-list/class-list.component';
import { ClassRoomPresentationComponent } from './Components/class-room-presentation-component/class-room-presentation.component';
import { HomeComponent } from './Components/home/home.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { LessonPageComponent } from './Components/lesson-page/lesson-page.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegistrationPageComponent } from './Components/registration-page/registration-page.component';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { AuthGuard } from './Service/Guard/AuthGuard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, outlet: 'primary' },
  { path: 'landingPage', component: LandingPageComponent, outlet: 'primary' },
  { path: 'registration', component: RegistrationPageComponent, outlet: 'primary' },
  { path: 'sidebar', component: SideBarComponent, outlet: 'primary', canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, outlet: 'content', canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, outlet: 'content', canActivate: [AuthGuard] },
  { path: 'class/:cod', component: ClassDetailsComponent, outlet: 'content', canActivate: [AuthGuard] },
  { path: 'classList', component: ClassListComponent, outlet: 'content', canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent, outlet: 'content', canActivate: [AuthGuard] },
  { path: 'lesson', component: LessonPageComponent, outlet: 'content', canActivate: [AuthGuard] },
  { path: 'classRoomPresentation/:cod', component: ClassRoomPresentationComponent, outlet: 'content', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'landingPage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
