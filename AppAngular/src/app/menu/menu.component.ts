import { LoginService } from 'src/app/shared/services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  mostrarMenu: boolean = false;

  fazerLogout(){
    this.loginService.logout();
  }

  ngOnInit() {
    this.loginService.mostrarMenuEmitter.subscribe(
      mostrar=>this.mostrarMenu = mostrar
    );
  }

}
