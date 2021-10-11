import { Usuario } from 'src/app/shared/models/usuario';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { StorageService } from './../shared/services/storage.service';
import { environment } from './../../environments/environment.prod';
import { EnvService } from './../env.service';
import { VariaveisGlobaisService } from './../shared/services/variaveis-globais.service';
import { LivroService } from './../shared/services/livro.service';
import { Component, OnInit } from '@angular/core';
import { Livro } from '../shared/models/livro';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../shared/models/page';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  listaLivros : Livro[] ;
  email:string;
  id:number;
  usuario: Usuario = new Usuario();
  numPage: number;
  numPages: Number[]=[];
   page : Page;
   numeroPagina :number;
   p: number = 1;
  collection: number[] ;
  currentPage: number;

  constructor(
    private livroService : LivroService,
    private vg: VariaveisGlobaisService,
    private envService : StorageService,
    private usuarioService: UsuariosService,
    private activatedRoute : ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(
      (queryParams: any)=>{
        this.currentPage = queryParams['page'];
      }
    );

    this.email = this.envService.getLocalUser().email;


    this.usuarioService.getUserByEmail(this.email)
        .subscribe(
          (dados) => {

           this.usuario = dados
           this.id = this.usuario.id;
           console.log(this.usuario.id);
           this.listarLivros(this.usuario,this.currentPage-1,5);

          }
        );


  }


  listarLivros(user : Usuario, pagina, qtdPaginas){
    console.log(user)
    //id = this.usuario.id;
    //console.log(this.usuario);
    this.livroService.getLivrosByUserPaginacao(this.usuario.id,pagina,qtdPaginas ).subscribe(
      (dados) => {

        //let aut: Autor = new Autor()
       // aut.nacionalidade = dados.nacionalidade;
       // aut.nome = dados.nome;
       this.page = dados;
       this.numeroPagina = this.page.totalPages;
       this.collection = [this.numeroPagina]
       console.log("Numero de pagina " + this.numeroPagina)
       for(let i=0; i<this.numeroPagina;i++){
        console.log("pagina " + i)
         this.collection[i]=i+1;
       }
       this.listaLivros = dados.content;
       console.log(this.listaLivros)
       console.log(this.page)
      }
    );
  }

  deleteBook(idLivro){
    console.log("Id: " + idLivro);
    this.livroService.deleteLivroById(idLivro).subscribe(
     (dados)=> {
       console.log("Produto deletado");
       alert("Livro deletado");
       this.listarLivros(this.usuario, 0,5);

     } ,
     erro => {
      console.log(erro)
    });
  }

  changePage(event){
    console.log("Evento" +event)
    this.currentPage = event;
    this.router.navigate(['/livros'], {queryParams: {'page': this.currentPage}});
    this.listarLivros(this.usuario,event-1,5);

  }
  previousPage(){
    //TODO implementar as querys param, para pegar sempre a página atual e passar no parametro d page da API
    //fazer a mesma coisa com o NEst Page
    if(this.currentPage>1){
      this.currentPage--;
    }

    this.router.navigate(['/livros'], {queryParams: {'page': this.currentPage}});
    this.listarLivros(this.usuario,this.currentPage-1,5);
  }

  nextPage(){
    if(this.currentPage!=this.numeroPagina){
      this.currentPage++;
    }
    this.router.navigate(['/livros'], {queryParams: {'page': this.currentPage}});
    this.listarLivros(this.usuario,this.currentPage-1,5);
  }





  //updateBook(idLivro){

  //}

}





