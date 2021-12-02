import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})
export class TicketsListComponent implements OnInit {

  constructor( private ticketsService:AuthService,public authService:AuthService) { }

  ngOnInit() {
    this.getTickets();
  }
  tickets=[];
  //metodo que obtiene los registros de la bd
  getTickets = () =>
    this.ticketsService.getTickets().subscribe(res =>(this.tickets = res));

  //metodo para marcar  como completado
  marcarCompletado = data => this.ticketsService.updateTickets(data);
  //metodo para eliminar un registro de la bd
  eliminarTicket = data => this.ticketsService.deleteTickets(data);
}
