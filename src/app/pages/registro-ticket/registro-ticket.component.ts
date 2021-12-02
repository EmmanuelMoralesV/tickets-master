import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { TicketService } from 'src/services/ticket.service';


@Component({
  selector: 'app-registro-ticket',
  templateUrl: './registro-ticket.component.html',
  styleUrls: ['./registro-ticket.component.css']
})
export class RegistroTicketComponent implements OnInit {

  departamentos=[
    "Dirección General","Compras","Alamcén","Logística","Producción","Marketing",
    "Comercial","TI","Administración y Contabilidad",
    "Finanzas y control de gestión","Recursos Humanos"
  ];

  constructor(private ticketSetvice:TicketService,public authService:AuthService) { }

  formulario =this.ticketSetvice.form;
  agregar=[];


  ngOnInit(): void {
  }
  agregarTicket= ticket=>this.agregar.push(ticket);
  eliminarticket= ticket=>{
    let index =this.agregar.indexOf(ticket);
    if (index>-1)this.agregar.splice(index,1);
  };
  onSubmit(){
    this.formulario.value.agregar = this.agregar;
    let data = this.formulario.value;
    this.ticketSetvice.crearTicket(data).then(res => {});

    this.agregar =[];
    this.formulario.setValue({
      requester: '',
      asunto:'',
      descripcion:'',
      status:false,
      fecha:'',
      hora:''
    });
  }


}
