import { Component, OnInit, Input, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { map } from 'rxjs/operators';
import { Page } from '../../models/page';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Pessoa } from '../../models/pessoa';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute,
    private zone: NgZone
  ) {
    this.pessoaForm = this.fb.group({
      nome: [''],
      cpf: ['', [this.numberPattern, Validators.minLength(11), Validators.maxLength(11)]]
    });
    this.currentPage = 1;
  }

  ngOnInit() {
    if (this.route.snapshot.params && this.route.snapshot.params.searchAll) {
      this.pesquisar();
    } else if (this.route.snapshot.params
      && this.route.snapshot.params.nome
      && this.route.snapshot.params.cpf
    ) {
      this.pessoaForm.get('nome').setValue(this.route.snapshot.params.nome);
      this.pessoaForm.get('cpf').setValue(this.route.snapshot.params.cpf);
      this.pesquisar();
    }
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
