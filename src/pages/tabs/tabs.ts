import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ContactPage} from "../contact/contact";
import {HomePage} from "../home/home";
import {ProductsPage} from "../products/products";
import {FacturaCabPage} from "../factura-cab/factura-cab";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  productsPage: any = ProductsPage;
  facturaCabPage: any = FacturaCabPage;
  contactPage:any = ContactPage;
  homePage:any = HomePage;
  myIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      // Set the active tab based on the passed index from menu.ts
      this.myIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
