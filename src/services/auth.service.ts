import { Route } from '@angular/compiler/src/core';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import firebase from 'firebase/app';

export interface User{
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userState: any;

  constructor(
    public firestore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.fireAuth.authState.subscribe(user=>{
      if(user){
        this.userState=user;
        localStorage.setItem('user',JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user'));
      }else{
        localStorage.setItem('user',null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  //método para loguearse mediante usuario/contraseña
  login(email,password){
    return this.fireAuth.signInWithEmailAndPassword(email,password)
    .then((result)=>{
      this.ngZone.run(()=>{
        this.router.navigate(['principal']);
      });
      this.setUserData(result.user);
    }).catch((error)=>{
      window.alert(error.message)
    })
  }

  //método para el registro de un nuevo usuario
  registro(email,password){
    return this.fireAuth.createUserWithEmailAndPassword(email,password)
    .then((result)=>{
      this.sendVerificationMail();
      this.setUserData(result.user);
    }).catch((error)=>{
      window.alert(error.message)
    })
  }

  //método para direccionar al usuario para que verifique su correo
  sendVerificationMail(){
    return this.fireAuth.currentUser.then(u => u.sendEmailVerification())
    .then(()=>{
      this.router.navigate(['verificar-email']);
    })
  }

  //método para cuando el usuario olvido su contraseña
  forgotPassword(passwordResetEmail){
    return this.fireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(()=>{
      window.alert('Se le envió un correo para restablecer la contraseña');
    }).catch((error)=>{
      window.alert(error)
    })
  }

  //método para cuando el usuario esté logueado retornará true
  get isLoggedIn(): boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    return (user != null && user.emailVerified != false) ? true : false;
  }

  //méodo para mandar llamar al provider de Google para autenticación
  googleAuth(){
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  facebookAuth(){
    return this.authLogin(new firebase.auth.FacebookAuthProvider());
  }

  //método para loguearse con algún provider (Google o algún otro)
  authLogin(provider){
    return this.fireAuth.signInWithPopup(provider)
    .then((result)=>{
      this.ngZone.run(()=>{
        this.router.navigate(['principal']);
      })
      this.setUserData(result.user);
    }).catch((error)=>{
      window.alert(error)
    })
  }

  //método que obtiene los datos del usuario logueado

  setUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.uid}`);
    const userState: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userState,{merge: true});
  }

  //método para cerrar sesión
  cerrarSesion(){
    return this.fireAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

  getTickets(){
    return this.firestore.collection('ticket').snapshotChanges();
  }
  updateTickets(data){
    return this.firestore.collection('ticket').doc(data.payload.doc.id)
    .set({status:true},{merge:true});
  }
  deleteTickets(data){
    return this.firestore.collection('ticket').doc(data.payload.doc.id).delete();
  }

}
