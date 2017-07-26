import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import {UserData} from "../../models/user.model";



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  homepage:any;
  usu_aux: UserData;
  loading: Loading;
  //registerCredentials = { email: '', password: '' };
  registerCredentials = { email: 'wcadena@outlook.com', password: 'wcadena' };

  constructor(private nav: NavController, private auth: AuthService,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    //declara la pagina a dondedebe ir
    this.homepage =HomePage;

     }

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  public grabarClave(user:UserData ){

    this.usu_aux=user;
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {//si esta bien ingresa
        this.usu_aux =new UserData(this.registerCredentials.email,this.registerCredentials.password);
        console.log(this.usu_aux);
        this.auth.guardar_storage();
        this.nav.setRoot(this.homepage);
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
