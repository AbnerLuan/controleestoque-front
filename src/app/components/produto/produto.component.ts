import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/service/produto.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  constructor(private produtoService: ProdutoService, private toastr: ToastrService) { }

  produtos: Produto[];
  produto: Produto = {} as Produto;
  isEdit = false;
  options: string[] = ['Nome']; 
  selectedOption: string; 
  searchValue: string;

  page = 0;
  pageSize = 5;
  totalElements = 0;

  nomeProduto = new FormControl(null, Validators.minLength(3));
  tipoProduto = new FormControl(null, Validators.minLength(2));
  marcaProduto = new FormControl(null, Validators.minLength(2));

  ngOnInit() {
    this.buscarProdutos();  
  }

  pesquisar() {
    if (this.searchValue) {
      this.produtoService.buscarFiltro(this.searchValue).subscribe(
        response => {          
          this.produtos = response; 
          this.page = 0;
          this.totalElements = this.produtos.length;  
        },
        error => {
          this.showError('Erro ao pesquisar');
        }
      );
    } else {
      this.showError('Informe um valor para a pesquisa');
    }
  }

  buscarProdutos() {
    this.produtoService.buscarTodos(this.page, this.pageSize).subscribe(response => {
      this.produtos = response.content;
      this.totalElements = response.totalElements;     
    },
      error => {
        this.showError('Erro ao carregar dados!');
      }
    );
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
          this.toastr.error('Erro ao atualizar o produto: ' + error.status + ' - ' + error.message);
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
        this.toastr.success('Produto excluído com sucesso!');
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

  changePage(page: number) {
    this.page = page;
    this.buscarProdutos();
  }

  changePageSize(pageSize: number) {
    this.page = 0;
    this.pageSize = pageSize;
    this.buscarProdutos();
  }

  getPageIndexes(): number[] {
    const totalPages = Math.ceil(this.totalElements / this.pageSize);
    return Array.from({ length: totalPages }, (_, index) => index);
  }

  showError(message: string): void {
    this.toastr.error(message);
  }
}
