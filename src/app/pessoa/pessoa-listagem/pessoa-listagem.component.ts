import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Pessoa } from './../pessoa';
import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { map } from 'rxjs/operators';
import { Page } from '../../models/page';

@Component({
  selector: 'oak-pessoa-listagem',
  templateUrl: './pessoa-listagem.component.html'
})
export class PessoaListagemComponent implements OnInit {

  pessoaForm: FormGroup;
  pessoas: Pessoa[];
  page: Page<Pessoa> = new Page();

  @Input() currentPage;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService
  ) {
    this.pessoaForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  pesquisar() {
    const pessoaFiltro: PessoaFiltro = this.pessoaForm.value;
    if (this.currentPage) {
      pessoaFiltro.pagina = this.currentPage - 1;
      pessoaFiltro.itensPorPagina = 20;
    }
    this.pessoaService.pesquisar(pessoaFiltro)
      .subscribe((data) => {
        this.page = data;
      });
  }

}
