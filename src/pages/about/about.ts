import { Component} from '@angular/core';
import { IonicPage, PopoverController, NavController } from 'ionic-angular';
import { PopoverAboutPage } from "../popover-about/popover-about";

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(private popoverCtrl: PopoverController, public navCtrl: NavController) {

  }

    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(PopoverAboutPage);
        popover.present({ev: myEvent});
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
