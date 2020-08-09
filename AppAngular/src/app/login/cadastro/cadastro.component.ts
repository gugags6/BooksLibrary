import { Component, OnInit } from '@angular/core';
import { Estado } from 'src/app/shared/models/estados';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { Usuario } from 'src/app/shared/models/usuario';
import { DialogService } from 'src/app/shared/toaster/dialog.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm : FormGroup;
   user: Usuario = new Usuario();

  estados=[
    new Estado(1,"Acre"),
    new Estado(2,"Alagoas"),
    new Estado(3,"Amapá"),
    new Estado(4,"Amazonas"),
    new Estado(5,"Bahia"),
    new Estado(6,"Ceará"),
    new Estado(7,"Distrito Federal"),
    new Estado(8,"Espírito Santo"),
    new Estado(9,"Goiás"),
    new Estado(10,"Maranhão"),
    new Estado(11,"Mato Grosso"),
    new Estado(12,"Mato Grosso do Sul"),
    new Estado(13,"Minas Gerais"),
    new Estado(14,"Pará"),
    new Estado(15,"Paraíba"),
    new Estado(16,"Paraná"),
    new Estado(17,"Pernambuco"),
    new Estado(18,"Piauí"),
    new Estado(19,"Rio de Janeiro"),
    new Estado(20,"Rio Grande do Norte"),
    new Estado(21,"Rio Grande do Sul"),
    new Estado(22,"Rondônia"),
    new Estado(23,"Roraima"),
    new Estado(24,"Santa Catarina"),
    new Estado(25,"São Paulo"),
    new Estado(26,"Sergipe"),
    new Estado(27,"Tocantins")]

  constructor(private formBuilder :  FormBuilder,
    private usuarioService: UsuariosService,
    private dialogService: DialogService,
    private loginService : LoginService) { }

  ngOnInit() {

    this.cadastroForm = this.formBuilder.group( { 
      email : [ '',[Validators.required, Validators.minLength(8), Validators.maxLength(50) ]  ], 
      senha1: ['', [Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])]],
      senha2 : [ '' , [Validators.required] ] ,
      estado : [ '' , [Validators.required] ] ,
      cep : [ '' , [Validators.required] ] ,
      cidade : [ '' , [Validators.required] ] ,
      nome : [ '' , [Validators.required] ] ,
      endereco : [ '' , [Validators.required] ] ,
      dateNascimento : [ '' , [Validators.required] ] ,
    });
  }

  onSubmit() {

   
      //if (confirm("Deseja prosseguir ?")) {

        if (this.cadastroForm.valid) {
          //valido

          console.log(this.cadastroForm.status)
          console.log(this.cadastroForm)

          this.user.nome = this.cadastroForm.get('nome').value
          this.user.senha = this.cadastroForm.get('senha2').value
          this.user.email = this.cadastroForm.get('email').value
          this.user.endereco = this.cadastroForm.get('endereco').value
          this.user.cidade = this.cadastroForm.get('cidade').value
          this.user.estado = this.cadastroForm.get('estado').value
          this.user.dataDeNascimento = this.cadastroForm.get('dateNascimento').value
          
          this.usuarioService.cadastroUser(this.user)
            .subscribe(
              (dado) => {
                this.dialogService.showSuccess("Usuário salvo com sucesso");
                
               // this.loginService.fazerLogin( 
                 // {email:this.user.email,
                  //senha : this.user.senha} 
                  //);

              }
            );


        } else {
          this.dialogService.showError("O formulário está inválido");


        }
  // }
    
  }

  isErrorCampo(nomeCampo){
    return (!this.cadastroForm.get(nomeCampo).valid && this.cadastroForm.get(nomeCampo).touched ); 
  }

  isSenhaIgual(senha1, senha2){

    if(this.cadastroForm.get(senha1).value === this.cadastroForm.get(senha2).value){
      return true;
    }else{
      return false;
    }
  }

 

}
