import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/shared/models/paises';
import { Autor } from 'src/app/shared/models/autor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/shared/services/author.service';
import { DialogService } from 'src/app/shared/toaster/dialog.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit {

  autorForm : FormGroup;
   autor: Autor = new Autor();

  paises = [
    new Pais(1,"Brasil" ),
    new Pais(2, "Afeganistão" ),
    new Pais(3, "África do Sul" ),
    new Pais(4, "Albânia"),
    new Pais(5,"Alemanha"),
    new Pais(6,"Andorra"),
    new Pais(7,"Angola"),
    new Pais(8,"Anguilla"),
    new Pais(9,"Austrália"),
    new Pais(10, "Canadá"),
    new Pais(12,"Coreia do Norte"),
    new Pais(13,"Coreia do Sul"),
    new Pais(14,"Espanha"),
    new Pais(15,"Esados Unidos"),
    new Pais(16,"Finlândia"),
    new Pais(17,"França"),
    new Pais(18,"Grécia"),
    new Pais(19,"Inglaterra"),
    new Pais (20,"Índia"),
    new Pais(21,"Irlanda do Norte"),
    new Pais(22,"Irlanda"),
    new Pais(23,"Itália"),
    new Pais(24,"Japão"),
    new Pais(25,"México"),
    new Pais(26,"Nova Zelândia"),
    new Pais(27,"Peru"),
    new Pais(28,"Polônia"),
    new Pais(29,"Portugal"),
    new Pais(30,"Reino Unido"),
    new Pais(31,"Venezuela"),
    new Pais(32, "Outros")
  ]

  constructor(
    private formBuilder :  FormBuilder,
    private autorService : AuthorService, 
    private dialogService: DialogService) { }

  ngOnInit() {

    this.autorForm = this.formBuilder.group( { 
      nome : [ '' , [Validators.required] ] ,
      nacionalidade : [ '' , [Validators.required] ] ,
 
    });
  }

  onSubmit() {

   
    //if (confirm("Deseja prosseguir ?")) {

      if (this.autorForm.valid) {
        //valido

        console.log(this.autorForm.status)
        console.log(this.autorForm)

        this.autor.nome = this.autorForm.get('nome').value
        this.autor.nacionalidade = this.autorForm.get('nacionalidade').value
        
        this.autorService.cadastroAuthor(this.autor)
          .subscribe(
            (dado) => {
              this.dialogService.showSuccess("Autor cadastrado com sucesso");
              this.autorForm.reset();
            }
          );


      } else {
        this.dialogService.showError("O formulário está inválido");


      }
// }
  
}

}
