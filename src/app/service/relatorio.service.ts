import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Relatorio } from '../model/relatorio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private URL = environment.url + 'relatorios';

  constructor(private http: HttpClient) { }

  buscarRelatorio(): Observable<Relatorio> {    
    return this.http.get<Relatorio>(this.URL);
  }
  
}
