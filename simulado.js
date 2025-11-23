
// O banco de perguntas foi expandido para 40 questões, refletindo o padrão da prova teórica oficial do DETRAN.
const bancoDePerguntas = [
    {
        id: "p01",
        pergunta: "A placa 'A-3a' (pista sinuosa à esquerda) adverte para:",
        alternativas: [
            "A) Uma curva única e fechada à esquerda.",
            "B) O início de um trecho com múltiplas curvas, começando pela esquerda.",
            "C) A obrigatoriedade de virar à esquerda à frente.",
            "D) Uma bifurcação na via."
        ],
        correta: 1,
        explicacao: "A placa A-3a adverte para uma 'Pista Sinuosa à Esquerda', indicando uma sequência de 3 ou mais curvas."
    },
    {
        id: "p02",
        pergunta: "Em uma via de trânsito rápido sem sinalização, a velocidade máxima permitida para automóveis é de:",
        alternativas: ["A) 60 km/h", "B) 110 km/h", "C) 80 km/h", "D) 90 km/h"],
        correta: 2,
        explicacao: "Conforme o Art. 61 do CTB, a velocidade máxima em vias de trânsito rápido é de 80 km/h, se não houver sinalização específica."
    },
    {
        id: "p03",
        pergunta: "Imobilizar o veículo na via por falta de combustível é uma infração:",
        alternativas: ["A) Leve, sem multa", "B) Média, com multa e remoção do veículo", "C) Grave, com multa", "D) Gravíssima"],
        correta: 1,
        explicacao: "A 'pane seca' é considerada infração média, sujeita a multa e remoção do veículo para não obstruir o trânsito."
    },
    {
        id: "p04",
        pergunta: "Em caso de aquaplanagem, o condutor deve:",
        alternativas: ["A) Frear bruscamente para retomar o atrito", "B) Acelerar para 'cortar' a lâmina d'água", "C) Virar a direção rapidamente para os lados", "D) Manter o volante firme e reduzir a velocidade gradualmente, sem frear"],
        correta: 3,
        explicacao: "Ao aquaplanar, deve-se tirar o pé do acelerador e segurar o volante com firmeza até que os pneus retomem o contato com a pista."
    },
    {
        id: "p05",
        pergunta: "Qual destes componentes faz parte do sistema de alimentação do motor?",
        alternativas: ["A) Alternador", "B) Radiador", "C) Bomba de injeção", "D) Câmbio"],
        correta: 2,
        explicacao: "A bomba de injeção (ou carburador em modelos mais antigos) é responsável por levar o combustível ao motor."
    },
    {
        id: "p06",
        pergunta: "Ao prestar os primeiros socorros a uma vítima de acidente de trânsito, a atitude mais importante é:",
        alternativas: ["A) Oferecer água para acalmar a vítima", "B) Tentar remover a vítima do veículo imediatamente", "C) Não movimentar a vítima e acionar o serviço de emergência (192 ou 193)", "D) Aplicar um torniquete em qualquer ferimento"],
        correta: 2,
        explicacao: "A regra de ouro dos primeiros socorros no trânsito é não mover a vítima, pois pode agravar lesões na coluna, e chamar socorro especializado."
    },
    {
        id: "p07",
        pergunta: "O uso do pisca-alerta é permitido em que situação?",
        alternativas: ["A) Sob neblina intensa, com o carro em movimento", "B) Em imobilizações de emergência ou com a sinalização da via", "C) Para agradecer outro motorista", "D) Ao estacionar em fila dupla por um minuto"],
        correta: 1,
        explicacao: "O pisca-alerta só deve ser usado com o veículo imobilizado em situação de emergência ou quando a sinalização da via assim determinar."
    },
    {
        id: "p08",
        pergunta: "A sigla CTB significa:",
        alternativas: ["A) Conselho de Trânsito Brasileiro", "B) Código de Trânsito Brasileiro", "C) Central de Tráfego de Brasília", "D) Controle Total de Veículos"],
        correta: 1,
        explicacao: "CTB é a sigla para o Código de Trânsito Brasileiro, a lei que rege o trânsito no Brasil."
    },
    {
        id: "p09",
        pergunta: "Ultrapassar outro veículo pelo acostamento é uma infração:",
        alternativas: ["A) Média", "B) Grave", "C) Leve", "D) Gravíssima (x5)"],
        correta: 3,
        explicacao: "Ultrapassar pelo acostamento é uma manobra de altíssimo risco e, portanto, uma infração gravíssima com multiplicador de 5x no valor da multa."
    },
    {
        id: "p10",
        pergunta: "A placa 'R-1' (octogonal vermelha com a inscrição 'PARE') significa:",
        alternativas: ["A) Parada obrigatória à frente", "B) Dê a preferência", "C) Parada obrigatória no local da placa", "D) Proibido parar e estacionar"],
        correta: 2,
        explicacao: "A placa R-1 indica uma parada obrigatória imediata, antes de entrar na via ou área de cruzamento."
    },
    {
        id: "p11",
        pergunta: "Após o vencimento da CNH, o condutor tem um prazo para regularizar a situação e continuar dirigindo de até:",
        alternativas: ["A) 15 dias", "B) 60 dias", "C) 30 dias", "D) Não há prazo, a condução se torna irregular imediatamente"],
        correta: 2,
        explicacao: "O CTB permite que o condutor dirija por até 30 dias corridos com a CNH vencida enquanto providencia a renovação."
    },
    {
        id: "p12",
        pergunta: "Conduzir motocicleta sem usar capacete com viseira ou óculos de proteção é infração:",
        alternativas: ["A) Média", "B) Grave", "C) Gravíssima, com suspensão do direito de dirigir", "D) Leve"],
        correta: 2,
        explicacao: "Pilotar sem os equipamentos de segurança obrigatórios é uma infração gravíssima que acarreta multa e suspensão da CNH."
    },
    {
        id: "p13",
        pergunta: "O que é o 'ponto cego' de um veículo?",
        alternativas: ["A) O farol quando está queimado", "B) Uma área ao redor do veículo não coberta pelos retrovisores", "C) O freio de mão", "D) O local onde o cinto é afivelado"],
        correta: 1,
        explicacao: "Ponto cego é a faixa de visão obstruída que o motorista tem ao redor do carro, exigindo atenção extra ao mudar de faixa."
    },
    {
        id: "p14",
        pergunta: "Qual a principal função do catalisador no sistema de escapamento?",
        alternativas: ["A) Aumentar a potência do motor", "B) Silenciar o ruído do motor", "C) Converter gases tóxicos em gases menos nocivos", "D) Resfriar os gases de escape"],
        correta: 2,
        explicacao: "O catalisador é um componente essencial para o controle de emissões, transformando gases poluentes em substâncias menos prejudiciais ao meio ambiente."
    },
    {
        id: "p15",
        pergunta: "Em um cruzamento não sinalizado, a preferência de passagem é do veículo que:",
        alternativas: ["A) Estiver mais rápido", "B) Vier pela direita do condutor", "C) For maior", "D) Buzinar primeiro"],
        correta: 1,
        explicacao: "A regra geral de preferência em cruzamentos sem sinalização é para o veículo que se aproxima pela direita."
    },
    {
        id: "p16",
        pergunta: "Manter os pneus corretamente calibrados contribui para:",
        alternativas: ["A) Apenas o conforto dos passageiros", "B) Aumentar o consumo de combustível", "C) A segurança, estabilidade e economia de combustível", "D) Desgastar o motor mais rapidamente"],
        correta: 2,
        explicacao: "A calibragem correta é vital para a segurança, pois afeta a aderência e a frenagem, além de reduzir o consumo de combustível e o desgaste dos pneus."
    },
    {
        id: "p17",
        pergunta: "A faixa de pedestres é um tipo de sinalização:",
        alternativas: ["A) Horizontal", "B) Vertical", "C) Semafórica", "D) Sonora"],
        correta: 0,
        explicacao: "A sinalização horizontal é aquela pintada sobre o pavimento da via, como faixas de pedestres, linhas divisórias e legendas."
    },
    {
        id: "p18",
        pergunta: "A luz amarela intermitente em um semáforo significa:",
        alternativas: ["A) O semáforo está quebrado, siga com cuidado", "B) Permissão para seguir, mas com atenção redobrada", "C) Pare, pois o sinal ficará vermelho", "D) Trânsito impedido"],
        correta: 1,
        explicacao: "A luz amarela intermitente alerta para uma situação que exige cautela, permitindo a passagem com atenção."
    },
    {
        id: "p19",
        pergunta: "Estacionar em vagas reservadas a pessoas com deficiência, sem credencial, é uma infração:",
        alternativas: ["A) Leve", "B) Média", "C) Grave", "D) Gravíssima"],
        correta: 3,
        explicacao: "O desrespeito a vagas reservadas é uma infração gravíssima, sujeita a multa e remoção do veículo."
    },
    {
        id: "p20",
        pergunta: "A distância de seguimento (ou distância de segurança) é definida como:",
        alternativas: ["A) A distância que o veículo percorre depois de acionar os freios até parar", "B) Uma distância fixa de 10 metros de qualquer veículo", "C) A distância que permite ao condutor parar a tempo de evitar uma colisão com o veículo da frente", "D) A distância entre as rodas do veículo"],
        correta: 2,
        explicacao: "Manter uma distância segura do veículo à frente é crucial para ter tempo e espaço para reagir a uma freada brusca ou imprevisto."
    },
    {
        id: "p21",
        pergunta: "O extintor de incêndio do tipo ABC é indicado para quais classes de fogo?",
        alternativas: ["A) Apenas líquidos inflamáveis", "B) Apenas equipamentos elétricos", "C) Materiais sólidos, líquidos inflamáveis e equipamentos elétricos", "D) Apenas materiais sólidos como madeira e papel"],
        correta: 2,
        explicacao: "O extintor ABC é o mais versátil e exigido em veículos, pois combate as três classes mais comuns de incêndio."
    },
    {
        id: "p22",
        pergunta: "A validade da CNH para condutores com idade entre 50 e 69 anos é de:",
        alternativas: ["A) 10 anos", "B) 3 anos", "C) 5 anos", "D) 1 ano"],
        correta: 2,
        explicacao: "De acordo com as novas regras, a renovação da CNH para condutores nessa faixa etária ocorre a cada 5 anos."
    },
    {
        id: "p23",
        pergunta: "O que é um 'condutor defensivo'?",
        alternativas: ["A) Aquele que sempre dirige abaixo da velocidade máxima", "B) Aquele que dirige de forma a evitar acidentes, apesar das ações dos outros e das condições adversas", "C) Aquele que instala muitos equipamentos de segurança no carro", "D) Aquele que só dirige durante o dia"],
        correta: 1,
        explicacao: "Direção defensiva é a postura de antecipar riscos, agindo de forma preventiva para garantir a segurança de todos no trânsito."
    },
    {
        id: "p24",
        pergunta: "Transitar pela contramão em uma via de sentido duplo, exceto para ultrapassagem, é uma infração:",
        alternativas: ["A) Gravíssima", "B) Leve", "C) Média", "D) Grave"],
        correta: 3,
        explicacao: "Trafegar na contramão em vias de mão dupla é uma infração grave, exceto nas situações de ultrapassagem permitidas."
    },
    {
        id: "p25",
        pergunta: "Fumaça preta saindo do escapamento de um veículo a diesel geralmente indica:",
        alternativas: ["A) Motor em perfeito estado", "B) Problema no sistema de arrefecimento", "C) Excesso de combustível na câmara de combustão ou problema nos bicos injetores", "D) Falta de óleo no motor"],
        correta: 2,
        explicacao: "A fumaça preta é um sinal de que a queima de combustível está irregular, geralmente por excesso de diesel, o que aumenta a poluição."
    },
    {
        id: "p26",
        pergunta: "Qual das atitudes abaixo é um dever do cidadão no trânsito?",
        alternativas: ["A) Fiscalizar o trabalho dos agentes de trânsito", "B) Colaborar para a segurança e fluidez do trânsito", "C) Sinalizar apenas as manobras que julgar perigosas", "D) Usar a buzina para apressar o tráfego"],
        correta: 1,
        explicacao: "A cidadania no trânsito envolve o respeito às regras e a colaboração mútua entre motoristas, pedestres e ciclistas para um ambiente mais seguro."
    },
    {
        id: "p27",
        pergunta: "As vias rurais abertas à circulação, não pavimentadas, são chamadas de:",
        alternativas: ["A) Estradas", "B) Rodovias", "C) Vias de trânsito rápido", "D) Vias coletoras"],
        correta: 0,
        explicacao: "O CTB classifica as vias rurais em Rodovias (pavimentadas) e Estradas (não pavimentadas)."
    },
    {
        id: "p28",
        pergunta: "O condutor que for pego disputando corrida ('racha') comete uma infração:",
        alternativas: ["A) Grave, com remoção do veículo", "B) Gravíssima, com multa (x10), suspensão da CNH e remoção do veículo", "C) Média, apenas com multa", "D) Leve, se não houver acidente"],
        correta: 1,
        explicacao: "Disputar corrida é uma das infrações mais perigosas, sendo punida com extremo rigor pelo CTB para coibir essa prática."
    },
    {
        id: "p29",
        pergunta: "A Junta Administrativa de Recursos de Infrações (JARI) é o órgão responsável por julgar:",
        alternativas: ["A) Apenas crimes de trânsito", "B) Os recursos contra as penalidades de trânsito", "C) A formação de novos condutores", "D) A sinalização das vias"],
        correta: 1,
        explicacao: "A JARI é a primeira instância para onde o condutor pode recorrer de uma multa de trânsito com a qual não concorda."
    },
    {
        id: "p30",
        pergunta: "O que o condutor deve fazer ao perceber um declive acentuado na via?",
        alternativas: ["A) Descer com o veículo desengrenado ('na banguela') para economizar combustível", "B) Manter o veículo engrenado em uma marcha forte (reduzida) para usar o freio-motor", "C) Acelerar para passar pelo trecho rapidamente", "D) Pisar na embreagem e controlar apenas no freio"],
        correta: 1,
        explicacao: "Usar o freio-motor (marcha reduzida) em declives poupa os freios do veículo, evita o superaquecimento e garante mais segurança e controle."
    },
    {
        id: "p31",
        pergunta: "Qual é a penalidade para o condutor que se recusa a fazer o teste do etilômetro (bafômetro)?",
        alternativas: [
            "A) Apenas uma advertência por escrito.",
            "B) Multa grave e retenção do veículo.",
            "C) Multa (x10), suspensão do direito de dirigir por 12 meses e remoção do veículo.",
            "D) Multa leve."
        ],
        correta: 2,
        explicacao: "A recusa ao teste do bafômetro é uma infração gravíssima com as mesmas penalidades de dirigir sob efeito de álcool."
    },
    {
        id: "p32",
        pergunta: "A placa de advertência 'A-21b' (estreitamento de pista ao centro) indica que:",
        alternativas: [
            "A) A via passará a ter mão única.",
            "B) Haverá uma ponte estreita à frente.",
            "C) A pista se estreita em ambos os lados.",
            "D) Apenas a faixa da esquerda será eliminada."
        ],
        correta: 2,
        explicacao: "A placa A-21b adverte sobre o estreitamento da pista dos dois lados, exigindo que os condutores reduzam a velocidade e ajustem seu posicionamento."
    },
    {
        id: "p33",
        pergunta: "Ao dirigir sob chuva intensa, qual procedimento aumenta a segurança?",
        alternativas: [
            "A) Ligar o pisca-alerta e manter a velocidade da via.",
            "B) Aumentar a distância do veículo à frente e acender o farol baixo.",
            "C) Frear constantemente para manter os freios secos.",
            "D) Dirigir pelo acostamento."
        ],
        correta: 1,
        explicacao: "Sob chuva, a visibilidade e a aderência diminuem. É essencial aumentar a distância de seguimento e usar o farol baixo para ver e ser visto."
    },
    {
        id: "p34",
        pergunta: "Ao encontrar um motociclista acidentado, qual é a primeira ação a NÃO se tomar?",
        alternativas: [
            "A) Sinalizar o local para evitar novos acidentes.",
            "B) Chamar o serviço de emergência (193 - Bombeiros).",
            "C) Tentar remover o capacete da vítima.",
            "D) Verificar se a vítima está consciente e respirando."
        ],
        correta: 2,
        explicacao: "A remoção do capacete só deve ser feita por equipe de socorro especializada, pois um movimento incorreto pode causar uma lesão fatal na coluna cervical."
    },
    {
        id: "p35",
        pergunta: "O sistema que tem a função de absorver os impactos da pista e garantir o conforto e estabilidade do veículo é o de:",
        alternativas: [
            "A) Transmissão.",
            "B) Freios.",
            "C) Direção.",
            "D) Suspensão."
        ],
        correta: 3,
        explicacao: "O sistema de suspensão, composto por molas e amortecedores, é responsável por manter o contato dos pneus com o solo e absorver as irregularidades."
    },
    {
        id: "p36",
        pergunta: "A emissão de monóxido de carbono (CO), um gás invisível e inodoro liberado pela queima incompleta de combustível, é perigosa porque:",
        alternativas: [
            "A) Causa o efeito estufa.",
            "B) Destrói a camada de ozônio.",
            "C) É altamente tóxico para os seres vivos, podendo levar à morte.",
            "D) Causa chuva ácida."
        ],
        correta: 2,
        explicacao: "O monóxido de carbono é extremamente perigoso para a saúde, pois interfere no transporte de oxigênio no sangue quando inalado."
    },
    {
        id: "p37",
        pergunta: "Transportar criança menor de 10 anos que ainda não atingiu 1,45 m de altura no banco dianteiro do veículo é uma infração:",
        alternativas: [
            "A) Leve, com advertência.",
            "B) Gravíssima, com multa e retenção do veículo.",
            "C) Média, com multa.",
            "D) Grave, com multa."
        ],
        correta: 1,
        explicacao: "A legislação de trânsito é rigorosa quanto ao transporte de crianças. Transportá-las fora das normas de segurança é infração gravíssima."
    },
    {
        id: "p38",
        pergunta: "O que é 'distância de reação'?",
        alternativas: [
            "A) A distância que o veículo percorre desde o momento em que o freio é acionado até a parada total.",
            "B) A soma da distância de reação com a distância de frenagem.",
            "C) A distância que o veículo percorre desde o momento em que o condutor vê o perigo até o momento em que pisa no freio.",
            "D) A distância entre os eixos do veículo."
        ],
        correta: 2,
        explicacao: "A distância de reação é o espaço percorrido no tempo em que o cérebro processa o perigo e envia o comando para agir."
    },
    {
        id: "p39",
        pergunta: "As marcas longitudinais na cor amarela, pintadas no centro da via, indicam que:",
        alternativas: [
            "A) A via é de sentido único.",
            "B) É uma área de ciclovia.",
            "C) A via é de sentido duplo (mão e contramão).",
            "D) É uma área de estacionamento."
        ],
        correta: 2,
        explicacao: "A cor amarela na sinalização horizontal é usada para separar fluxos de tráfego em sentidos opostos. A cor branca separa fluxos no mesmo sentido."
    },
    {
        id: "p40",
        pergunta: "O condutor que demonstra respeito e cortesia no trânsito, dando passagem e sendo paciente, está praticando:",
        alternativas: [
            "A) Direção perigosa.",
            "B) Cidadania e direção defensiva.",
            "C) Apenas o que a lei obriga.",
            "D) Imprudência."
        ],
        correta: 1,
        explicacao: "A boa convivência no trânsito vai além das regras, envolvendo atitudes de cidadania, empatia e respeito aos demais usuários da via."
    }
];


/**
 * Inicia um novo simulado, retornando 40 questões aleatórias.
 * @returns {Array} Um array com 40 objetos de pergunta.
 */
export function getSimulado() {
  const shuffled = bancoDePerguntas.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 40);
}

/**
 * Corrige um conjunto de respostas de um simulado.
 * A aprovação requer no mínimo 28 acertos (70% de 40).
 * @param {Array<{perguntaId: string, respostaIndex: number}>} respostasUsuario - As respostas do usuário.
 * @returns {{acertos: number, erros: number, total: number, aprovado: boolean, feedback: Array}} Resultado do simulado.
 */
export function corrigirSimulado(respostasUsuario) {
  let acertos = 0;
  const feedback = [];

  respostasUsuario.forEach(({ perguntaId, respostaIndex }) => {
    const pergunta = bancoDePerguntas.find(p => p.id === perguntaId);
    if (pergunta) {
      if (pergunta.correta === respostaIndex) {
        acertos++;
        feedback.push({ perguntaId, status: 'correta', explicacao: "Parabéns, resposta certa!" });
      } else {
        const letraCorreta = pergunta.alternativas[pergunta.correta].substring(0, 1);
        feedback.push({ 
            perguntaId, 
            status: 'errada', 
            explicacao: pergunta.explicacao,
            respostaCorreta: `A resposta correta era a alternativa ${letraCorreta}.`
        });
      }
    }
  });

  const total = respostasUsuario.length;
  const erros = total - acertos;
  const aprovado = acertos >= 28;

  return { acertos, erros, total, aprovado, feedback };
}

// --- Funções Legadas para Retrocompatibilidade ---

// Exporta o banco de perguntas para uso externo, se necessário.
export const perguntas = bancoDePerguntas;

/**
 * Retorna uma pergunta aleatória da lista para interações simples.
 * @returns {object} Uma das perguntas do banco.
 */
export function getPergunta() {
  const randomIndex = Math.floor(Math.random() * perguntas.length);
  return perguntas[randomIndex];
}

/**
 * Corrige uma única resposta com base no ID da pergunta e no índice da alternativa.
 * @param {string} perguntaId - O ID da pergunta (ex: "p01").
 * @param {number} respostaIndex - O índice da alternativa escolhida (0, 1, 2...).
 * @returns {{acertou: boolean, explicacao: string}} - O resultado da correção.
 */
export function corrigirResposta(perguntaId, respostaIndex) {
  const pergunta = perguntas.find(p => p.id === perguntaId);
  if (!pergunta) {
    return {
      acertou: false,
      explicacao: "Pergunta não encontrada."
    };
  }
  
  const acertou = pergunta.correta === respostaIndex;
  return {
    acertou,
    explicacao: acertou ? "Resposta correta!" : pergunta.explicacao
  };
}
