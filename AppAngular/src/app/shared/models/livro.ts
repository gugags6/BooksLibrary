import { Autor } from './autor';
import { Usuario } from './usuario';

export class Livro {
  
    idLivro : number;
    nome: string;
    anoPublicacao : number;
    numeroPaginas : number;
    editora : string;
    capa : string;
    sinopse: string;
    autor : Autor;
    usuario : Usuario;

 }