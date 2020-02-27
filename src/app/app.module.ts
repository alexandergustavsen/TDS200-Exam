import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from "@ionic-native/camera/ngx";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicRatingModule } from 'ionic4-rating';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';

const firebaseConfig = {
  apiKey: //INSERT APIKEY HERE,
  authDomain: //INSERT AUTH DOMAIN HERE,
  databaseURL: //INSERT DATABASE URL HERE,
  projectId: //INSERT PROJECT ID HERE,
  storageBucket: //INSERT STORAGE BUCKET HERE,
  messagingSenderId: //INSERT MESSAGING SENDER ID HERE,
  appId: //INSERT APP ID HERE
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireAuthGuardModule,
    IonicRatingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
