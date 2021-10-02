import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivrosRoutingModule } from './livros-routing.module';
import { LivrosComponent } from './livros.component';
import { AutoresComponent } from './autores/autores.component';
import { CadastroLivroComponent } from './cadastro-livro/cadastro-livro.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Livro } from '../shared/models/livro';
import { LivroDetalheComponent } from './livro-detalhe/livro-detalhe.component';


@NgModule({
  declarations: [LivrosComponent,AutoresComponent, CadastroLivroComponent, LivroDetalheComponent],
  imports: [
    CommonModule,
    LivrosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CadastroLivroComponent]
})
export class LivrosModule implements OnInit{
  
  listaLivros : Livro[] = [];

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  
 }


