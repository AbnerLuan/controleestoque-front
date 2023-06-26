import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Page } from '../model/page';
import { Compra } from '../model/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  
  private URL = environment.url + 'compras';

  constructor(private http: HttpClient) {}

  buscarTodos(page: number, size: number): Observable<Page<Compra>> {
    const params = new HttpParams()
    .set('page', String(page))
    .set('size', String(size));  
    return this.http.get<Page<Compra>>(this.URL, { params });
  }

  getCompraById(id: number): Observable<Compra> {
    const url = `${this.URL}/${id}`;
    return this.http.get<Compra>(url);
  }

  criarCompra(compra: Compra): Observable<Compra> {
    return this.http.post<Compra>(this.URL, compra);
  }

  atualizarCompra(compra: Compra): Observable<Compra> {
    const url = `${this.URL}/${compra.compraId}`;
    return this.http.put<Compra>(url, compra);
  }

  removerCompra(id: number): Observable<void> {    
    const url = `${this.URL}/${id}`;
    return this.http.delete<void>(url);
  }

}