import { ItemCompra } from "./itemcompra";

export interface Compra {
    compraId: number;    
    nomeFornecedor: string;
    valorTotalCompra: number;
    dataCompra: Date;    
    itensCompra: ItemCompra[];
  }