import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import { StorageService } from '../shared/services/storage.service';
import { Usuario } from '../shared/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  usuario : Usuario;

  constructor(private formBuilder :  FormBuilder,
              private localStorage:StorageService, 
              private serviceLogin : LoginService) {

   }

  ngOnInit() {
    this.localStorage.setLocalUser(null);
// declaração das variaveis para a validação dos campos e-mail e senha 
    this.loginForm = this.formBuilder.group( { 
      email : [ '',[Validators.required]  ], 
      senha : [ '' , [Validators.required] ] 
    });
  }

  onSubmit(){
    //console.log(this.loginForm);

    //Verifica ao enviar se os dados informados são validos
    let login = {email : this.loginForm.value.email, senha : this.loginForm.value.senha};
    
    return this.serviceLogin.fazerLogin(login);
  }

  //campo para validar se os campos forem devidamente preenchidos para habilitação do botão
 isErrorCampo(nomeCampo){
  return (!this.loginForm.get(nomeCampo).valid && this.loginForm.get(nomeCampo).touched ); 
}

}
