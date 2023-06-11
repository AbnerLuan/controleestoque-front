import { Produto } from "./produto";
import { Venda } from "./venda";

export interface ItemPedido {
  itemId?: number;
  produto?: Produto;
  nomeProduto?: string;
  venda?: Venda;
  quantidade: number;
  valorUnit: number;
  valorTotalItem?: number;
}