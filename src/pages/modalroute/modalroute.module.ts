import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalroutePage } from './modalroute';

@NgModule({
  declarations: [
    ModalroutePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalroutePage),
  ],
})
export class ModalroutePageModule {}
