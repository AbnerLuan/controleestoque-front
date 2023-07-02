import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Gasto } from 'src/app/model/gasto';
import { GastoService } from 'src/app/service/gasto.service';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.css']
})
export class GastoComponent implements OnInit {



  constructor(private gastoService: GastoService,
    private toastr: ToastrService,
  ) { }

  gastos: Gasto[];
  gasto: Gasto = {} as Gasto;

  page = 0;
  pageSize = 10;
  totalElements = 0;

  descricao = new FormControl('', Validators.minLength(3));
  valor = new FormControl('', Validators.minLength(1));

  ngOnInit(): void {
    this.findAll();
  }

  public findAll() {

    this.gastoService.buscarTodos(this.page, this.pageSize).subscribe(response => {
      this.gastos = response.content;
      this.totalElements = response.totalElements;
    },
      error => {
        this.toastr.error('Erro ao carregar dados!');
      }
    );


  }

  salvarGasto() {
    this.gastoService.salvar(this.gasto).subscribe(
      () => {
        this.limparFormulario();
        this.findAll();
        this.toastr.success('Gasto salvo com sucesso!');
      },
      error => {
        this.toastr.error('Erro ao salvar o gasto: ' + error.status + ' - ' + error.message);
      }
    );
  }

  public excluirGasto(gastoId: number) {
    if (confirm('Tem certeza que deseja remover este produto?')) {
      this.gastoService.remover(gastoId).subscribe(() => {
        this.toastr.success('Gasto excluído com sucesso!');
        this.findAll();
      });
    }
  }

  public limparFormulario() {
    this.gasto = {} as Gasto;
  }

  validaCampos(): boolean {
    return this.descricao.valid && this.valor.valid;
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
