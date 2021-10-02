import { Component, OnInit } from '@angular/core';
import { Estado } from 'src/app/shared/models/estado.model';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { Usuario } from 'src/app/shared/models/usuario';
import { DialogService } from 'src/app/shared/toaster/dialog.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router } from '@angular/router';
import { ConsultaCepService } from 'src/app/shared/services/consulta-cep.service';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { FormValidations } from 'src/app/shared/services/form-validations';
import { Cidade } from 'src/app/shared/models/cidade.model';
import { DropdownService } from 'src/app/shared/services/dropdown.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm : FormGroup;
   user: Usuario = new Usuario();
   estados: Estado[];
  cidades: Cidade[];



  constructor(private formBuilder :  FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router,
    private dialogService: DialogService,
    private loginService : LoginService,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService) { }

  ngOnInit() {

    this.dropdownService.getEstados()
    .subscribe(dados=>this.estados = dados);

    this.cadastroForm = this.formBuilder.group( {
      email : [ '',[Validators.required, Validators.minLength(8), Validators.maxLength(50) ]  ],
      senha1: ['', [Validators.compose([ Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/),Validators.required, Validators.minLength(6), Validators.maxLength(12)])]],
      senha2 : [ '' , [Validators.required] ] ,
      estado : [ '' , [Validators.required] ] ,
      cep : [ '' , [Validators.required, FormValidations.cepValidator] ] ,
      cidade : [ '' , [Validators.required] ] ,
      nome : [ '' , [Validators.required] ] ,
      endereco : [ '' , [Validators.required] ] ,
      dateNascimento : [ '' , [Validators.required] ] ,
    });

    this.cadastroForm.get('cep').statusChanges
    .pipe(
      tap(value=>console.log(value)),
      distinctUntilChanged(),
      switchMap(status=>status==='VALID' ?
        this.cepService.consultaCep(this.cadastroForm.get('cep').value)
        : EMPTY
      )
    )
    .subscribe(dados=>dados?this.populaDados(dados):{});

    this.cadastroForm.get('estado').valueChanges
        .pipe(
          tap(estado=>console.log('Novo estado: ', estado)),
          map(estado=> this.estados.filter(e=>e.sigla===estado)),
          map(estados=>estados && estados.length>0 ? estados[0].id : EMPTY),
          switchMap((estadoId: number)=>this.dropdownService.getCidades(estadoId)),
          tap(console.log)
        )
        .subscribe(cidades=> this.cidades = cidades);
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
                this.router.navigate(['/login']);

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

  isSenhaForte(senha1){

    let r = /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/;

    console.log('testando regex: ' + r.test(this.cadastroForm.get(senha1).value))


    return r.test(this.cadastroForm.get(senha1).value);

  }

  isSenhaIgual(senha1, senha2){


    if(this.cadastroForm.get(senha1).value === this.cadastroForm.get(senha2).value){
      return true;
    }else{
      return false;
    }
  }

  populaDados(dados){

    this.cadastroForm.patchValue({

       // cep: dados.cep,
       endereco: dados.logradouro,
        cidade: dados.localidade,
        estado: dados.uf

    });
  }



}
