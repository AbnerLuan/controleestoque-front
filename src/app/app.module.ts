import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { HomeComponent } from './components/home/home.component';
import { VendaComponent } from './components/venda/venda.component';
import { CompraComponent } from './components/compra/compra.component';
import { PaginacaoComponent } from './components/paginacao/paginacao.component';
import { GastoComponent } from './components/gasto/gasto.component';
import { FiadoComponent } from './components/fiado/fiado.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProdutoComponent,
    HomeComponent,
    VendaComponent,
    CompraComponent,
    PaginacaoComponent,
    GastoComponent,
    FiadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
