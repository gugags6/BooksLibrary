
import { map } from 'rxjs/operators';

import { HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cidade } from '../models/cidade.model';
import { Estado } from '../models/estado.model';



@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstados(){
    return this.http.get<Estado[]>('assets/dados/estados.json');
  }

  getCidades(idEstado: number){
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      map((cidades: Cidade[])=> cidades.filter(c=> c.estado==idEstado))
    );
  }


}
