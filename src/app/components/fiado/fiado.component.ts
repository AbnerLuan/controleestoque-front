import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Fiado } from 'src/app/model/fiado';
import { FiadoService } from 'src/app/service/fiado.service';
import { PagamentoService } from 'src/app/service/pagamento.service';

@Component({
  selector: 'app-fiado',
  templateUrl: './fiado.component.html',
  styleUrls: ['./fiado.component.css']
})
export class FiadoComponent implements OnInit {

  constructor(private fiadoService: FiadoService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private pagamentoService: PagamentoService
  ) { }

  selectedFiado: Fiado | undefined;
  fiados: Fiado[];
  fiado: Fiado = {} as Fiado;
  valorPagamento: number;
  pagamentos: any[] = [];
  novoPagamento: any = {};
  isEdit: boolean = false;

  nomeCliente = new FormControl('', Validators.minLength(3));
  valorTotal = new FormControl('', Validators.minLength(1));

  @ViewChild('content', { static: false }) modalContent!: TemplateRef<any>;

  modalRef: NgbModalRef | undefined;
  ngOnInit(): void {
    this.findAll();
  }

  public findAll() {
    this.fiadoService.findAll().subscribe(
      response => {
        this.fiados = response;
      },
      error => {
        this.toastr.error('Erro ao carregar dados!');
        console.error(error); // Exibe o erro no console para fins de depuração
      }
    );
  }

  submitFiado() {
    if (this.isEdit) {
      this.updateFiado();
    } else {
      this.salvarFiado();
    }
  }

  salvarFiado() {
    this.fiado.pagamento = this.pagamentos;
    this.fiadoService.salvar(this.fiado).subscribe(
      () => {
        this.limparFormulario();
        this.findAll();
        this.toastr.success('Registro salvo com sucesso!');
      },
      error => {
        this.toastr.error('Erro ao salvar o registro: ' + error.status + ' - ' + error.message);
      }
    );
  }

  public excluirFiado(fiadoId: number) {
    if (confirm('Tem certeza que deseja remover este registro?')) {
      this.fiadoService.remover(fiadoId).subscribe(() => {
        this.toastr.success('Registro excluído com sucesso!');
        this.findAll();
      });
    }
  }

  updateFiado() {
    if (this.validaCampos()) {
      if (this.isEdit) {
        this.fiado.pagamento = this.pagamentos; // Adiciona os pagamentos atualizados ao objeto Fiado
        this.fiadoService.update(this.fiado).subscribe(
          () => {
            this.toastr.success("Registro atualizado com sucesso.");
            this.limparFormulario();
            this.findAll();
            this.isEdit = false;
          },
          (error) => {
            this.toastr.error("Erro ao atualizar o registro.");
          }
        );
      }
    }
  }


  editarPagamento(pagamento: any, index: number) {
    this.novoPagamento = pagamento;
    this.pagamentos.splice(index, 1);
  }

  excluirPagamento(index: number) {
    const pagamento = this.pagamentos[index];
    if (pagamento.pagamentoId) {
      const confirmarExclusao = confirm('Tem certeza de que deseja excluir o pagamento?');
      if (confirmarExclusao) {
        this.pagamentoService.delete(pagamento.pagamentoId).subscribe(
          () => {
            this.pagamentos.splice(index, 1);
            this.toastr.success('Pagamento excluído com sucesso!');
          },
          error => {
            this.toastr.error('Erro ao excluir pagamento: ' + error.status + ' - ' + error.message);
          }
        );
      }
    } else {
      this.pagamentos.splice(index, 1);
    }
  }
  

  adicionarPagamento() {
    if (this.novoPagamento.valor) {
      this.pagamentos.push({ valorPagamento: this.novoPagamento.valor });
      this.novoPagamento = {};
    }
  }

  cancelarEdicao() {
    this.isEdit = false;
    this.limparFormulario();
    //this.editandoItem = false;
    this.findAll();
  }

  public limparFormulario() {
    this.fiado = {} as Fiado;
    this.pagamentos = [] = [];

  }

  validaCampos(): boolean {
    return this.valorTotal.valid && this.nomeCliente.valid;
  }

  openModal(fiadoItem: Fiado) {
    this.selectedFiado = fiadoItem;
    this.modalRef = this.modalService.open(this.modalContent, { ariaLabelledBy: 'modal-title' });
  }

  carregarDadosParaEdicao(fiadoItem: Fiado) {
    this.fiado = { ...fiadoItem };
    this.pagamentos = [...fiadoItem.pagamento];
    this.isEdit = true;    
  }

}
