import { Telefone } from './telefone';


export class Pessoa {
  id?: number;
  nome: string;
  cpf: string;
  idade?: number;
  qtdTels?: number;
  email?: string;
  dataNascimento: Date;
  telefones: Telefone[] = [];
}

