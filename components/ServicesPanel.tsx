
import React from 'react';

const ServiceItem: React.FC<{ name: string; status: 'connected' | 'disconnected'; type: string }> = ({ name, status, type }) => (
  <div className="bg-whatsapp-light p-4 rounded-lg border border-whatsapp-text/10 flex justify-between items-center">
    <div>
        <h3 className="font-semibold text-whatsapp-text">{name}</h3>
        <p className="text-sm text-whatsapp-subtle">{type}</p>
    </div>
    <div className="flex items-center space-x-2">
        <span className={`h-3 w-3 rounded-full ${status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}></span>
        <span className="text-sm capitalize">{status === 'connected' ? 'Conectado' : 'Desconectado'}</span>
    </div>
  </div>
);

const ServicesPanel: React.FC = () => {
  const services = [
    { name: 'Gemini AI Service', status: 'connected', type: 'Análise de Intenção e Geração de Conteúdo' },
    { name: 'WhatsApp Cloud API', status: 'connected', type: 'Gateway de Mensagens' },
    { name: 'Firebase/Firestore', status: 'connected', type: 'Banco de Dados (JSON-like)' },
    { name: 'Node-Cron / Scheduler', status: 'connected', type: 'Serviço de Agendamento de Alertas' },
    { name: 'Cloud Storage (Media)', status: 'connected', type: 'Armazenamento de Áudios e Imagens' },
    { name: 'DETRAN API (Mock)', status: 'disconnected', type: 'Consulta de Dados Veiculares e CNH' },
  ];

  return (
    <div className="p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-whatsapp-text">Serviços Conectados</h2>
      <div className="space-y-4">
        {services.map(service => <ServiceItem key={service.name} {...service} />)}
      </div>
      <p className="text-center text-whatsapp-subtle mt-8 text-sm">
        Este painel representa a pasta <code className="bg-whatsapp-light px-1 rounded">/src/services</code>, que contém módulos para interagir com APIs externas.
      </p>
    </div>
  );
};

export default ServicesPanel;
