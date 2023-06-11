import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmnet } from 'src/environment/environment';
import { Produto } from '../model/produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private URL = environmnet.url + 'produtos';

  constructor(private http: HttpClient) { }

  buscarTodos() {
    return this.http.get<Produto[]>(this.URL);
  }

  salvar(produto: Produto): Observable<any> {
    return this.http.post(this.URL, produto);
  }

  atualizar(produto: Produto): Observable<any> {
    return this.http.put(`${this.URL}/${produto.produtoId}`, produto);
  }

  remover(id: number) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
