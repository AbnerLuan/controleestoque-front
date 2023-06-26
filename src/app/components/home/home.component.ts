import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Relatorio } from 'src/app/model/relatorio';
import { RelatorioService } from 'src/app/service/relatorio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  relatorio: Relatorio = {
    faturamentoAnual: null,
    faturamentoMedioMensal: null,
    faturamentoMesAtual: null,
    gastosAnual: null,
    gastosMedioMensal: null,
    gastosMesAtual: null,
    lucroAnual: null,
    lucroMedioMensal: null,
    lucroMesAtual: null,
    ativoEstoque: null,
    ativoCaixa: null,
    ativoDevedores: null,
    ativoTotal: null,
  };

  constructor(private relatorioService: RelatorioService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.buscarRelatorio();
  }

  buscarRelatorio() {
    this.relatorioService.buscarRelatorio().subscribe(
      response => {
        this.relatorio = response;
      },
      error => {
        this.toastr.error('Erro ao carregar dados!');
      }
    );
  }

}
