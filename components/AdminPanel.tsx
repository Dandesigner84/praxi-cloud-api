
import React from 'react';

const Card: React.FC<{ title: string; value: string; change?: string; changeType?: 'up' | 'down' }> = ({ title, value, change, changeType }) => (
  <div className="bg-whatsapp-light p-4 rounded-lg border border-whatsapp-text/10">
    <h3 className="text-sm font-medium text-whatsapp-subtle">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
    {change && (
      <p className={`text-xs mt-1 flex items-center ${changeType === 'up' ? 'text-green-400' : 'text-red-400'}`}>
        {changeType === 'up' ? '▲' : '▼'} {change} vs semana passada
      </p>
    )}
  </div>
);

const DocumentAlert: React.FC<{ user: string; doc: string; daysLeft: number }> = ({ user, doc, daysLeft }) => (
    <div className="flex items-center justify-between p-3 bg-whatsapp-light/50 rounded-md">
        <div>
            <p className="font-mono text-sm">{user}</p>
            <p className="text-xs text-whatsapp-subtle">{doc}</p>
        </div>
        <span className="font-bold text-orange-400">{daysLeft} dias</span>
    </div>
)

const AdminPanel: React.FC = () => {
  return (
    <div className="p-6 h-full overflow-y-auto text-whatsapp-text">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card title="Alunos Estudando" value="1,284" change="12%" changeType="up" />
        <Card title="Simulados Realizados" value="5,821" change="25%" changeType="up" />
        <Card title="Taxa de Aprovação" value="78%" change="3%" changeType="down" />
        <Card title="Interações Totais" value="45,980" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Análise Emocional */}
        <div className="lg:col-span-1 bg-whatsapp-light p-4 rounded-lg border border-whatsapp-text/10">
          <h3 className="font-semibold mb-4">Análise Emocional (Alunos)</h3>
          <div className="space-y-3">
              <div className="flex items-center">
                  <span className="w-28 text-sm text-whatsapp-subtle">Confiante</span>
                  <div className="w-full bg-whatsapp-dark rounded-full h-4">
                      <div className="bg-green-500 h-4 rounded-full" style={{width: '65%'}}></div>
                  </div>
                   <span className="w-12 text-right text-sm font-bold">65%</span>
              </div>
               <div className="flex items-center">
                  <span className="w-28 text-sm text-whatsapp-subtle">Ansioso</span>
                  <div className="w-full bg-whatsapp-dark rounded-full h-4">
                      <div className="bg-yellow-500 h-4 rounded-full" style={{width: '25%'}}></div>
                  </div>
                   <span className="w-12 text-right text-sm font-bold">25%</span>
              </div>
               <div className="flex items-center">
                  <span className="w-28 text-sm text-whatsapp-subtle">Neutro</span>
                  <div className="w-full bg-whatsapp-dark rounded-full h-4">
                      <div className="bg-gray-500 h-4 rounded-full" style={{width: '10%'}}></div>
                  </div>
                   <span className="w-12 text-right text-sm font-bold">10%</span>
              </div>
          </div>
          <p className="text-xs text-whatsapp-subtle mt-4 text-center">Baseado na análise de sentimento das mensagens trocadas.</p>
        </div>

        {/* Alertas de Documentos */}
        <div className="lg:col-span-2 bg-whatsapp-light p-4 rounded-lg border border-whatsapp-text/10">
           <h3 className="font-semibold mb-4">Alertas: Documentos Próximos do Vencimento</h3>
           <div className="space-y-2">
            <DocumentAlert user="+55 11 9XXXX-1234" doc="Vencimento CNH" daysLeft={15} />
            <DocumentAlert user="+55 21 9XXXX-5678" doc="IPVA Parcela 3/3" daysLeft={5} />
            <DocumentAlert user="+55 81 9XXXX-9012" doc="Exame Toxicológico" daysLeft={28} />
           </div>
        </div>
      </div>
       <p className="text-center text-whatsapp-subtle mt-8 text-sm">
        Este painel representa a visão do administrador, com relatórios e KPIs da plataforma.
      </p>
    </div>
  );
};

export default AdminPanel;
