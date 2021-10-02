import { PaginaNaoEncontradaComponent } from './../pagina-nao-encontrada/pagina-nao-encontrada.component';
import { LivroDetalheComponent } from './livro-detalhe/livro-detalhe.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CadastroLivroComponent } from './cadastro-livro/cadastro-livro.component';
import { LivrosComponent } from './livros.component';
import { AutoresComponent } from './autores/autores.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
  
  {path: 'authors', component : AutoresComponent},
  { path: 'newBook', component: CadastroLivroComponent },
  {path: 'newBook/:id', component: CadastroLivroComponent},
  {path: 'page/:id', component: LivrosComponent},
  {path: ':id', component: LivroDetalheComponent},
  {path: '', component: LivrosComponent}
  
 

  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivrosRoutingModule { }
