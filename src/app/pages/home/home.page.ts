import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import IRoom from '../../models/IRoom';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public rooms$: Observable<IRoom[]>;

  constructor(
    public firestore: AngularFirestore, 
    public router: Router, 
    public fireauth: AngularFireAuth
  ){}

  ngOnInit() {
    //Henter ut data på et spesifikt punkt med sortering.
    const document = this.firestore.collection("rooms", ref => ref.where("isAvailable", "==", true).orderBy("date", "desc"))
    this.rooms$ = document.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as IRoom;
          const newId = a.payload.doc.id;
          return { id: newId, ...data };
        });
      })
    );
  }

  async logoutUser() {
    try {
      await this.fireauth.auth.signOut();
      this.router.navigate(['/login']);
    } catch (e) {
      console.log(e);
    }
  }

  //Navigasjonen til et spesifikt rom.
  navigateToDetailView(tappedRoom: IRoom) {
    let navigationExtras: NavigationExtras = {
      state: {
        room: tappedRoom
      }
    };
    this.router.navigate(['details'], navigationExtras);
  }  

}