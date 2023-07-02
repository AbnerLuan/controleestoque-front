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
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'fiado/:celularCliente', component: PaginaclienteComponent },

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'produtos', component: ProdutoComponent, canActivate: [AuthGuard] },
  { path: 'vendas', component: VendaComponent, canActivate: [AuthGuard] },
  { path: 'compras', component: CompraComponent, canActivate: [AuthGuard] },
  { path: 'gastos', component: GastoComponent, canActivate: [AuthGuard] },
  { path: 'fiados', component: FiadoComponent, canActivate: [AuthGuard] },
  { path: 'caixa', component: CaixaComponent, canActivate: [AuthGuard] },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
