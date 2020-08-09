import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MshErrorComponent } from './msg/msh-error/msh-error.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';




@NgModule({
  declarations: [MshErrorComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MshErrorComponent
  ]
})
export class SharedModule { }


