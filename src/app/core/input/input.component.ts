import { Component, OnInit, AfterContentInit, ContentChild, Input, Output, EventEmitter } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
  selector: 'oak-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  input: any;

  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) control: FormControlName;

  @Input() label: string;
  @Input() errorMessage: string;

  constructor() { }

  ngOnInit() {
  }

  /**
   *  Usar NgModel, mas se nao estiver disponivel, utilizar FormControlName
   */
  ngAfterContentInit(): void {
    this.input = this.model || this.control;
    if (this.input === undefined) {
      throw new Error('Este componente precisa ser utilizado com uma diretiva NgModel ou FormControlName');
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  hasError(): boolean {
    return !this.input.valid && (this.input.dirty || this.input.touched);
  }
}
