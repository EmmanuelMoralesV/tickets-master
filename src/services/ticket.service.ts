import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private firestore:AngularFirestore) { }

  form=new FormGroup({
    requester: new FormControl(''),
    asunto:new FormControl(''),
    descripcion:new FormControl(''),
    status:new FormControl(false),
    fecha:new FormControl(''),
    hora:new FormControl('')

  });

  crearTicket(data){
    return new Promise<any>((resilve,reject)=>{
      this.firestore.collection('ticket').add(data).then(res=>{},
        err=>reject(err));
    });
  }
}
