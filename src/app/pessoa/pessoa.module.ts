import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaListagemComponent } from './pessoa-listagem/pessoa-listagem.component';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    PessoaRoutingModule
  ],
  declarations: [PessoaCadastroComponent, PessoaListagemComponent]
})
export class PessoaModule { }
