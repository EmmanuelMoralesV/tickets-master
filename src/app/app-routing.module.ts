import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { RegistroTicketComponent } from './pages/registro-ticket/registro-ticket.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { TicketsListComponent } from './pages/tickets-list/tickets-list.component';
import { VerificarEmailComponent } from './pages/verificar-email/verificar-email.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component: LoginComponent},
  {path:'registro',component :RegistroComponent},
  {path:'about',component: HomeComponent, canActivate: [AuthGuard]},
  {path:'forgot-password',component: ForgotPasswordComponent},
  {path:'verificar-email',component: VerificarEmailComponent},
  {path: 'principal', component: PrincipalComponent},
  {path: 'list',component:TicketsListComponent},
  {path: 'agregar',component:RegistroTicketComponent},
  {path: 'contacto',component:ContactoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
