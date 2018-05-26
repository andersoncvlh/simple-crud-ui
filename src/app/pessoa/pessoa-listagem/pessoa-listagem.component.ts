import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'oak-pessoa-listagem',
  templateUrl: './pessoa-listagem.component.html'
})
export class PessoaListagemComponent implements OnInit {

  pessoaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.pessoaForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

}
