import { Livro } from './livro';
import { Autor } from "./autor";
import { Usuario } from "./usuario";

export interface Page {
    content: Livro[]
    pageable: Pageable
    totalPages: number
    totalElements: number
    last: boolean
    size: number
    number: number
    sort: Sort2
    numberOfElements: number
    first: boolean
    empty: boolean
  }
  
  export interface Content {
    idLivro: number
    nome: string
    anoPublicacao: number
    numeroPaginas: number
    editora: string
    sinopse: any
    capa: any
    autor: Autor
    usuario: Usuario
  }
  
  /* export interface Autor {
    id: number
    nome: string
    nacionalidade: string
  }
  
  export interface Usuario {
    id: number
    nome: string
    email: string
    senha: any
    dataDeNascimento: string
    endereco: string
    estado: string
    cidade: string
    perfis: any[]
  } */
  
  export interface Pageable {
    sort: Sort
    offset: number
    pageNumber: number
    pageSize: number
    unpaged: boolean
    paged: boolean
  }
  
  export interface Sort {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  
  export interface Sort2 {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }