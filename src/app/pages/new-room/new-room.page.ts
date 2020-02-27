import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { v4 as uuid } from "uuid";
import { first } from "rxjs/operators";
import IRoom from '../../models/IRoom'

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.page.html',
  styleUrls: ['./new-room.page.scss'],
})
export class NewRoomPage implements OnInit {

  public title: string
  public description: string
  public name: string
  public floor: number
  public capacity: number
  public location: string
  public cameraPreview: string = ""

  public cameraOptions: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  public galleryOptions: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(
    public firestore: AngularFirestore,
    public firestorage: AngularFireStorage,
    public firebaseauth: AngularFireAuth,
    public camera: Camera,
    public geolocation: Geolocation,
    public toastController: ToastController,
    public router: Router
  ) {}

  ngOnInit() {
  }

  //Funksjon som gjør du endten kan ta bilde eller hente bilde.
  async takePicture(option: number) {
    if(option === 0) {
      this.camera.getPicture(this.cameraOptions).then((imageData) => {
        this.cameraPreview = imageData;
      }, (err) => { console.log(err) })
    } else if(option === 1) {
      this.camera.getPicture(this.galleryOptions).then((imageData) => {
        this.cameraPreview = imageData;
      }, (err) => { console.log(err) })
    }
  }

  //Sender bilde i base64-format til firestore.
  async uploadImageToFirestorage() {
    const fileName = `tds-${uuid()}.png`;
    const firestorageFileRef = this.firestorage.ref(fileName);
    const uploadTask = firestorageFileRef.putString(
      this.cameraPreview,
      'base64',
      { contentType: 'image/png' }
    );
    await uploadTask.then();
    this.cameraPreview = ""
    return firestorageFileRef.getDownloadURL().toPromise();
  }

  //Legger til rom i databasen.
  async postToFirebase() {
    const roomsCollectionRef = this.firestore.collection<IRoom>("rooms");
    const loggedInUser = await this.firebaseauth.authState.pipe(first()).toPromise();
    const uploadedImageUrl = await this.uploadImageToFirestorage();

    //Sjekker om alle felter er fylt ut før det blir sendt.
    if(this.title != null 
      && this.description != null 
      && this.name != null 
      && this.floor != null 
      && this.capacity != null
      && uploadedImageUrl != null 
      && this.location != null){
      await roomsCollectionRef.add({
        title: this.title,
        description: this.description,
        name: this.name,
        floor: this.floor,
        capacity: this.capacity,
        owner: loggedInUser.email,
        date: Date.now(),
        isAvailable: true,
        bookedBy: "",
        imageUrl: uploadedImageUrl,
        location: this.location,
        average: 0,
      });
      this.title = ""
      this.description = ""
      this.name = ""
      this.floor = null
      this.capacity = null
      this.location = ""
      this.cameraPreview = ""
      this.router.navigate(['tabs/home'])
    } else {
      this.presentNewPostToast()
      this.router.navigate(['tabs/new-room'])
    }
  }

  //Henter nåværende GPS-posisjon
  async fetchGPSPosition() {
    try {
      const currentPosition = await this.geolocation.getCurrentPosition();
      const geocodeResponseBinary = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${currentPosition.coords.latitude}&lon=${currentPosition.coords.longitude}&zoom=18&addressdetails=1`);
      const geocodeResponse = await geocodeResponseBinary.json();
      
      const pos = geocodeResponse.address.city + ", " + geocodeResponse.address.postcode
      this.location = pos;  
      
    } catch (e) {      
      console.log('Error fetching location.', e);   
    }  
  }

  async presentNewPostToast() {
    const toast = await this.toastController.create({
      message: 'All fields must be filled out to add a room.',
      duration: 2000
    });
    toast.present();
  }
}
