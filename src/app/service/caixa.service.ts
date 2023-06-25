import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Caixa } from '../model/caixa';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class CaixaService {

  private URL = environment.url + 'caixa';

  constructor(private http: HttpClient) { }

  findAll(page: number, size: number): Observable<Page<Caixa>> {   
    const params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size)); 
    return this.http.get<Page<Caixa>>(this.URL, { params });
  }

  salvar(caixa: Caixa): Observable<any> {
    return this.http.post(this.URL, caixa);
  }

}
