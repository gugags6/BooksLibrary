import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class LivroGuard implements CanActivateChild{

    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): Observable<boolean> | Promise< boolean> | boolean {

            //if(state.url.includes('edit')){
               // return false;
                //return Observable.of(serviçoAssyncrono)//util para validar direto do servidor
           // }
            return true;
         
          
          }


    
}