import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariaveisGlobaisService {

  constructor() { }

  isAuth : boolean = true;
  public usuarioLogado : Usuario;
}
