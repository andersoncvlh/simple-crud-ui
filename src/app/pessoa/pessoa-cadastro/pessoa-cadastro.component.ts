import { Pessoa } from './../../models/pessoa';
import { Telefone } from './../../models/telefone';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { PessoaService } from '../pessoa.service';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';

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

  // tslint:disable-next-line:max-line-length
  emailPattern = Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  numberPattern = Validators.pattern(/^[0-9]*$/);

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private router: Router
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

  private getDateNascimentoFromComponent(): Date {
    const ano: number = this.pessoaCadForm.get('dataNascimento').value.year;
    const mes: number = this.pessoaCadForm.get('dataNascimento').value.month;
    const dia: number = this.pessoaCadForm.get('dataNascimento').value.day;
    return new Date(ano, mes, dia);
  }



}
