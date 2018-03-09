import { Component } from '@angular/core';
import { NavController,App, ActionSheetController, AlertController } from 'ionic-angular';
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


  constructor(public alertCtrl: AlertController, public app: App,public navCtrl: NavController, public restProvider: RestProvider, public actionSheetCtrl: ActionSheetController) {
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
                      console.log('Cancel clicked');
                  }
              },
              {
                  text: 'Save',
                  handler: data => {
                      //console.log(data.name);
                      this.restProvider.addClient(data).then(response => {
                          console.log(response);
                          this.getClients();
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
