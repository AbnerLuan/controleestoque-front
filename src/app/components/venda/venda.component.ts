import { Component, OnInit } from '@angular/core';
import { ItemPedido } from 'src/app/model/itempedido';
import { Venda } from 'src/app/model/venda';
import { VendaService } from 'src/app/service/venda.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

  venda: Venda = {
    vendaId: 0,
    nomeCliente: '',
    canalVenda: '',
    valorTotalVenda: 0,
    dataVenda: '',
    itens: []
  };

  nomeCliente = new FormControl(null, Validators.minLength(3));
  canalVenda = new FormControl(null, Validators.minLength(1));

  novoItem: ItemPedido = {
    nomeProduto: '',
    quantidade: 0,
    valorUnit: 0
  };

  vendas: Venda[] = [];
  isEdit = false;

  constructor(
    private vendaService: VendaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.carregarVendas();
  }

  carregarVendas(): void {
    this.vendaService.getVendas().subscribe(
      vendas => {
        this.vendas = vendas;
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
        this.carregarVendas();
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
        this.carregarVendas();
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
        this.carregarVendas();
      },
      error => {
        this.showError('Erro ao remover venda: ' + error);
      }
    );
  }
  

  limparFormulario(): void {
    this.venda = {
      vendaId: 0,
      nomeCliente: '',
      canalVenda: '',
      valorTotalVenda: 0,
      dataVenda: '',
      itens: []
    };
    this.isEdit = false;
  }

  editarVenda(venda: Venda) {
    this.isEdit = true;
    this.venda = { ...venda };
  }

  adicionarItem(): void {
    const novoItem: ItemPedido = {
      nomeProduto: this.novoItem.nomeProduto,
      quantidade: this.novoItem.quantidade,
      valorUnit: this.novoItem.valorUnit
    };
    this.venda.itens.push(novoItem);
    this.novoItem = {
      nomeProduto: '',
      quantidade: 0,
      valorUnit: 0
    };
  }

  removerItem(index: number): void {
    this.venda.itens.splice(index, 1);
  }

  editarItem(item: any, index: number) {
    this.novoItem = {
      nomeProduto: item.nomeProduto,
      quantidade: item.quantidade,
      valorUnit: item.valorUnit
    };
    this.venda.itens.splice(index, 1);
  }

  validaCampos(): boolean {
    return this.nomeCliente.valid && this.canalVenda.valid;
  }

  confirmarExclusaoItem(index: number): void {
    if (confirm('Tem certeza de que deseja remover este item?')) {
      this.removerItem(index);
    }
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
}
