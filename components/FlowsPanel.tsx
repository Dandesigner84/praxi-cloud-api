
import React from 'react';

const FlowItem: React.FC<{ name: string; description: string; isActive: boolean }> = ({ name, description, isActive }) => (
  <div className="bg-whatsapp-light p-4 rounded-lg border border-whatsapp-text/10">
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-whatsapp-teal">{name}</h3>
      <span className={`px-2 py-1 text-xs rounded-full ${isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
        {isActive ? 'Ativo' : 'Inativo'}
      </span>
    </div>
    <p className="text-sm text-whatsapp-subtle mt-2">{description}</p>
  </div>
);

const FlowsPanel: React.FC = () => {
  const flows = [
    { name: 'OnboardingFlow', description: 'Identifica o perfil do novo usuário (Aluno, Instrutor, Autoescola, Parceiro) e inicia o fluxo de conversa apropriado.', isActive: true },
    { name: 'AlunoServicosFlow', description: 'Ajuda alunos a encontrar aulas e serviços. Inclui um fluxo de cadastro detalhado para novos alunos.', isActive: true },
    { name: 'InstrutorCadastroFlow', description: 'Permite que instrutores se cadastrem com dados completos (documentos, veículo, endereço, preços) e gerenciem sua disponibilidade.', isActive: true },
    { name: 'AutoescolaParceiroFlow', description: 'Fluxo para autoescolas e outros parceiros se cadastrarem, informando CNPJ, frota e tabela de preços.', isActive: true },
    { name: 'ProfessorPraxiFlow', description: 'Aplica um simulado da prova teórica do DETRAN quando o usuário pede para "estudar".', isActive: true },
    { name: 'AlertasAutomaticosFlow', description: 'Monitora e envia alertas sobre vencimento de CNH, IPVA e rodízio.', isActive: false },
  ];

  return (
    <div className="p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-whatsapp-text">Fluxos de Conversa</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flows.map(flow => <FlowItem key={flow.name} {...flow} />)}
      </div>
      <p className="text-center text-whatsapp-subtle mt-8 text-sm">
        Este painel representa a pasta <code className="bg-whatsapp-light px-1 rounded">/src/flows</code>, onde a lógica para cada caminho de conversa é definida.
      </p>
    </div>
  );
};

export default FlowsPanel;