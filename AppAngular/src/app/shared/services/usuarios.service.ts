import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/env.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, 
    private envService: EnvService) { }

  cadastroUser(usuario){
  
    return this.http.post<Usuario>(this.envService.urlAPI + `/usuarios/cadastro`, usuario);
  }

  getUserByEmail(email:string){
    return this.http.get<Usuario>(this.envService.urlAPI + `/usuarios/email/${email}`);
  }
}
