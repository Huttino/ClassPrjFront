import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AppComponent } from './Components/root-component/app.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { RegistrationPageComponent } from './Components/registration-page/registration-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './Components/home/home.component';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { RouterLink } from '@angular/router';
import { ProfileComponent } from './Components/profile/profile.component';
import { ClassDetailsComponent } from './Components/class-details/class-details.component';
import { ClassListComponent } from './Components/class-list/class-list.component';
import { ChatComponent } from './Components/chat/chat.component';
import { CardElementComponent } from './Components/card-element/card-element.component';
import { LessonPageComponent } from './Components/lesson-page/lesson-page.component';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    HomeComponent,
    SideBarComponent,
    ProfileComponent,
    ClassDetailsComponent,
    ClassListComponent,
    ChatComponent,
    CardElementComponent,
    LessonPageComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    YouTubePlayerModule
  ],
  providers: [RouterLink, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
