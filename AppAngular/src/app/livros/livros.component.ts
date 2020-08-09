import { Usuario } from 'src/app/shared/models/usuario';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { StorageService } from './../shared/services/storage.service';
import { environment } from './../../environments/environment.prod';
import { EnvService } from './../env.service';
import { VariaveisGlobaisService } from './../shared/services/variaveis-globais.service';
import { LivroService } from './../shared/services/livro.service';
import { Component, OnInit } from '@angular/core';
import { Livro } from '../shared/models/livro';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  listaLivros : any = [];
  email:string;
  id:number;
  usuario: Usuario = new Usuario();

  constructor(
    private livroService : LivroService,
    private vg: VariaveisGlobaisService,
    private envService : StorageService,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {

    this.email = this.envService.getLocalUser().email;

    this.usuarioService.getUserByEmail(this.email)
        .subscribe(
          (dados) => {
            
           this.usuario = dados
           this.id = this.usuario.id;
           console.log(this.usuario.id)
           this.listarLivros(this.usuario)
          
           
          }
        );
  }

  listarLivros(user : Usuario){
    console.log(user)
    //id = this.usuario.id;
    //console.log(this.usuario);
    this.livroService.getLivrosByUser(this.usuario.id).subscribe(
    (dados) => {
        
        //let aut: Autor = new Autor()
       // aut.nacionalidade = dados.nacionalidade;
       // aut.nome = dados.nome;
     this.listaLivros = dados;
       //console.log(this.listaLivros)
      }
    );  
  }

}

   
  


