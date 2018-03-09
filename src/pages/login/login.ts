import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import {MenuPage} from "../menu/menu";

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
    loading: any;
    user = { email:'', password:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider,public loadingCtrl: LoadingController, private toastCtrl: ToastController) {

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
      }, (err) => {
          console.log(err);
          this.loading.dismiss();
          this.presentToast(err.error.error_message);
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
