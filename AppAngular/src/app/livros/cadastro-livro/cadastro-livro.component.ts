import { Autor } from "src/app/shared/models/autor";
import { UsuariosService } from "src/app/shared/services/usuarios.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthorService } from "src/app/shared/services/author.service";
import { Livro } from "src/app/shared/models/livro";
import { LivroService } from "src/app/shared/services/livro.service";
import { DialogService } from "src/app/shared/toaster/dialog.service";
import { Usuario } from "src/app/shared/models/usuario";
import { ActivatedRoute, Router } from "@angular/router";
import { StorageService } from "src/app/shared/services/storage.service";

@Component({
  selector: "app-cadastro-livro",
  templateUrl: "./cadastro-livro.component.html",
  styleUrls: ["./cadastro-livro.component.css"],
})
export class CadastroLivroComponent implements OnInit {
  cadastroBookForm: FormGroup;
  autores: any = [];
  author: Autor = new Autor();
  user: Usuario = new Usuario();
  livro: Livro = new Livro();
  imagem: File = null;
  image: any;
  //Variáveis da rota
  idRota;
  isEdit: boolean = false;

  constructor(
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private livroService: LivroService,
    private activateRoute: ActivatedRoute,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cadastroBookForm = this.formBuilder.group({
      livro: this.formBuilder.group({
        autor: ["", [Validators.required]],
        nome: ["", [Validators.required]],
        ano: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(4),
          ],
        ],
        editora: ["", [Validators.required]],
        numPag: ["", [Validators.required]],
        image: [""],
        sinopse: [""],
      }),
    });

    this.authorService.getAuthors().subscribe((dados) => {
      //let aut: Autor = new Autor()
      // aut.nacionalidade = dados.nacionalidade;
      // aut.nome = dados.nome;
      this.autores = dados;
      console.log(this.autores);
    });

    //Carregando livros caso seja uma alteração
    this.activateRoute.params.subscribe((data) => {
      this.idRota = data.id;
      console.log("Id da rota: " + this.idRota);

      if (this.idRota) {
        console.log("Edicao");
        this.isEdit = true;

        this.livroService.getLivroById(this.idRota).subscribe((LivroApi) => {
          console.log("=====>> ", LivroApi);
          this.livro = LivroApi;
          console.log(this.livro);

          this.cadastroBookForm.patchValue(this.convertLivroToForm(this.livro));
        });
      } else {
        console.log("Criação");
        this.isEdit = false;
      }
    });
  }

  onSubmit() {
    if (this.cadastroBookForm.valid) {
      //valido

      console.log(this.cadastroBookForm.status);
      console.log(this.cadastroBookForm);

      //console.log("testando dado: " + this.cadastroBookForm.value.livro.get('nome').value)

      this.livro.nome = this.cadastroBookForm.value.livro.nome;
      this.livro.anoPublicacao = this.cadastroBookForm.value.livro.ano;
      this.livro.numeroPaginas = this.cadastroBookForm.value.livro.numPag;
      this.livro.editora = this.cadastroBookForm.value.livro.editora;
      this.livro.capa = this.image; //this.cadastroBookForm.get('image').value
      this.livro.sinopse = this.cadastroBookForm.value.livro.sinopse;
      this.livro.autor = this.author;
      this.user.email = this.storageService.getLocalUser().email;
      this.livro.usuario = this.user;

      console.log("Nome" + this.livro.nome);
      console.log("Ano" + this.livro.anoPublicacao);
      console.log("Pàginas" + this.livro.numeroPaginas);
      console.log("Editora" + this.livro.editora);
      console.log("capa" + this.livro.capa);
      console.log("autor" + this.livro.autor);
      console.log("email" + this.user.email);
      console.log("usuario" + this.livro.usuario);
      console.log("sinopse" + this.livro.sinopse);

      if (this.isEdit == false) {
        console.log("É uma inclusão");
        this.livroService.cadastroLivro(this.livro).subscribe(
          (dado) => {
            this.dialogService.showSuccess("Livro salvo com sucesso");
            //reseta o form
            this.cadastroBookForm.reset();
          },
          (error: any) =>
            this.dialogService.showError("Ocorreu um erro ao enviar os dados")
        );
      } else {
        console.log("É uma alteração");

        this.livroService
          .updateBookById(this.livro, this.livro.idLivro)
          .subscribe(
            (dado) => {
              this.dialogService.showSuccess("Livro alterado com sucesso");
              this.router.navigate(['/livros'], {queryParams: {'page': 1}});
            },
            (error: any) =>
              this.dialogService.showError("Ocorreu um erro ao enviar os dados")
          );
      }
      //fim do else do formulario
    } else {
      this.dialogService.showError("O formulário está inválido");
    }
  }

  imagePrincipalSelect(img, alter) {
    this.imagem = <File>img.target.files[0];
    this.putImage(img.value, alter);
    console.log("Alter" + img.value);
  }

  putImage(url, alter) {
    let mimetype = this.imagem.type;
    if (mimetype.match(/image\/*/) == null) {
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(this.imagem);
    reader.onload = (_event) => {
      alter.src = reader.result;
      this.image = alter.src;
    };
    console.log(this.imagem);
  }

  changeSuit(selectedOption: number): void {
    this.author.id = selectedOption;
    console.log(this.author);
  }

  private convertLivroToForm(livro) {
    return {
      livro: {
        nome: livro.nome,
        ano: livro.anoPublicacao,
        numPag: livro.numeroPaginas,
        editora: livro.editora,
        autor: livro.autor.nome,
        sinopse: livro.sinopse,
      },
    };
  }
}
