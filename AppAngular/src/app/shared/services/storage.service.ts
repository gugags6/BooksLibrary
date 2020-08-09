import { Injectable } from '@angular/core';
import { EnvService } from 'src/app/env.service';
import { Usuario } from '../models/usuario';
import { LocalUserModel } from '../models/local-user.model';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private envService: EnvService) { }

    getLocalUser(): LocalUserModel {
        let usr = localStorage.getItem(this.envService.storageKeysConfig.localUser);
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj: LocalUserModel) {
        if (obj == null) {
            localStorage.removeItem(this.envService.storageKeysConfig.localUser);
        }
        else {
            localStorage.setItem(this.envService.storageKeysConfig.localUser, JSON.stringify(obj));
        }
    }

   
}