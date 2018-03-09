import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import {HttpErrorResponse} from '@angular/common/http';

/**
 * Generated class for the AdduserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adduser',
  templateUrl: 'adduser.html',
})
export class AdduserPage {

  user = { name:'', email:'', password:'', password_confirmation:''};
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider,public loadingCtrl: LoadingController, private toastCtrl: ToastController) {

  }

  saveUser() {
      this.showLoader();
      this.restProvider.addUser(this.user).then((result) => {
          console.log(result);
          this.loading.dismiss();
          this.presentToast(result);
          this.navCtrl.pop();
      }, (err: HttpErrorResponse) => {
          console.log('ERROR!: ', err.message);
          console.log('status', err.status);
          this.loading.dismiss();
          this.presentToast(err.message);
      });
  }
  showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Adding User...'
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdduserPage');
  }

}
