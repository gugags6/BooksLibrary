import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroLivroComponent } from './livros/cadastro-livro/cadastro-livro.component';
import { LivrosModule } from './livros/livros.module';
import { LivrosComponent } from './livros/livros.component';
import { MenuComponent } from './menu/menu.component';
import { CadastroComponent } from './login/cadastro/cadastro.component';
import { AuthGuard } from './guards/auth.guard';
import { LivroGuard } from './guards/livro.guard';


const routes: Routes = [
  { path: 'livros', loadChildren:'./livros/livros.module#LivrosModule',
            canActivate: [AuthGuard],
           //canActivateChild: [AuthGuard],
            canLoad: [AuthGuard]},

  { path: 'cadastro', component: CadastroComponent },

  {path: 'login',component:LoginComponent},

  {path: 'home', redirectTo: 'livros',pathMatch:'full',
  canActivate: [AuthGuard]},

  {path: '', redirectTo: 'livros', pathMatch:'full'},

  {path: 'notFound', component: PaginaNaoEncontradaComponent},

  {path: '**', component: PaginaNaoEncontradaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
