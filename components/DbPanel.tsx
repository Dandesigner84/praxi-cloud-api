
import React from 'react';
import type { User } from '../types';

const users: User[] = [
  { 
    id: 'usr_1', 
    phone: '+55 11 98765-4321', 
    type: 'aluno',
    nome: 'Ana Silva',
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    data_nascimento: '1998-05-15',
    endereco_completo: 'Rua das Flores, 123, São Paulo, SP',
    cnh: undefined,
    last_active: '2024-07-29 11:30', 
    flow_state: 'AlunoCadastroFlow:awaiting_address',
  },
  { 
    id: 'usr_2', 
    phone: '+55 21 91234-5678', 
    type: 'instrutor', 
    nome: 'Marcos Andrade',
    endereco_completo: 'Av. Copacabana, 456, Rio de Janeiro, RJ',
    cnh: { number: '01234567890', category: 'D', expires_at: '2026-05-20' },
    veiculo: { modelo: 'Fiat Mobi', placa: 'RJA1B23', ano: 2022, opcionais: ['Ar Condicionado', 'Direção Hidráulica'] },
    valor_aula_avulsa: 75.00,
    valor_pacote_5_aulas: 350.00,
    valor_pacote_10_aulas: 650.00,
    last_active: '2024-07-29 10:15', 
    flow_state: 'InstrutorProfile:active',
  },
  { 
    id: 'usr_3', 
    phone: '+55 81 95555-4444', 
    type: 'aluno', 
    nome: 'Carlos Souza',
    last_active: '2024-07-28 19:00', 
    flow_state: 'ProfessorPraxiFlow:question_3',
  },
   { 
    id: 'usr_4', 
    phone: '+55 51 99999-0000', 
    type: 'autoescola', 
    nome_fantasia: 'CFC Elite',
    cnpj: '12.345.678/0001-99',
    endereco_completo: 'Rua dos Andradas, 1000, Porto Alegre, RS',
    veiculos: [
      { categoria: 'B', modelo: 'VW Gol', placa: 'POA1A22', ano: 2023 },
      { categoria: 'A', modelo: 'Honda CG 160', placa: 'POA2B33', ano: 2024 }
    ],
    valores_cnh: { 'A': 1500, 'B': 2500, 'A/B': 3800 },
    last_active: '2024-07-29 09:45', 
    flow_state: 'IDLE',
  },
];

const DbPanel: React.FC = () => {
  const renderUserDetails = (user: User) => {
    switch (user.type) {
        case 'aluno':
            return (
                <>
                    {user.cpf && <div>CPF: {user.cpf}</div>}
                    {user.endereco_completo && <div>Endereço: {user.endereco_completo}</div>}
                </>
            );
        case 'instrutor':
            return (
                <>
                    {user.veiculo && <div>Veículo: {user.veiculo.modelo} ({user.veiculo.ano})</div>}
                    {user.valor_aula_avulsa && <div>Aula: R$ {user.valor_aula_avulsa.toFixed(2)}</div>}
                </>
            )
        case 'autoescola':
             return (
                <>
                    {user.cnpj && <div>CNPJ: {user.cnpj}</div>}
                    {user.veiculos && <div>Frota: {user.veiculos.length} veículos</div>}
                </>
            )
        default:
            return null;
    }
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-whatsapp-text">Visualizador de Banco de Dados (Mock)</h2>
      <div className="bg-whatsapp-light rounded-lg overflow-hidden border border-whatsapp-text/10">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-whatsapp-chat/30">
                <tr>
                <th className="p-3 font-semibold">User ID</th>
                <th className="p-3 font-semibold">Nome / Contato</th>
                <th className="p-3 font-semibold">Perfil</th>
                <th className="p-3 font-semibold">Dados Adicionais</th>
                <th className="p-3 font-semibold">Última Atividade</th>
                <th className="p-3 font-semibold">Estado Atual do Flow</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                <tr key={user.id} className={`${index % 2 === 0 ? 'bg-whatsapp-light/50' : 'bg-whatsapp-light/80'} border-t border-whatsapp-text/10`}>
                    <td className="p-3 font-mono text-whatsapp-subtle">{user.id}</td>
                    <td className="p-3">
                        <div>{user.nome || user.nome_fantasia || '-'}</div>
                        <div className="font-mono text-xs text-whatsapp-subtle">{user.phone}</div>
                    </td>
                    <td className="p-3 capitalize">{user.type}</td>
                    <td className="p-3 font-mono text-xs">
                       {renderUserDetails(user)}
                    </td>
                    <td className="p-3">{user.last_active}</td>
                    <td className="p-3 font-mono text-whatsapp-teal">{user.flow_state}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
      <p className="text-center text-whatsapp-subtle mt-8 text-sm">
        Este painel representa a pasta <code className="bg-whatsapp-light px-1 rounded">/src/db</code>, que conteria a conexão com o banco, schema e lógica de queries.
      </p>
    </div>
  );
};

export default DbPanel;