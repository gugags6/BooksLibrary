import { Autor } from 'src/app/shared/models/autor';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/shared/services/author.service';
import { Livro } from 'src/app/shared/models/livro';
import { LivroService } from 'src/app/shared/services/livro.service';
import { DialogService } from 'src/app/shared/toaster/dialog.service';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-cadastro-livro',
  templateUrl: './cadastro-livro.component.html',
  styleUrls: ['./cadastro-livro.component.css']
})
export class CadastroLivroComponent implements OnInit {

  cadastroBookForm:FormGroup;
  autores: any = [];
  author: Autor = new Autor();
  user: Usuario = new Usuario();
  livro: Livro = new Livro();
  imagem : File = null;
  image : any;


  constructor(
    private dialogService: DialogService,
    private formBuilder :  FormBuilder,
    private authorService : AuthorService,
    private livroService : LivroService
  ) { }

  ngOnInit() {

    this.cadastroBookForm = this.formBuilder.group( { 
      autor : [ '',[Validators.required ] ], 
      livro : [ '',[Validators.required ] ], 
      ano: [ '',[Validators.required, Validators.minLength(4), Validators.maxLength(4)  ]], 
      editora : [ '' , [Validators.required] ] ,
      numPag : [ '' , [Validators.required] ] ,
      image : [ '' ,  ] 
    });

    this.authorService.getAuthors()
    .subscribe(
      (dados) => {
        
        //let aut: Autor = new Autor()
       // aut.nacionalidade = dados.nacionalidade;
       // aut.nome = dados.nome;
       this.autores = dados;
       console.log(this.autores)
      }
    );
  }

  onSubmit() {


      if (this.cadastroBookForm.valid) {
        //valido

        console.log(this.cadastroBookForm.status)
        console.log(this.cadastroBookForm)

        this.livro.nome = this.cadastroBookForm.get('livro').value
        this.livro.anoPublicacao = this.cadastroBookForm.get('ano').value
        this.livro.numeroPaginas = this.cadastroBookForm.get('numPag').value
        this.livro.editora = this.cadastroBookForm.get('editora').value
        this.livro.capa = this.image//this.cadastroBookForm.get('image').value
        this.livro.autor = this.author
        this.user.email = "guga.gs6@gmail.com";
        this.livro.usuario = this.user
        console.log(this.cadastroBookForm.get('image').value.imagem)
        
        
        this.livroService.cadastroLivro(this.livro)
          .subscribe(
            (dado) => {
              this.dialogService.showSuccess("Livro salvo com sucesso");
              //reseta o form
              this.cadastroBookForm.reset();
            },
            (error:any)=> this.dialogService.showError("Ocorreu um erro ao enviar os dados")
          );

      } else {
        this.dialogService.showError("O formulário está inválido");


      }
  
}

imagePrincipalSelect(img, alter) {
  this.imagem =  <File>img.target.files[0];
  this.putImage(img.value, alter);
  console.log(alter)
}

putImage(url, alter) {
  let mimetype = this.imagem.type;
  if(mimetype.match(/image\/*/) == null) {
    return;
  }
  let reader = new FileReader();
  reader.readAsDataURL(this.imagem);
  reader.onload = (_event) => {
    

    alter.src = reader.result;
    this.image = alter.src 
    
    
  }
  console.log(this.imagem)
}




changeSuit(selectedOption: number): void {
 this.author.id = selectedOption
  console.log(this.author)
  
}



}
