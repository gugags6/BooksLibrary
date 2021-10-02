import { VariaveisGlobaisService } from './shared/services/variaveis-globais.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LivrosModule } from './livros/livros.module';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './login/cadastro/cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MshErrorComponent } from './shared/msg/msh-error/msh-error.component';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptorService } from './shared/interceptors/auth-interceptor.service';
import { HttpConfigInterceptor } from './shared/interceptors/http-config-interceptor.service';
import { CustomErrorHandlerService } from './shared/error/custom-error-handler.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuard } from './guards/auth.guard';
import { LoginService } from './shared/services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    LoginComponent,
    MenuComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LivrosModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  providers: [  
   
    {
       provide: HTTP_INTERCEPTORS,
       useClass: AuthInterceptorService,
       multi: true,
     }
     ,
     {
       provide: HTTP_INTERCEPTORS, 
       useClass: HttpConfigInterceptor, 
       multi: true
     }
     ,
     {
       provide: ErrorHandler, 
       useClass: CustomErrorHandlerService
     }        
     ],
  bootstrap: [AppComponent]
})
export class AppModule { }
