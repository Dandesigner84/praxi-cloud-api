import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Rota principal – status da API
app.get('/', (req, res) => {
  res.send('🚀 PRAXI MVP ONLINE');
});

// Rota Webhook
app.post('/webhook', (req, res) => {
  console.log('Webhook recebido:', req.body);
  res.json({ status: 'ok' });
});

// Servidor
app.listen(PORT, () => {
  console.log(`PRAXI Webhook rodando na porta ${PORT}`);
});
