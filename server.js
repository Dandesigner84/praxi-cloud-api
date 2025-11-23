import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('Webhook recebido:', req.body);
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`PRAXI Webhook rodando na porta ${PORT}`);
});
