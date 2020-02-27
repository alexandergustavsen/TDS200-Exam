import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { first } from "rxjs/operators";
import { Observable } from 'rxjs';
import IRating from '../../models/IRating';
import IRoom from '../../models/IRoom';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  public user: string = "";
  public room: IRoom;
  public rating: IRating;
  public ratings$: Observable<IRating[]>;
  public ratingValue: number;
  public comment: string;
  public index: number = 0;
  public sum: number = 0;
  public average: number = 0;

  constructor(
    public route: ActivatedRoute, 
    public router: Router,
    public firestore: AngularFirestore,
    public fireauth: AngularFireAuth,
    public location: Location,
    public toastController: ToastController
    ) 
  {    
    //Sender med data til room.
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.room = this.router.getCurrentNavigation().extras.state.room as IRoom;
      }
    });
  }

  async ngOnInit() {
    //Henter ut data på et spesifikt punkt med sortering.
    this.ratings$ = this.firestore.collection("ratings", ref => ref.where("roomId", "==", this.room.id).orderBy("date", "desc")).valueChanges() as Observable<IRating[]>
    this.checkUser()
  }

  //Henter den innloggede sin email.
  async checkUser() {
    const loggedInUser = await this.fireauth.authState.pipe(first()).toPromise();
    this.user = loggedInUser.email;
  }

  //Oppdaterer tilgjengeligheten til et rom ut i fra om den allerede er booket eller ikke.
  async updateAvailability(id: string) {
    const roomsCollectionRef = this.firestore.collection<IRoom>("rooms");

    if(this.room.isAvailable === true){
      this.room.isAvailable = false
      roomsCollectionRef.doc(id).update({
        isAvailable: false,
        bookedBy: this.user
      })
      console.log("Room successfully booked!");
    } else if(this.room.isAvailable === false){
      this.room.isAvailable = true
      roomsCollectionRef.doc(id).update({
        isAvailable: true,
        bookedBy: ""
      })
      console.log("Room successfully unbooked!");
    }
    this.location.back()
  }

  async postToFirebaseRating(id: string) {
    const ratingsCollectionRef = this.firestore.collection<IRating>("ratings");

    //En ny rating blir lagt til et spesfikt rom hvis alle feltene er fylt ut.
    if(this.comment != null && this.ratingValue != null) {
      await ratingsCollectionRef.add({
        roomId: id,
        starRating: this.ratingValue,
        comment: this.comment,
        user: this.user,
        date: Date.now()
      });
      this.ratingValue = 0;
      this.comment = "";
    } else {
      this.presentRatingToast()
    }

    //Her oppdateres gjennomsnittlig rating rett ettter at en ny rating er lagt til.
    const document = this.firestore.collection("ratings", ref => ref.where('roomId', "==", this.room.id))
    this.ratings$ = document.valueChanges() as Observable<IRating[]>
    
    this.ratings$.subscribe(result => {
      for(var i = 0; i < result.length; i++) {
        this.index++
        this.sum += result[i].starRating
      }
      this.average = this.sum/this.index

      const roomsCollectionRef = this.firestore.collection<IRoom>("rooms");
      roomsCollectionRef.doc(id).update({
        average: this.average
      })
      this.index = 0
      this.sum = 0;
      this.average = 0;
    });
  }

  //Sletter rom fra databasen.
  async deleteFromFirebase(id: string) {
    const roomsCollectionRef = this.firestore.collection<IRoom>("rooms");

    await roomsCollectionRef.doc(id).delete().then(function() {
      console.log("Room successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing room: ", error);
    });
    this.location.back()
  }

  async presentRatingToast() {
    const toast = await this.toastController.create({
      message: 'All fields must be filled out to give a rating.',
      duration: 2000
    });
    toast.present();
  }
}
