import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { HomeComponent } from './components/home/home.component';
import { VendaComponent } from './components/venda/venda.component';
import { ComprasComponent } from './components/compras/compras.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota para a página Home
  { path: 'produtos', component: ProdutosComponent }, // Rota para a página Produtos
  { path: 'vendas', component: VendaComponent }, // Rota para a página Vendas
  { path: 'compras', component: ComprasComponent }, // Rota para a página Compras
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
