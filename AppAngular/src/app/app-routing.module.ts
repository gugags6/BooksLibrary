import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroLivroComponent } from './livros/cadastro-livro/cadastro-livro.component';
import { LivrosModule } from './livros/livros.module';
import { LivrosComponent } from './livros/livros.component';
import { MenuComponent } from './menu/menu.component';
import { CadastroComponent } from './login/cadastro/cadastro.component';


const routes: Routes = [
  { path: 'livros', loadChildren:'./livros/livros.module#LivrosModule' },
  { path: 'cadastro', component: CadastroComponent },
  {path: 'login',component:LoginComponent},
  {path: '',component:LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
