
export type View = 'chat' | 'flows' | 'controllers' | 'services' | 'db' | 'admin';
export type UserType = 'aluno' | 'instrutor' | 'autoescola' | 'parceiro';

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  audioSrc?: string;
  isAudioLoading?: boolean;
}

export interface User {
    id: string;
    phone: string;
    type: UserType;
    nome?: string;
    last_active: string;
    flow_state: string;

    // Aluno
    cpf?: string;
    rg?: string;
    data_nascimento?: string;
    endereco_completo?: string;

    // Instrutor
    credencial_pdf_url?: string;
    foto_perfil_url?: string;
    veiculo?: {
        modelo: string;
        placa: string;
        ano: number;
        opcionais?: string[];
    };
    valor_aula_avulsa?: number;
    valor_pacote_5_aulas?: number;
    valor_pacote_10_aulas?: number;

    // Autoescola
    cnpj?: string;
    nome_fantasia?: string;
    veiculos?: {
        categoria: 'A' | 'B' | 'C' | 'D' | 'E' | 'PCD' | 'A/B';
        modelo: string;
        placa: string;
        ano: number;
    }[];
    valores_cnh?: Record<string, number>;

    // CNH (Aluno e Instrutor)
    cnh?: {
        number: string;
        category: string;
        expires_at: string;
    };
}