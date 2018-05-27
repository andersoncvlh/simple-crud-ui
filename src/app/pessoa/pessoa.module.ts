import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaListagemComponent } from './pessoa-listagem/pessoa-listagem.component';

@NgModule({
  imports: [
    NgbModule,
    CoreModule,

    NgbPaginationModule,

    PessoaRoutingModule
  ],
  declarations: [PessoaCadastroComponent, PessoaListagemComponent]
})
export class PessoaModule { }
