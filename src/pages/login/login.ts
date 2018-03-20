import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import {MenuPage} from "../menu/menu";
import {HttpErrorResponse} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    backgrounds = [
        './assets/imgs/background-login.jpg',
    ];
    public loginForm: any;
    loading: any;
    user = { email:'', password:''};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public restProvider: RestProvider,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public formBuilder: FormBuilder) {

      this.loginForm = formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.compose([Validators.minLength(6),
              Validators.required])]
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
      this.showLoader();
      this.restProvider.login(this.user).then((result) => {
          console.log(result);
          console.log(result['user_data']['api_token']);
          localStorage.setItem('api_token', 'Bearer '+result['user_data']['api_token']);
          this.loading.dismiss();
          this.navCtrl.setRoot(MenuPage);
      }, (err: HttpErrorResponse) => {
          console.log(err.message);
          this.presentToast(err.message);
          this.loading.dismiss();

      });
  }

  goTo(uri){
      this.navCtrl.push(uri);
  }

  showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'Authenticating...'
      });

      this.loading.present();
  }

  presentToast(msg) {
      let toast = this.toastCtrl.create({
          message: msg,
          duration: 3000,
          position: 'bottom',
          dismissOnPageChange: true
      });

      toast.onDidDismiss(() => {
          console.log('Dismissed toast');
      });

      toast.present();
  }



}
