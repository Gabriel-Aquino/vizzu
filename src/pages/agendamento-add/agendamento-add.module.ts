import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendamentoAddPage } from './agendamento-add';

@NgModule({
  declarations: [
    AgendamentoAddPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendamentoAddPage),
  ],
})
export class AgendamentoAddPageModule {}
