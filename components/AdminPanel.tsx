import React, { useState, useEffect } from 'react';

interface AdminPanelProps {
  userName: string;
  lastLogin: Date;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ userName, lastLogin }) => {
  const [panelStatus, setPanelStatus] = useState<string>('Online');

  useEffect(() => {
    // Exemplo de lógica para atualizar o status do painel
    const timer = setTimeout(() => {
      setPanelStatus('Ativo');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="admin-panel-container">
      <h1>Bem-vindo, {userName}!</h1>
      <p>Status do Painel: <strong>{panelStatus}</strong></p>
      <p>Último Acesso: {lastLogin.toLocaleString()}</p>

      <section className="dashboard-metrics">
        <h2>Métricas Principais</h2>
        {/* Adicione componentes de métricas aqui */}
        <p>Dados de exemplo...</p>
      </section>

      <footer className="admin-panel-footer">
        <p>&copy; 2023 Praxi Cloud API. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default AdminPanel;
