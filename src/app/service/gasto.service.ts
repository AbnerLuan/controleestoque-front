import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Page } from '../model/page';
import { Gasto } from '../model/gasto';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  private URL = environment.url + 'gastos';

  constructor(private http: HttpClient) { }

  buscarTodos(page: number, size: number): Observable<Page<Gasto>> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));  
    return this.http.get<Page<Gasto>>(this.URL, { params });
  }

  salvar(gasto: Gasto): Observable<any> {
    return this.http.post(this.URL, gasto);
  }

  remover(id: number) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
