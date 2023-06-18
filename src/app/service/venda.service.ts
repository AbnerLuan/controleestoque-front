import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venda } from '../model/venda';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private URL = environment.url + 'vendas';

  constructor(private http: HttpClient) {}

  buscarTodos(page: number, size: number): Observable<Page<Venda>> {
    const params = new HttpParams()
    .set('page', String(page))
    .set('size', String(size));  
    return this.http.get<Page<Venda>>(this.URL, { params });
  }

  getVendaById(id: number): Observable<Venda> {
    const url = `${this.URL}/${id}`;
    return this.http.get<Venda>(url);
  }

  criarVenda(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(this.URL, venda);
  }

  atualizarVenda(venda: Venda): Observable<Venda> {
    const url = `${this.URL}/${venda.vendaId}`;
    return this.http.put<Venda>(url, venda);
  }

  removerVenda(id: number): Observable<void> {
    const url = `${this.URL}/${id}`;
    return this.http.delete<void>(url);
  }

}