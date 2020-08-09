import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CadastroLivroComponent } from './cadastro-livro/cadastro-livro.component';
import { LivrosComponent } from './livros.component';
import { AutoresComponent } from './autores/autores.component';


const routes: Routes = [
  {path: '', component: LivrosComponent},
  { path: 'newBook', component: CadastroLivroComponent },
  { path: 'myBooks', component: LivrosComponent },
  {path: 'authors', component : AutoresComponent}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivrosRoutingModule { }
