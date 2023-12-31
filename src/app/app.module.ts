import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { HomeComponent } from './components/home/home.component';
import { VendaComponent } from './components/venda/venda.component';
import { CompraComponent } from './components/compra/compra.component';
import { PaginacaoComponent } from './components/paginacao/paginacao.component';
import { GastoComponent } from './components/gasto/gasto.component';
import { CommonModule } from '@angular/common';
import { FiadoComponent } from './components/fiado/fiado.component';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { CaixaComponent } from './components/caixa/caixa.component';
import { PaginaclienteComponent } from './components/fiado/paginacliente/paginacliente.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerService } from './service/spinner.service';

registerLocaleData(ptBr);

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
    FiadoComponent,
    ChartComponent,
    CaixaComponent,
    PaginaclienteComponent,
    LoginComponent,
    SpinnerComponent
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
    NgbModule,
    CommonModule,
    NgxMaskDirective, 
    NgxMaskPipe, 
    NgChartsModule,
  ],
  providers: [
    AuthInterceptorProvider,
    SpinnerService,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    provideEnvironmentNgxMask()
  ],   
    
  bootstrap: [AppComponent]
})
export class AppModule { }
