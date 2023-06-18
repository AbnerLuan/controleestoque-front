import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from './components/produto/produto.component';
import { HomeComponent } from './components/home/home.component';
import { VendaComponent } from './components/venda/venda.component';
import { CompraComponent } from './components/compra/compra.component';
import { GastoComponent } from './components/gasto/gasto.component';
import { FiadoComponent } from './components/fiado/fiado.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota para a página Home
  { path: 'produtos', component: ProdutoComponent }, // Rota para a página Produtos
  { path: 'vendas', component: VendaComponent }, // Rota para a página Vendas
  { path: 'compras', component: CompraComponent }, // Rota para a página Compras
 { path: 'gastos', component: GastoComponent }, // Rota para a página Gastos
 { path: 'fiados', component: FiadoComponent }, // Rota para a página Fiado
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
