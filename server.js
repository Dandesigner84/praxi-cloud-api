import express from 'express';

const app = express();

// Variáveis de ambiente da Render/Vercel
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const META_WHATSAPP_TOKEN = process.env.META_WHATSAPP_TOKEN;

// Porta dinâmica da Render
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET — Verificação do Webhook da Meta
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    console.log("Webhook verificado com sucesso!");
    return res.status(200).send(challenge);
  } else {
    console.log("Falha na verificação do Webhook.");
    return res.sendStatus(403);
  }
});

// POST — Recebe mensagens enviadas pelo WhatsApp
app.post('/webhook', (req, res) => {
  console.log("🔔 Webhook recebido:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 PRAXI Webhook rodando na porta ${PORT}`);
});
