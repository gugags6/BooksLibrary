import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/env.service';
import { Livro } from '../models/livro';
import { Page } from '../models/page';
import { Observable } from 'rxjs';

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

    deleteLivroById(id){
      return this.http.delete(this.envService.urlAPI + `/livros/${id}` );
    }

    updateBookById(livro,id){
      return this.http.patch(this.envService.urlAPI + `/livros/${id}`, livro );
    }

    getLivroById(id){
      return this.http.get<Livro>(this.envService.urlAPI + `/livros/${id}`);
    }

    getLivrosByUserPaginacao(id, pagina,qtdLinhas){
      return this.http.get<Page>(this.envService.urlAPI + `/livros/user/page?idUser=${id}&pagina=${pagina}&qtdLinhas=${qtdLinhas}`);
    }
    
}

