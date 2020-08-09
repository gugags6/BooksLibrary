import { Autor } from './../models/autor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/env.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient, 
    private envService: EnvService) { }

  cadastroAuthor(autor){
  
    return this.http.post<Autor>(this.envService.urlAPI + `/autores`, autor);
  }

  getAuthors(){
    return this.http.get<Autor>(this.envService.urlAPI + `/autores`);
  }
}
