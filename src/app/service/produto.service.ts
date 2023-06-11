import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmnet } from 'src/environment/environment';
import { Produto } from '../model/produto';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private URL = environmnet.url + 'produtos';

  constructor(private http: HttpClient) { }

  buscarTodos() {
    return this.http.get<Produto[]>(this.URL);
  }

  findAllProdutos(): Observable<string[]> {
    return this.http.get<string[]>(this.URL + "/nomes").pipe(
      catchError(() => of([]))
    );
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
