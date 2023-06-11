import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venda } from '../model/venda';
import { Observable } from 'rxjs';
import { environmnet } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private URL = environmnet.url + 'vendas';

  constructor(private http: HttpClient) {}

  getVendas(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.URL);
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