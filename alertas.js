import fs from "fs-extra";

/**
 * Calcula a diferença de dias entre hoje e uma data futura ou passada.
 * @param {string} dateString - A data no formato 'YYYY-MM-DD'.
 * @returns {number}
 */
function getDaysUntil(dateString) {
  const now = new Date();
  const targetDate = new Date(`${dateString}T00:00:00`);
  now.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  return Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24));
}

/**
 * ALERTA INDIVIDUAL – CNH
 */
export function alertaCNH(dataValidade) {
  const daysLeft = getDaysUntil(dataValidade);

  if (daysLeft > 60)
    return `✅ CNH: Sua habilitação está em dia e vence em ${daysLeft} dias.`;

  if (daysLeft > 30)
    return `🗓️ CNH: Sua habilitação vence em ${daysLeft} dias.`;

  if (daysLeft >= 0)
    return `🔔 CNH: Atenção! Sua habilitação vence em ${daysLeft} dias.`;

  if (daysLeft >= -30) {
    const tolerance = 30 + daysLeft;
    return `❗ CNH: VENCIDA! Você ainda pode dirigir por ${tolerance} dias.`;
  }

  return `🚨 CNH: Vencida há mais de 30 dias. Não pode dirigir!`;
}

/**
 * ALERTA INDIVIDUAL – IPVA
 */
export function alertaIPVA(dataVencimento) {
  const daysLeft = getDaysUntil(dataVencimento);

  if (daysLeft > 30)
    return `🗓️ IPVA: Vence em ${daysLeft} dias.`;

  if (daysLeft > 0)
    return `🔔 IPVA: Faltam ${daysLeft} dias para o vencimento.`;

  if (daysLeft === 0)
    return `❗ IPVA: Vence HOJE!`;

  return `🚨 IPVA: Vencido há ${Math.abs(daysLeft)} dias.`;
}

/**
 * ALERTA INDIVIDUAL – RODÍZIO
 */
export function alertaRodizio(placa) {
  if (!placa || typeof placa !== "string")
    return "Placa inválida.";

  const lastDigit = placa.slice(-1);
  const today = new Date().getDay();

  const rules = {
    1: ['1','2'], // segunda
    2: ['3','4'], // terça
    3: ['5','6'], // quarta
    4: ['7','8'], // quinta
    5: ['9','0'], // sexta
  };

  if (today === 0 || today === 6)
    return `Rodízio liberado! Fim de semana.`;

  if (rules[today]?.includes(lastDigit))
    return `❌ Hoje há rodízio para placa final ${lastDigit}.`;

  return `✅ Hoje não é rodízio para sua placa (${lastDigit}).`;
}

/**
 * Carrega banco local
 */
function loadDB() {
  try {
    return fs.readJsonSync("./praxidb.json");
  } catch {
    return { usuarios: [] };
  }
}

/**
 * LISTA COMPLETA DE ALERTAS — usado pelo whatsapp.js
 */
export function getAlertasCNH() {
  const db = loadDB();
  return db.usuarios
    .filter(u => u.cnhValidade)
    .map(u => ({
      phone: u.phone,
      message: alertaCNH(u.cnhValidade)
    }));
}

export function getAlertasIPVA() {
  const db = loadDB();
  return db.usuarios
    .filter(u => u.ipva)
    .map(u => ({
      phone: u.phone,
      message: alertaIPVA(u.ipva)
    }));
}

export function getAlertasRodizio() {
  const db = loadDB();
  return db.usuarios
    .filter(u => u.placa)
    .map(u => ({
      phone: u.phone,
      message: alertaRodizio(u.placa)
    }));
}
