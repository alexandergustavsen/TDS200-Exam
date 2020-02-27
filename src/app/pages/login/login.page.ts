import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user = { username: "", password: "" };

  constructor(
    public fireauth: AngularFireAuth,
    public router: Router,
    public toastController: ToastController
  ) { }

  async loginUser() {
    try {
      const result = await this.fireauth.auth.signInWithEmailAndPassword(this.user.username, this.user.password);
      this.router.navigate(['tabs/home']);
      window.location.reload(true);
    } catch (e) {
      const toast = await this.toastController.create({
        message: e.message,
        duration: 2000
      });
      toast.present();
      console.warn(e);
    }

  }

  async registerUser() {
    try {
      const result = await this.fireauth.auth.createUserWithEmailAndPassword(this.user.username, this.user.password);
      this.router.navigate(['tabs/home']);
      window.location.reload(true);
    } catch (e) {
      const toast = await this.toastController.create({
        message: e.message,
        duration: 2000
      });
      toast.present();
      console.warn(e);
    }
  }

  ngOnInit() {
  }

}
