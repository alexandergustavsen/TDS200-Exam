import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import IRoom from '../../models/IRoom';

@Component({
  selector: 'app-booked-rooms',
  templateUrl: './booked-rooms.page.html',
  styleUrls: ['./booked-rooms.page.scss'],
})
export class BookedRoomsPage implements OnInit {

  public rooms$: Observable<IRoom[]>;

  constructor(
    public router: Router,
    public firestore: AngularFirestore, 
    public fireauth: AngularFireAuth
  ){}

  ngOnInit() {
    this.getBooked()
  }

  //Henter ut alle rom brukeren har booket med sortering.
  async getBooked() {
    const loggedInUser = await this.fireauth.authState.pipe(first()).toPromise();
    const user = loggedInUser.email
    const document = this.firestore.collection("rooms", ref => ref.where("bookedBy", "==", user).orderBy("date", "desc"))
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

  //Navigasjon til et spesifikt rom.
  navigateToDetailView(tappedRoom: IRoom) {
    let navigationExtras: NavigationExtras = {
      state: {
        room: tappedRoom
      }
    };
    this.router.navigate(['details'], navigationExtras);
  }  
}
