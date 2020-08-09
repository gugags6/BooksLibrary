import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/env.service';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor(private http: HttpClient, 
    private envService: EnvService) { }

    cadastroLivro(livro){
  
      return this.http.post<Livro>(this.envService.urlAPI + `/livros`, livro);
    }

    getLivros(){
      return this.http.get<Livro>(this.envService.urlAPI + `/livros`);
    }

    getLivrosByUser(id){
      return this.http.get<Livro>(this.envService.urlAPI + `/livros/user/${id}`);
    }
    
}

