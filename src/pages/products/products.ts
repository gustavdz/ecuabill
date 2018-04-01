import { Component } from '@angular/core';
import {
    IonicPage, NavController, NavParams, LoadingController, AlertController,
    ActionSheetController
} from 'ionic-angular';
import { RestProvider } from "../../providers/rest/rest";
import {LoginPage} from "../login/login";

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  products: any;
  loading: any;
  isLoggedIn: boolean = false;


  constructor(public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider,public loadingCtrl: LoadingController) {
      console.log(localStorage.getItem("api_token"));
      if(!localStorage.getItem("api_token")) {
          navCtrl.setRoot(LoginPage);
      }
      if(localStorage.getItem("api_token")) {
          this.isLoggedIn = true;
          this.getProducts();
      }
  }

  getProducts() {
      this.restProvider.getProducts()
          .then(data => {
              this.products = data;
              console.log(this.products);
          });
  }
    showAddProduct() {
        let prompt = this.alertCtrl.create({
            title: 'New Product',
            message: "Enter the info for the new product",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name'
                },
                {
                    name: 'detail',
                    placeholder: 'Details of the product'
                },
                {
                    name: 'price',
                    placeholder: 'Price',
                    type: 'email'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        //console.log(data.name);
                        this.restProvider.addProduct(data).then(response => {
                            console.log(response);
                            this.getProducts();
                        });

                    }
                }
            ]
        });
        prompt.present();
    }

  doProductRefresh(refresher) {
      console.log('Begin async operation', refresher);
      setTimeout(() => {
          this.restProvider.getProducts()
              .then(data => {
                  this.products = data;
                  console.log(this.products);
                  console.log('Async operation has ended');
                  refresher.complete();
              });
      },500);
  }
  showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'Authenticating...'
      });

      this.loading.present();
  }
    moreOptions(product) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Modify your Product',
            buttons: [
                {
                    text: 'Eliminar',
                    role: 'destructive',
                    handler: () => {
                        console.log('Destructive clicked ' + JSON.stringify(product));
                    }
                },
                {
                    text: 'Editar',
                    handler: () => {
                        console.log('Archive clicked' + JSON.stringify(product));
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked' + JSON.stringify(product));
                    }
                }
            ]
        });
        actionSheet.present();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

}
