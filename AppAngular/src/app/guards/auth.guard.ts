import { LoginService } from 'src/app/shared/services/login.service';
import { VariaveisGlobaisService } from './../shared/services/variaveis-globais.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad{

  constructor(private authService:LoginService, private router: Router) { }
  
  
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.verificarAcesso(); 
  }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        return this.verificarAcesso();
  
      }

    
  private verificarAcesso(){
    if(this.authService.usuarioautenticado()){
      console.log('Acesso concedido');
      return true;
    }
    this.router.navigate(['/login']);
    console.log('Acesso negado');
    return false;
  }
   
}