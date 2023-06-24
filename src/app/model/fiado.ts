import { Pagamento } from "./pagamento";

export interface Fiado {
    fiadoId: number;
    nomeCliente: string;
    celularCliente: string;
    valorTotal: number;
    valorPendente: number;
    dataRegistro: Date;
    observacoes: string;  
    pagamento: Pagamento[];
  }
  