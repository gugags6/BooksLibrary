import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
    private  globalService : VariaveisGlobaisService
  ) {
    
   }
  title = 'AppAngular';

  isAuth : boolean = false;
  

  ngOnInit() {
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAuth = (event.url !== '')
        
      }
    });  
}

}
