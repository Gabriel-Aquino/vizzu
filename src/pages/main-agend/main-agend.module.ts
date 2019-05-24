import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainAgendPage } from './main-agend';

@NgModule({
  declarations: [
    MainAgendPage,
  ],
  imports: [
    IonicPageModule.forChild(MainAgendPage),
  ],
})
export class MainAgendPageModule {}
