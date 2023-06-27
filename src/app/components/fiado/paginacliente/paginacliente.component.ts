import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fiado } from 'src/app/model/fiado';
import { FiadoService } from 'src/app/service/fiado.service';

@Component({
  selector: 'app-paginacliente',
  templateUrl: './paginacliente.component.html',
  styleUrls: ['./paginacliente.component.css']
})
export class PaginaclienteComponent implements OnInit{

  

  celularCliente: string;

  constructor (private fiadoService: FiadoService,
    private activatedRoute: ActivatedRoute,) {}

    fiado: Fiado;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.celularCliente = params.get('celularCliente');
      this.findByCelularCliente();                 
    });
  }  

  findByCelularCliente(): void {    
      this.fiadoService.buscarClientePorCelular(this.celularCliente).subscribe((fiado: Fiado) => {
        this.fiado = fiado;
      });   
  }  

}
