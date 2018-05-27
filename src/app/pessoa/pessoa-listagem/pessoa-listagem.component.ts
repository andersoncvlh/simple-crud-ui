import { Component, OnInit, Input, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Pessoa } from './../pessoa';
import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { map } from 'rxjs/operators';
import { Page } from '../../models/page';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'oak-pessoa-listagem',
  templateUrl: './pessoa-listagem.component.html'
})
export class PessoaListagemComponent implements OnInit {

  pessoaForm: FormGroup;

  closeResult: string;
  pessoas: Pessoa[];
  page: Page<Pessoa> = new Page();
  pessoaSelecionada: Pessoa;

  @Input() currentPage;

  cpfPattern = Validators.pattern('^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$');
  numberPattern = Validators.pattern(/^[0-9]*$/);

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private modalService: NgbModal,
    private zone: NgZone
  ) {
    this.pessoaForm = this.fb.group({
      nome: [''],
      cpf: ['', [this.numberPattern, Validators.maxLength(11)]]
    });
    this.currentPage = 1;
  }

  ngOnInit() {
  }

  pesquisar(numeroPagina?: number) {
    const pessoaFiltro: PessoaFiltro = this.pessoaForm.value;
    if (numeroPagina) {
      pessoaFiltro.pagina = numeroPagina - 1;
      this.currentPage = numeroPagina;
    } else {
      pessoaFiltro.pagina = this.currentPage - 1;
    }
    pessoaFiltro.itensPorPagina = 20;
    this.pessoaService.pesquisar(pessoaFiltro)
      .subscribe((data) => {
        this.page = data;
      });
  }

  remover(pessoa: Pessoa): void {
    this.zone.run(() => {
      this.pessoaService.remover(pessoa.id)
        .subscribe(() => this.pesquisar());
    });
  }

  open(content, pessoa: Pessoa) {
    this.pessoaSelecionada = pessoa;
    this.modalService.open(content);
  }

}
