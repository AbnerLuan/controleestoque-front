import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from './components/produto/produto.component';
import { HomeComponent } from './components/home/home.component';
import { VendaComponent } from './components/venda/venda.component';
import { CompraComponent } from './components/compra/compra.component';
import { GastoComponent } from './components/gasto/gasto.component';
import { FiadoComponent } from './components/fiado/fiado.component';
import { CaixaComponent } from './components/caixa/caixa.component';
import { PaginaclienteComponent } from './components/fiado/paginacliente/paginacliente.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'produtos', component: ProdutoComponent }, 
  { path: 'vendas', component: VendaComponent }, 
  { path: 'compras', component: CompraComponent },
 { path: 'gastos', component: GastoComponent }, 
 { path: 'fiados', component: FiadoComponent }, 
 { path: 'caixa', component: CaixaComponent }, 
 { path: 'fiado/:celularCliente', component: PaginaclienteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
