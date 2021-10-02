import { VariaveisGlobaisService } from './../../shared/services/variaveis-globais.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Autor } from 'src/app/shared/models/autor';
import { Livro } from 'src/app/shared/models/livro';
import { Usuario } from 'src/app/shared/models/usuario';
import { LivroService } from 'src/app/shared/services/livro.service';

@Component({
  selector: 'app-livro-detalhe',
  templateUrl: './livro-detalhe.component.html',
  styleUrls: ['./livro-detalhe.component.css']
})
export class LivroDetalheComponent implements OnInit {

  autores: any = [];
  author: Autor = new Autor();
  user: Usuario = new Usuario();
  livro: Livro = new Livro();
  imagem : File = null;
  image : any;
  //Variáveis da rota
  idRota;
  id: number;
  inscricao: Subscription;

  constructor( private livroService : LivroService,
    private route: ActivatedRoute,
    private router: Router,
    private variaveisGlobais: VariaveisGlobaisService) { }

  ngOnInit() {
    this.inscricao=this.route.params.subscribe(
      (params: any)=>{
        this.id = params['id'];
      }
    );

    
    this.livroService.getLivroById(this.id).subscribe((dataLivro=>{
      console.log("=====>> " , dataLivro);
      this.livro = dataLivro;
      console.log ( this.livro );
    }));
    

    if(this.livro == null){
      this.router.navigate(['/notFound']);
    }

    console.log("Is Auth: " + this.variaveisGlobais.isAuth)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.inscricao.unsubscribe();
  }

}
