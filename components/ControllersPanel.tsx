
import React from 'react';

const ControllerItem: React.FC<{ name: string; purpose: string; }> = ({ name, purpose }) => (
  <div className="flex items-center space-x-4 bg-whatsapp-light p-4 rounded-lg border border-whatsapp-text/10">
     <div className="flex-shrink-0 bg-whatsapp-chat p-2 rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-whatsapp-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
    </div>
    <div>
      <h3 className="font-mono text-whatsapp-text">{name}.js</h3>
      <p className="text-sm text-whatsapp-subtle">{purpose}</p>
    </div>
  </div>
);

const ControllersPanel: React.FC = () => {
  const controllers = [
    { name: 'webhookController', purpose: 'Valida e processa webhooks da WhatsApp Cloud API.' },
    { name: 'intentController', purpose: 'Usa a Gemini AI para analisar a intenção do usuário (ex: "estudar", "cadastrar CNH").' },
    { name: 'cnhTestController', purpose: 'Gerencia o estado do simulado de prova para cada aluno.' },
    { name: 'documentAlertController', purpose: 'Controla a lógica de agendamento e envio de alertas de documentos.' },
    { name: 'userProfileController', purpose: 'Gerencia os perfis de usuários (alunos, motoristas, etc.).' },
  ];

  return (
    <div className="p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-whatsapp-text">Controllers Lógicos</h2>
      <div className="space-y-4">
        {controllers.map(controller => <ControllerItem key={controller.name} {...controller} />)}
      </div>
       <p className="text-center text-whatsapp-subtle mt-8 text-sm">
        Este painel representa a pasta <code className="bg-whatsapp-light px-1 rounded">/src/controllers</code>, contendo a lógica de negócio principal.
      </p>
    </div>
  );
};

export default ControllersPanel;
