# PRAXI-MVP-WHATSAPP (local MVP)

## Requisitos
- Node.js 18+
- Git
- Celular com WhatsApp (para scanner QR quando usar Venom)

## Instalação
1. no terminal:
   npm install

2. rodar o webhook:
   npm run start
   (ou `node server.js`)

3. abrir outro terminal e rodar o venom (conectar WhatsApp):
   npm run whatsapp
   - No primeiro uso irá aparecer QR code no terminal. Escaneie com o WhatsApp do celular de teste.

4. testar:
   - mande "oi" do celular para o número conectado ao WhatsApp Web
   - o bot responderá

## Observações
- Este ambiente é **para desenvolvimento**. Para produção migre para WhatsApp Cloud API (Meta).
- O `praxidb.json` é o banco local inicial.
- O motor AI atual é simples (regra). Posteriormente substituiremos por Gemini / GenAI.
- Alerta (alertas.js) roda manualmente. Podemos agendar com `node-cron` ou cron do sistema.

## Próximos passos
- Construir fluxo de simulado, salvar progresso do aluno no db
- Integrar Envio de Áudios/Links
- Criar painel admin (apenas API) para visualizar atendimentos
- Migrar para WhatsApp Cloud API para produção
