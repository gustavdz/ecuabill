import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {

  }

  saveUser() {
      this.restProvider.addUser(this.user).then((result) => {
          console.log(result);
      }, (err: HttpErrorResponse) => {
          console.log('ERROR!: ', err.message);
          console.log('status', err.status);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdduserPage');
  }

}
