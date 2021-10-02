import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from './shared/services/login.service';
import { StorageService } from './shared/services/storage.service';
import { VariaveisGlobaisService } from './shared/services/variaveis-globais.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router,
    private storage : StorageService,
    private  globalService : VariaveisGlobaisService,
    private loginService: LoginService
  ) {
    
   }
  title = 'AppAngular';
  mostrarMenu: boolean = false;

  isAuth : boolean = false;
  

  ngOnInit() {
    this.loginService.mostrarMenuEmitter.subscribe(
      mostrar=>this.mostrarMenu = mostrar
    );
  }

}
