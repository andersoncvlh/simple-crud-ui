import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CRUD_APP } from '../app.api';
import { Page } from '../models/page';
import { Pessoa } from './pessoa';

export class PessoaFiltro {
  pagina = 0;
  itensPorPagina = 20;
  nome: string;
  cpf: string;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  pesquisar(pessoaFiltro: PessoaFiltro): Observable<Page<Pessoa>> {
    let params = new HttpParams();
    if (pessoaFiltro && pessoaFiltro.pagina) {
      params = params
            .set('page', pessoaFiltro.pagina.toString())
            .set('size', pessoaFiltro.itensPorPagina.toString());
    }
    if (pessoaFiltro.nome) {
      params = params.set('nome', pessoaFiltro.nome);
    }
    if (pessoaFiltro.cpf) {
      params = params.set('cpf', pessoaFiltro.cpf);
    }
    return this.http.get<Page<Pessoa>>(`${CRUD_APP}/pessoa`, { params })
      .pipe(map(data => data));
  }

}
