import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemcompraService {

  private URL = environment.url + 'itemcompra';

  constructor(private http: HttpClient) { }

  excluirItem(itemId: number): Observable<void> {
    const url = `${this.URL}/${itemId}`;   
    return this.http.delete<void>(url);
  }
}
