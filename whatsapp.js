import venom from "venom-bot";
import fs from "fs-extra";
import { getPergunta } from "./simulado.js";
import { getAlertasCNH, getAlertasIPVA, getAlertasRodizio } from "./alertas.js";

// Carrega o banco de dados local
function loadDB() {
  try {
    return fs.readJsonSync("./praxidb.json");
  } catch (error) {
    console.error("Erro ao carregar praxidb.json:", error);
    return { usuarios: [], aulas: [], parceiros: [], autoescolas: [], simulado: [] };
  }
}

venom
  .create({
    session: "PRAXI-MVP",
    multidevice: false,

    // ⚠️ CORREÇÃO IMPORTANTE:
    headless: false, // evita o erro do Chrome 142+
    browserArgs: [
      "--disable-gpu",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--headless=new" // se quiser rodar em headless, agora precisa ser "new"
    ],
  })
  .then((client) => start(client))
  .catch((err) => console.log("ERRO AO INICIAR VENOM:", err));

function start(client) {
  console.log("Venom client iniciado.");

  client.onMessage(async (msg) => {
    if (msg.isGroupMsg) return;

    try {
      const command = (msg.body || "").toLowerCase().trim();
      const userPhone = msg.from;

      switch (command) {
        case "simulado": {
          const { pergunta, alternativas } = getPergunta();
          const formattedQuestion =
            `Vamos começar seu simulado! 🚀\n\n*${pergunta}*\n\n` +
            `${alternativas.join("\n")}\n\nResponda com a letra da alternativa.`;
          await client.sendText(userPhone, formattedQuestion);
          break;
        }

        case "alertas": {
          const userCnhAlerts = getAlertasCNH().filter(a => a.phone === userPhone);
          const userIpvaAlerts = getAlertasIPVA().filter(a => a.phone === userPhone);
          const userRodizioAlerts = getAlertasRodizio().filter(a => a.phone === userPhone);

          const alertMessages = [
            ...userCnhAlerts.map(a => `- *CNH:* ${a.message}`),
            ...userIpvaAlerts.map(a => `- *IPVA:* ${a.message}`),
            ...userRodizioAlerts.map(a => `- *Rodízio:* ${a.message}`)
          ];

          if (alertMessages.length > 0) {
            await client.sendText(userPhone, `🔔 *Seus Alertas PRAXI:*\n\n${alertMessages.join("\n")}`);
          } else {
            await client.sendText(userPhone, "Você não possui nenhum alerta no momento. 👍");
          }

          break;
        }

        case "menu": {
          const menuText = `*MENU PRAXI* 🚗\n\n` +
            `Olá! Sou sua assistente virtual. Escolha uma opção:\n\n` +
            `1️⃣ *Simulado*\n` +
            `2️⃣ *Alertas*\n` +
            `3️⃣ *Ajuda*`;
          await client.sendText(userPhone, menuText);
          break;
        }

        default: {
          await client.sendText(
            userPhone,
            'Olá! Eu sou a PRAXI. 👋 Digite *menu* para ver o que posso fazer por você.'
          );
          break;
        }
      }

    } catch (err) {
      console.error("Erro ao processar mensagem:", err?.message || err);
      await client.sendText(msg.from, "Ops! Ocorreu um erro interno. Tente novamente em instantes.");
    }
  });
}
