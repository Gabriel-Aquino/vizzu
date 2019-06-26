import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsuAgendPage } from './consu-agend';

@NgModule({
  declarations: [
    ConsuAgendPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsuAgendPage),
  ],
})
export class ConsuAgendPageModule {}
