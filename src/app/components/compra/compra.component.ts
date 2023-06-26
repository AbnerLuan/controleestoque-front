import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Compra } from 'src/app/model/compra';
import { ItemCompra } from 'src/app/model/itemcompra';
import { CompraService } from 'src/app/service/compra.service';
import { ItempedidoService } from 'src/app/service/itempedido.service';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  compra: Compra = {
    compraId: null,
    nomeFornecedor: '',    
    valorTotalCompra: null,
    dataCompra: null,
    itensCompra: []
  };

  compraDetalhes: Compra = {
    compraId: null,
    nomeFornecedor: '',    
    valorTotalCompra: null, 
    dataCompra: null,
    itensCompra: []
  };

  nomeFornecedor = new FormControl(null, Validators.minLength(3));
  canalCompra = new FormControl(null, Validators.minLength(1));
  valorFrete = new FormControl(null, Validators.min(1));
  valorTarifa = new FormControl(null, Validators.min(1));

  novoItem: ItemCompra = {
    nomeProduto: '',
    quantidade: null,
    valorUnit: null,
    valorTotalItem: null,
    itemCompraId: null,
  };

  compras: Compra[] = [];
  isEdit = false;
  editandoItem: boolean = false;

  page = 0; // Página atual
  pageSize = 5; // Quantidade de itens por página
  totalElements = 0; // Total de elementos

  constructor(
    private compraService: CompraService,
    private toastr: ToastrService,
    private produtoService: ProdutoService,
    private modalService: NgbModal,
    private itempedidoService: ItempedidoService,
  ) { }

  ngOnInit(): void {
    this.buscarCompras();
  }

  buscarCompras() {
    this.compraService.buscarTodos(this.page, this.pageSize).subscribe(
      response => {
        this.compras = response.content;
        this.totalElements = response.totalElements;
      },
      error => {
        this.showError('Erro ao carregar dados!');
      }
    );
  }

  salvarCompra(): void {
    if (!this.validaCampos()) {
      this.showError('Preencha todos os campos corretamente.');
      return;
    }

    this.compraService.criarCompra(this.compra).subscribe(
      novaCompra => {
        this.compras.push(novaCompra);
        this.limparFormulario();
        this.buscarCompras();
        this.showSuccess('Compra Salva com Sucesso!');
      },
      error => {
        this.showError('Erro ao criar compra: ' + error);
      }
    );
  }

  atualizarCompra(compra: Compra): void {
    this.compraService.atualizarCompra(compra).subscribe(
      compraAtualizada => {
        this.showSuccess('Compra Atualizada com Sucesso!');
        const index = this.compras.findIndex(v => v.compraId === compraAtualizada.compraId);
        if (index !== -1) {
          this.compras[index] = compraAtualizada;
        }
        this.limparFormulario();
        this.buscarCompras();
      },
      error => {
        this.showError('Erro ao atualizar compra: ' + error);
      }
    );
  }


  removerCompra(compra: Compra): void {
    const compraId = compra.compraId;    
    this.compraService.removerCompra(compraId).subscribe(
      () => {
        this.compras = this.compras.filter(v => v.compraId !== compraId);
        this.showSuccess('Compra Removida com Sucesso!');
        this.buscarCompras();
      },
      error => {
        this.showError('Erro ao remover compra: ' + error);
      }
    );
  }

  limparFormulario(): void {
    this.compra = {
      compraId: null,
      nomeFornecedor: '',
      valorTotalCompra: null,
      dataCompra: null,
      itensCompra: []
    };
    this.novoItem = {
      nomeProduto: '',
      quantidade: null,
      valorUnit: null,
      itemCompraId: null,
      valorTotalItem: null
    };
    this.isEdit = false;
  }

  editarCompra(compra: Compra) {
    this.isEdit = true;
    this.compra = { ...compra };
  }

  adicionarItem(): void {
    if (this.novoItem.nomeProduto && this.novoItem.quantidade && this.novoItem.valorUnit) {
      this.compra.itensCompra.push({ ...this.novoItem });
      this.novoItem = { nomeProduto: '', quantidade: 0, valorUnit: 0, valorTotalItem: 0 };
      //this.editandoItem = false;
    } else {
      this.showError('Preencha todos os campos do item corretamente.');
    }
  }

  editarItem(item: any, index: number) {
    this.editandoItem = true;
    this.novoItem = {
      itemCompraId: item.itemId,
      nomeProduto: item.nomeProduto,
      quantidade: item.quantidade,
      valorUnit: item.valorUnit,
      valorTotalItem: item.valorTotalItem,
    };
    this.compra.itensCompra.splice(index, 1);
  }

  validaCampos(): boolean {
    return this.nomeFornecedor.valid && this.canalCompra.valid;
  }

  confirmarExclusaoCompra(compra: Compra): void {
    if (window.confirm('Tem certeza de que deseja remover esta compra?')) {
      this.removerCompra(compra);
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
    this.buscarCompras();
  }

  changePageSize(pageSize: number) {
    this.page = 0;
    this.pageSize = pageSize;
    this.buscarCompras();
  }

  getPageIndexes(): number[] {
    const totalPages = Math.ceil(this.totalElements / this.pageSize);
    return Array.from({ length: totalPages }, (_, index) => index);
  }

  openModal(content: any, compra: Compra): void {
    this.compraDetalhes = { ...compra };
    this.modalService.open(content, { ariaLabelledBy: 'viewSaleModalLabel' });
  }

  cancelarEdicao() {
    this.isEdit = false;
    this.limparFormulario();
    this.editandoItem = false;
    this.buscarCompras();
  }

  excluirItem(item: any, index: number) {
    if (!item || item.itemId === null) {
      this.compra.itensCompra.splice(index, 1);
    } else {
      if (confirm('Tem certeza de que deseja remover este item?')) {
        this.itempedidoService.excluirItem(item).subscribe(
          () => {
            this.compra.itensCompra.splice(index, 1);
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
