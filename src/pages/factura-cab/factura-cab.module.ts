import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacturaCabPage } from './factura-cab';

@NgModule({
  declarations: [
    FacturaCabPage,
  ],
  imports: [
    IonicPageModule.forChild(FacturaCabPage),
  ],
})
export class FacturaCabPageModule {}
