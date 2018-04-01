import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user = {
      name: '',
      profileImage: './assets/imgs/avatar.png',
      coverImage: './assets/imgs/background-login.jpg',
      occupation: 'Designer',
      location: 'Seattle, WA',
      description: 'Passionate Designer. Recently focusing on developing mobile hybrid apps and web development.',
      address: '27 King\'s College Cir, Toronto, ON M5S, Canada',
      phone: '555 555 555',
      email: '',
      whatsapp: '555 555 555',
  };

  constructor(public navCtrl: NavController,
              public restProvider: RestProvider) {
      this.getAuthUser();
  }

  getAuthUser() {
    this.restProvider.getAuthUser()
        .then(data => {
            this.user = data['data'];
            this.user.whatsapp='555 555 555';
            this.user.profileImage='555 555 555';
            this.user.coverImage='555 555 555';
            this.user.occupation='555 555 555';
            this.user.location='555 555 555';
            this.user.description='555 555 555';
            this.user.address='555 555 555';
            this.user.phone='555 555 555';
            console.log(this.user);
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
