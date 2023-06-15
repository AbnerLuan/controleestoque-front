import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environmnet } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ItempedidoService {

  private URL = environmnet.url + 'itempedido';

  constructor(private http: HttpClient) { }

  excluirItem(itemId: number): Observable<void> {
    const url = `${this.URL}/${itemId}`;   
    return this.http.delete<void>(url);
  }
}
