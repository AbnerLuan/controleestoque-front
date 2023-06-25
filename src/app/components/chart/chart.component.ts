import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { Grafico } from 'src/app/model/grafico';
import { GraficoService } from 'src/app/service/grafico.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas: ElementRef;

  chart: Chart;

  colors = ['blue', 'red', 'green', 'black'];


  graficos: Grafico[];

  constructor(private graficoService: GraficoService) { }

  ngAfterViewInit() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    this.graficoService.getDadosGrafico().subscribe(graficos => {
      this.graficos = graficos;
      this.renderChart(ctx);
    });
  }

  renderChart(ctx) {
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: this.graficos.map((grafico, index) => ({
          label: grafico.label,
          data: grafico.data,
          fill: false,
          borderColor: this.colors[index % this.colors.length],
          tension: 0.4
        }))
      },
      options: {
        responsive: true,
        interaction: {
          intersect: false
        },
        plugins: {
          title: {
            display: true,
            text: 'Progressive Line With Easing'
          }
        }
      }
    });
  }  

}