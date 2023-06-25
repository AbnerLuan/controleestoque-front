import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Caixa } from 'src/app/model/caixa';
import { CaixaService } from 'src/app/service/caixa.service';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements OnInit {

  caixas: Caixa[] = [];
  caixa: Caixa = {} as Caixa;

  page = 0;
  pageSize = 10;
  totalElements = 0; 

  tipoTransacao = new FormControl('', Validators.minLength(3));
  valorTransacao = new FormControl('', Validators.minLength(1));
  observacao = new FormControl('', Validators.minLength(1));

  constructor(private caixaService: CaixaService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.caixaService.findAll(this.page, this.pageSize).subscribe(response => {
      this.caixas = response.content;
      this.totalElements = response.totalElements;     
    },
      error => {
        this.toastr.error('Erro ao carregar dados!');
      }
    );
  }

  salvarTransacao() {    
      this.caixaService.salvar(this.caixa).subscribe(
        () => {
          this.limparFormulario();
          this.findAll();
          this.toastr.success('Lançamento salvo com sucesso!');
        },
        error => {
          this.toastr.error('Erro ao salvar o lançamento: ' + error.status + ' - ' + error.message);
        }
      );
    
    
  }

  limparFormulario() {
    this.caixa = {} as Caixa;
  }

  validaCampos(): boolean {
    return this.tipoTransacao.valid && this.valorTransacao.valid;
  }

  changePage(page: number) {
    this.page = page;
    this.findAll();
  }

  changePageSize(pageSize: number) {
    this.page = 0;
    this.pageSize = pageSize;
    this.findAll();
  }

}
