/*import {AboutPage} from "../about/about";
import {HomePage} from "../home/home";
import {CreditsPage} from "../credits/credits";
import {ContactPage} from "../contact/contact";
import { TabsPage } from './../tabs/tabs';*/
import { LoginPage } from "../login/login";
import { RestProvider } from "../../providers/rest/rest";
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav,LoadingController, ToastController,App } from 'ionic-angular';


/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface PageInterface {
    title: string;
    pageName: string;
    tabComponent?: any;
    index?: number;
    icon: string;
    description?: string;
    color?: any;

}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {
    // Basic root for our content view
    rootPage = 'TabsPage';
    loading: any;
    user = { name:'', email:''};
    // Reference to the app's root nav
    @ViewChild(Nav) nav: Nav;

    pages: PageInterface[] = [
        { title: 'Home', pageName: 'TabsPage', tabComponent: 'HomePage', index: 0, icon: 'home-outline', color:'light' },
        { title: 'Clientes', pageName: 'TabsPage', tabComponent: 'ContactPage', index: 1, icon: 'people-outline', description: 'Solicita información', color:'light'},
        { title: 'Productos', pageName: 'TabsPage', tabComponent: 'ProductsPage', index: 2, icon: 'pricetags-outline', description: 'Lista de productos o servicios', color:'light' },
        { title: 'Facturas', pageName: 'TabsPage', tabComponent: 'FacturaCabPage', index: 3, icon: 'calculator-outline', description: 'Lista de Facturas', color:'light' },
        { title: 'About', pageName: 'AboutPage', tabComponent: 'AboutPage', icon: 'information-circle-outline', description: 'Acerca de Ecuabill', color:'light'},

    ];

    constructor(public app: App,public navCtrl: NavController,public restProvider: RestProvider,public loadingCtrl: LoadingController, private toastCtrl: ToastController) {

        this.getAuthUser();
    }

    logout(){
        this.showLoader();
        this.restProvider.logout().then((result) => {
            this.loading.dismiss();
            let nav = this.app.getRootNav();
            nav.setRoot(LoginPage);
        }, (err) => {
            this.loading.dismiss();
            this.presentToast(err);
        });
    }
    getAuthUser() {
        this.restProvider.getAuthUser()
            .then(data => {
                this.user = data['data'];
                console.log(this.user);
            });
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

    openPage(page: PageInterface) {
        let params = {};

        // The index is equal to the order of our tabs inside tabs.ts
        if (page.index) {
            params = { tabIndex: page.index };
        }

        // The active child nav is our Tabs Navigation
        if (this.nav.getActiveChildNav() && page.index != undefined) {
            this.nav.getActiveChildNav().select(page.index);
        } else {
            // Tabs are not active, so reset the root page
            // In this case: moving to or from SpecialPage
            this.nav.setRoot(page.pageName, params);
        }
    }

    goToPage(pag){
        let params = {};
        // The active child nav is our Tabs Navigation

            // Tabs are not active, so reset the root page
            // In this case: moving to or from SpecialPage
            this.nav.setRoot(pag, params);

    }

    isActive(page: PageInterface) {
        // Again the Tabs Navigation
        let childNav = this.nav.getActiveChildNav();

        if (childNav) {
            if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
                return 'primary';
            }
            return;
        }

        // Fallback needed when there is no active childnav (tabs not active)
        if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
            return 'primary';
        }
        return;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MenuPage');
    }

}
