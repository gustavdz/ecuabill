import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacturaDetPage } from './factura-det';

@NgModule({
  declarations: [
    FacturaDetPage,
  ],
  imports: [
    IonicPageModule.forChild(FacturaDetPage),
  ],
})
export class FacturaDetPageModule {}
