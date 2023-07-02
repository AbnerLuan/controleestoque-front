import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Fiado } from '../model/fiado';

@Injectable({
  providedIn: 'root'
})
export class FiadoService {

  private URL = environment.url + 'fiados';

  constructor(private http: HttpClient) { }

  buscarClientePorCelular(celularCliente: string): Observable<Fiado> {
    const url = `${this.URL}/cliente/${celularCliente}`;
    return this.http.get<Fiado>(url);
  }

  findAll(): Observable<Fiado[]> {
    return this.http.get<Fiado[]>(this.URL);
  }

  salvar(fiado: Fiado): Observable<any> {
    return this.http.post(this.URL, fiado);
  }

  update(fiado: Fiado): Observable<any> {
    const url = `${this.URL}/${fiado.fiadoId}`;
    return this.http.put(url, fiado);
  }

  remover(id: number) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
