import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Relatorio } from '../model/relatorio';
import { Grafico } from '../model/grafico';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {

  private URL = environment.url + 'grafico';

  constructor(private http: HttpClient) { }

  getDadosGrafico(): Observable<Grafico[]> {
    return this.http.get<Grafico[]>(this.URL);
  }
}
