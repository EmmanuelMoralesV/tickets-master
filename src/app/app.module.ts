import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerificarEmailComponent } from './pages/verificar-email/verificar-email.component';
import { AuthService } from '../services/auth.service';
import { PrincipalComponent } from './pages/principal/principal.component';
import { TicketsListComponent } from './pages/tickets-list/tickets-list.component';
import { RegistroTicketComponent } from './pages/registro-ticket/registro-ticket.component';
import { TicketService } from 'src/services/ticket.service';
import { ContactoComponent } from './pages/contacto/contacto.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    ForgotPasswordComponent,
    VerificarEmailComponent,
    PrincipalComponent,
    TicketsListComponent,
    RegistroTicketComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    AuthService,
    TicketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
