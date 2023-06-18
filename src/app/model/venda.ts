import { ItemPedido } from "./itempedido";

export interface Venda {
    vendaId: number;    
    nomeCliente: string;
    canalVenda: string;
    valorFrete: number;
    valorTarifa: number;
    valorTotalVenda: number;
    dataVenda: string,
    itens: ItemPedido[];
  }