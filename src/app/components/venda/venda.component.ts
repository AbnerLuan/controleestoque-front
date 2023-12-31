import { Component, OnInit } from '@angular/core';
import { ItemPedido } from 'src/app/model/itempedido';
import { Venda } from 'src/app/model/venda';
import { VendaService } from 'src/app/service/venda.service';
import { ItempedidoService } from 'src/app/service/itempedido.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProdutoService } from 'src/app/service/produto.service';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

  venda: Venda = {
    vendaId: null,
    nomeCliente: '',
    canalVenda: '',
    valorFrete: null,
    valorTarifa: null,
    lucroVenda: null,
    valorTotalVenda: null,
    dataVenda: '',
    itens: []
  };

  vendaDetalhes: Venda = {
    vendaId: null,
    nomeCliente: '',
    canalVenda: '',
    valorFrete: null,
    valorTarifa: null,
    lucroVenda: null,
    valorTotalVenda: null,
    dataVenda: '',
    itens: []
  };

  nomeCliente = new FormControl(null, Validators.minLength(3));
  canalVenda = new FormControl(null, Validators.minLength(1));
  valorFrete = new FormControl(null, Validators.min(1));
  valorTarifa = new FormControl(null, Validators.min(1));

  novoItem: ItemPedido = {
    nomeProduto: '',
    quantidade: null,
    valorUnit: null,
    itemId: null
  };

  vendas: Venda[] = [];
  isEdit = false;
  editandoItem: boolean = false;

  page = 0;
  pageSize = 10; 
  totalElements = 0; 

  constructor(
    private vendaService: VendaService,
    private toastr: ToastrService,
    private produtoService: ProdutoService,
    private modalService: NgbModal,
    private itempedidoService: ItempedidoService,
  ) { }

  ngOnInit(): void {
    this.buscarVendas();
  }

  buscarVendas() {
    this.vendaService.buscarTodos(this.page, this.pageSize).subscribe(
      response => {
        this.vendas = response.content;
        this.totalElements = response.totalElements;
      },
      error => {
        this.showError('Erro ao carregar dados!');
      }
    );
  }

  salvarVenda(): void {
    if (!this.validaCampos()) {
      this.showError('Preencha todos os campos corretamente.');
      return;
    }

    this.vendaService.criarVenda(this.venda).subscribe(
      novaVenda => {
        this.vendas.push(novaVenda);
        this.limparFormulario();
        this.buscarVendas();
        this.showSuccess('Venda Salva com Sucesso!');
      },
      error => {
        this.showError('Erro ao criar venda: ' + error);
      }
    );
  }

  atualizarVenda(venda: Venda): void {
    this.vendaService.atualizarVenda(venda).subscribe(
      vendaAtualizada => {
        this.showSuccess('Venda Atualizada com Sucesso!');
        const index = this.vendas.findIndex(v => v.vendaId === vendaAtualizada.vendaId);
        if (index !== -1) {
          this.vendas[index] = vendaAtualizada;
        }
        this.limparFormulario();
        this.buscarVendas();
      },
      error => {
        this.showError('Erro ao atualizar venda: ' + error);
      }
    );
  }


  removerVenda(venda: Venda): void {
    const vendaId = venda.vendaId;
    this.vendaService.removerVenda(vendaId).subscribe(
      () => {
        this.vendas = this.vendas.filter(v => v.vendaId !== vendaId);
        this.showSuccess('Venda Removida com Sucesso!');
        this.buscarVendas();
      },
      error => {
        this.showError('Erro ao remover venda: ' + error);
      }
    );
  }

  limparFormulario(): void {
    this.venda = {
      vendaId: null,
      nomeCliente: '',
      canalVenda: '',
      valorFrete: null,
      valorTarifa: null,
      valorTotalVenda: null,
      dataVenda: '',
      itens: []
    };
    this.novoItem = {
      nomeProduto: '',
      quantidade: null,
      valorUnit: null,
      itemId: null
    };
    this.isEdit = false;
  }

  editarVenda(venda: Venda) {
    this.isEdit = true;
    this.venda = { ...venda };
  }

  adicionarItem(): void {
    if (this.novoItem.nomeProduto && this.novoItem.quantidade && this.novoItem.valorUnit) {
      this.venda.itens.push({ ...this.novoItem });
      this.novoItem = { nomeProduto: '', quantidade: 0, valorUnit: 0 };
      //this.editandoItem = false;
    } else {
      this.showError('Preencha todos os campos do item corretamente.');
    }
  }

  editarItem(item: any, index: number) {
    this.editandoItem = true;
    this.novoItem = {
      itemId: item.itemId,
      nomeProduto: item.nomeProduto,
      quantidade: item.quantidade,
      valorUnit: item.valorUnit
    };
    this.venda.itens.splice(index, 1);
  }

  validaCampos(): boolean {
    return this.nomeCliente.valid && this.canalVenda.valid;
  }

  confirmarExclusaoVenda(venda: Venda): void {
    if (window.confirm('Tem certeza de que deseja remover esta venda?')) {
      this.removerVenda(venda);
    }
  }

  showSuccess(message: string): void {
    this.toastr.success(message);
  }

  showError(message: string): void {
    this.toastr.error(message);
  }

  buscarProdutos = (text$: Observable<string>): Observable<string[]> => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term =>
        this.produtoService.findAllProdutos().pipe(
          map(produtos => produtos.filter(produto => produto.toLowerCase().includes(term.toLowerCase())))
        )
      )
    );
  }

  selecionarProduto(event: NgbTypeaheadSelectItemEvent): void {
    this.novoItem.nomeProduto = event.item;
  }

  changePage(page: number) {
    this.page = page;
    this.buscarVendas();
  }

  changePageSize(pageSize: number) {
    this.page = 0;
    this.pageSize = pageSize;
    this.buscarVendas();
  }

  getPageIndexes(): number[] {
    const totalPages = Math.ceil(this.totalElements / this.pageSize);
    return Array.from({ length: totalPages }, (_, index) => index);
  }

  openModal(content: any, venda: Venda): void {
    this.vendaDetalhes = { ...venda };
    this.modalService.open(content, { ariaLabelledBy: 'viewSaleModalLabel' });
  }

  cancelarEdicao() {
    this.isEdit = false;
    this.limparFormulario();
    this.editandoItem = false;
    this.buscarVendas();
  }

  excluirItem(item: any, index: number) {
    if (!item || item.itemId === null) {
      this.venda.itens.splice(index, 1);
    } else {
      if (confirm('Tem certeza de que deseja remover este item?')) {
        this.itempedidoService.excluirItem(item).subscribe(
          () => {
            this.venda.itens.splice(index, 1);
            this.toastr.success("Item " + item.itemId + " excluído com sucesso!");
          },
          (error) => {
            // Lida com erros ao chamar o serviço de exclusão
          }
        );
      }
    }
  }

}
