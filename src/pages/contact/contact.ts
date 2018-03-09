import { Component } from '@angular/core';
import { NavController,App,LoadingController, ToastController, ActionSheetController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';


@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage {
  clients: any;
  loading: any;
  isLoggedIn: boolean = false;


  constructor(public alertCtrl: AlertController, public app: App,public navCtrl: NavController, public restProvider: RestProvider,public loadingCtrl: LoadingController, private toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController) {
      console.log(localStorage.getItem("api_token"));
      if(!localStorage.getItem("api_token")) {
          navCtrl.setRoot(LoginPage);
      }
      if(localStorage.getItem("api_token")) {
          this.isLoggedIn = true;
          this.getClients();
      }

  }

  showAddClient() {
      let prompt = this.alertCtrl.create({
          title: 'New Client',
          message: "Enter the info for the new client",
          inputs: [
              {
                  name: 'name',
                  placeholder: 'Name'
              },
              {
                  name: 'last_name',
                  placeholder: 'Last Name'
              },
              {
                  name: 'email',
                  placeholder: 'Email',
                  type: 'email'
              },
              {
                  name: 'dni',
                  placeholder: 'CI'
              },
              {
                  name: 'phone',
                  placeholder: 'Phone'
              },
              {
                  name: 'address',
                  placeholder: 'Address'
              },
          ],
          buttons: [
              {
                  text: 'Cancel',
                  handler: data => {
                      this.presentToast('Cancel clicked');
                      console.log('Cancel clicked');
                  }
              },
              {
                  text: 'Save',
                  handler: data => {
                      //console.log(data.name);
                      this.showLoader();
                      this.restProvider.addClient(data).then(response => {
                          console.log(response);
                          this.getClients();
                          this.loading.dismiss();
                      });

                  }
              }
          ]
      });
      prompt.present();
  }

  doClientRefresh(refresher) {
      console.log('Begin async operation', refresher);
      setTimeout(() => {
          this.restProvider.getClients()
              .then(data => {
                  this.clients = data;
                  console.log(this.clients);
                  console.log('Async operation has ended');
                  refresher.complete();
              });
      },500);
  }

  getClients() {
      this.restProvider.getClients()
          .then(data => {
              this.clients = data;
              console.log(this.clients);
          });
  }
  showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Adding Client...'
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

  moreOptions(client) {
      let actionSheet = this.actionSheetCtrl.create({
          title: 'Modify your Client',
          buttons: [
              {
                  text: 'Destructive',
                  role: 'destructive',
                  handler: () => {
                      console.log('Destructive clicked ' + JSON.stringify(client));
                  }
              },
              {
                  text: 'Archive',
                  handler: () => {
                      console.log('Archive clicked' + JSON.stringify(client));
                  }
              },
              {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                      console.log('Cancel clicked' + JSON.stringify(client));
                  }
              }
          ]
      });
      actionSheet.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

}
