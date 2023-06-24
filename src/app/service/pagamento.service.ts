import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Fiado } from '../model/fiado';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private URL = environment.url + 'pagamentos';

  constructor(private http: HttpClient) { }

  salvarPagamento(fiado: Fiado): Observable<any> {
    return this.http.post(this.URL, fiado);
  }

  delete(id: number) {
    return this.http.delete(`${this.URL}/${id}`);
  }

}
