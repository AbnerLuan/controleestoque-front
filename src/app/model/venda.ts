import { ItemPedido } from "./itempedido";

export interface Venda {
    vendaId: number;    
    nomeCliente: string;
    canalVenda: string;
    valorTotalVenda: number;
    dataVenda: string,
    itens: ItemPedido[];
  }