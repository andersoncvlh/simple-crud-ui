import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaListagemComponent } from './pessoa-listagem/pessoa-listagem.component';

const pessoaRoutes: Routes = [
  {path: 'pessoa', component: PessoaListagemComponent},
  {path: 'pessoa/novo', component: PessoaCadastroComponent}
];

@NgModule({
  imports: [RouterModule.forChild(pessoaRoutes)],
  exports: [RouterModule]
})
export class PessoaRoutingModule { }
