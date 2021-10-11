import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tokenAuth } from '../models/token-auth';
import { Router } from '@angular/router';
import { EnvService } from 'src/app/env.service';
import { StorageService } from './storage.service';
import { DialogService } from '../toaster/dialog.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../models/usuario';
import { LocalUserModel } from '../models/local-user.model';
import { VariaveisGlobaisService } from './variaveis-globais.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isAuth: boolean;
  private idUser: number;
  private usuario: Usuario;
  private email: string;
  private usuarioAutenticado: boolean;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private envService: EnvService,
    private storageService: StorageService,
    private usuarioService : UsuariosService,
    private globalService : VariaveisGlobaisService,
    private dialogService: DialogService) { }


  fazerLogin(login: { email: string, senha: string }) {

    //console.log(login);
    this.email = login.email;


    this.http.post<tokenAuth>(`${this.envService.urlAPI}/autenticacao`, login).subscribe(
      (data) => {

        //console.log("data : ", data);

        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(data.token);


        this.isAuth = true;



        let localUser: LocalUserModel = {
          token: data.token,

          email: decodedToken.sub,
          nome: decodedToken.nome,
          exp: decodedToken.exp,
          iat: decodedToken.iat,
          scopes: decodedToken.scopes.split(',')
        }

        this.storageService.setLocalUser(localUser);
        this.usuarioAutenticado = true;
        this.mostrarMenuEmitter.emit(true);
        this.router.navigate(['/livros'], {queryParams: {'page': 1}});
        this.dialogService.showSuccess('Login feito com sucesso!');

        this.usuarioService.getUserByEmail(this.email)
        .subscribe(
          (dados) => {

           this.usuario = dados

          }
        );

        this.globalService.isAuth = this.isAuth;
        this.globalService.usuarioLogado = this.usuario;

      }
    );
  }

  logout() {
    this.storageService.setLocalUser(null);
    this.isAuth = false;
    this.globalService.isAuth = this.isAuth;
    console.log("Is Auth: " + this.globalService.isAuth)
    this.mostrarMenuEmitter.emit(false);
    this.usuarioAutenticado = false;
    this.router.navigate(['/login']);
    return this.usuarioAutenticado;
  }

  usuarioautenticado(){
    console.log('Acesso de LoginService: ' + this.usuarioAutenticado);
    console.log('LocalUser: ' + this.storageService.getLocalUser());
    let localUser: LocalUserModel = this.storageService.getLocalUser();
    if (localUser == null) {
      this.isAuth = false;
    } else{
      this.isAuth = true;
      this.mostrarMenuEmitter.emit(true);
    }
    //console.log(localUser);

    return this.isAuth;
  }


}
