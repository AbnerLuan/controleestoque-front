import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/service/produto.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators, } from '@angular/forms';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit{  

  constructor(private produtoService: ProdutoService,
    private toastr: ToastrService,) { }

  produtos: Produto[];
  produto: Produto = {} as Produto;
  isEdit = false;

  nomeProduto = new FormControl(null, Validators.minLength(3));
  tipoProduto = new FormControl(null, Validators.minLength(2));
  marcaProduto = new FormControl(null, Validators.minLength(2));
 
  ngOnInit() {
    this.buscarProdutos();
  }

  buscarProdutos() {
    this.produtoService.buscarTodos().subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  salvarProduto() {
    if (this.isEdit) {
      this.produtoService.atualizar(this.produto).subscribe(
        () => {
          this.limparFormulario();
          this.buscarProdutos();
          this.isEdit = false;
          this.toastr.success('Produto atualizado com sucesso!');
        },
        error => {
          this.toastr.error('Erro ao atualizar o produto: ' + error.status  + ' - ' + error.message);
        }
      );
    } else {
      this.produtoService.salvar(this.produto).subscribe(
        () => {
          this.limparFormulario();
          this.buscarProdutos();
          this.toastr.success('Produto salvo com sucesso!');
        },
        error => {
          this.toastr.error('Erro ao salvar o produto: ' + error.status + ' - ' + error.message);
        }
      );
    }
  }

  editarProduto(produto: Produto) {
    this.isEdit = true;
    this.produto = { ...produto };
  }

  removerProduto(id: number) {
    if (confirm('Tem certeza que deseja remover este produto?')) {
      this.produtoService.remover(id).subscribe(() => {
        this.buscarProdutos();
      });
    }
  }

  limparFormulario() {
    this.produto = {} as Produto;
  }

  validaCampos(): boolean {
    return this.nomeProduto.valid && this.tipoProduto.valid && this.marcaProduto.valid;
  }

  cancelarEdicao() {
    this.isEdit = false;
    this.limparFormulario();
}
}
