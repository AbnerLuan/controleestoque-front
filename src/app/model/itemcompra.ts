import { Compra } from "./compra";
import { Produto } from "./produto";

export interface ItemCompra {
  itemCompraId?: number;
  compra?: Compra; 
  nomeProduto: string;
  quantidade: number;
  valorUnit: number;
  valorTotalItem: number;

  }