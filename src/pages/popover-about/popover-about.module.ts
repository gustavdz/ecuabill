import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverAboutPage } from './popover-about';

@NgModule({
  declarations: [
    PopoverAboutPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverAboutPage),
  ],
})
export class PopoverAboutPageModule {}
