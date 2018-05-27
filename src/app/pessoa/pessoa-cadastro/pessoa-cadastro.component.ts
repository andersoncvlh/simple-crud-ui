import { Pessoa } from './../../models/pessoa';
import { Telefone } from './../../models/telefone';
import { Component, OnInit, NgZone } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { PessoaService } from '../pessoa.service';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs/operators';
import { Subscriber, Observable } from 'rxjs';

@Component({
  selector: 'oak-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html'
})
export class PessoaCadastroComponent implements OnInit {

  pessoaCadForm: FormGroup;
  telefonesForm: FormGroup;

  pessoaSelecionada: Pessoa = new Pessoa();

  minDate: Date = void 0;
  maxDate: Date = void 0;

  isEdit = false;

  pageTitle = 'Cadastro Pessoa';

  // tslint:disable-next-line:max-line-length
  emailPattern = Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  numberPattern = Validators.pattern(/^[0-9]*$/);

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone
  ) {
    this.pessoaCadForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, this.numberPattern, Validators.maxLength(11), Validators.minLength(11)]],
      email: ['', [Validators.required, this.emailPattern]],
      dataNascimento: ['', [Validators.required]],
    });
    this.telefonesForm = this.fb.group({
      ddd: ['', [this.numberPattern, Validators.required, Validators.maxLength(2), Validators.minLength(2)]],
      numero: ['', [this.numberPattern, Validators.required, Validators.maxLength(9), Validators.minLength(8)]]
    });
    this.minDate = new Date(1950, 1, 1);
    const hoje = new Date();
    this.maxDate = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDay());
  }

  ngOnInit() {
    if (this.route.snapshot.params && this.route.snapshot.params.id) {
      const id = this.route.snapshot.params.id;
      this.isEdit = true;
      this.pageTitle = 'Atualizar Pessoa';
      this.pesquisarPorId(id);
    }
  }

  salvar() {
    const pessoa: Pessoa = this.pessoaCadForm.value;
    pessoa.telefones = this.pessoaSelecionada.telefones;
    pessoa.dataNascimento = this.getDateNascimentoFromComponent();
    return this.pessoaService.salvar(pessoa)
      .subscribe(pessoaSalva => {
        this.router.navigate(['/pessoa']);
        return pessoaSalva;
      });
  }

  adicionarTelefone() {
    if (this.pessoaSelecionada) {
      const telefone: Telefone = this.telefonesForm.value;
      this.pessoaSelecionada.telefones.push(telefone);
    }
  }

  removerTelefone(telefone: Telefone) {
    const index = this.pessoaSelecionada.telefones.indexOf(telefone);
    this.pessoaSelecionada.telefones.splice(index, 1);
  }

  private pesquisarPorId(id: string) {
    this.pessoaService.pesquisarPorId(id)
      .subscribe((p) => {
        console.log(p);
        this.pessoaCadForm.get('nome').setValue(p.nome);
        this.pessoaCadForm.get('cpf').setValue(p.cpf);
        this.pessoaCadForm.get('email').setValue(p.email);
        this.pessoaCadForm.get('dataNascimento').setValue(p.dataNascimento);

        if (!this.pessoaSelecionada) {
          this.pessoaSelecionada = new Pessoa();
        }
        this.pessoaSelecionada.telefones = p.telefones;
      });
  }

  private getDateNascimentoFromComponent(): Date {
    const ano: number = this.pessoaCadForm.get('dataNascimento').value.year;
    const mes: number = this.pessoaCadForm.get('dataNascimento').value.month;
    const dia: number = this.pessoaCadForm.get('dataNascimento').value.day;
    return new Date(ano, mes, dia);
  }


}
