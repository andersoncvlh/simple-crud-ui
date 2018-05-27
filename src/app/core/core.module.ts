import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [InputComponent],
  exports: [
    InputComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CoreModule { }
