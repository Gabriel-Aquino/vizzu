import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoAgendamentosPage } from './historico-agendamentos';

@NgModule({
  declarations: [
    HistoricoAgendamentosPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoAgendamentosPage),
  ],
})
export class HistoricoAgendamentosPageModule {}
