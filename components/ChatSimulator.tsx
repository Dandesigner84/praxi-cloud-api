
import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';
import { generateBotResponse, generateNarration } from '../services/geminiService';
import { pcmToWavDataUrl } from '../utils/audioUtils';

type View = 'chat' | 'map' | 'payment' | 'enRoute' | 'countdown' | 'lesson' | 'rating' | 'summary';
type FlowStep = 'preference' | 'onboarding' | 'main';
type Preference = 'audio' | 'text' | null;

interface Instructor {
  id: number;
  name: string;
  car: string;
  rating: number;
  photo: string;
  position: { top: string; left: string };
  status: 'available' | 'busy';
}

const mockInstructors: Instructor[] = [
  { id: 1, name: 'Marcos Andrade', car: 'Fiat Mobi', rating: 4.9, photo: 'https://i.imgur.com/QpYtm3p.png', position: { top: '30%', left: '40%' }, status: 'available' },
  { id: 2, name: 'Júlia Campos', car: 'Renault Kwid', rating: 4.8, photo: 'https://i.imgur.com/O5uFq16.png', position: { top: '55%', left: '65%' }, status: 'available' },
  { id: 3, name: 'Ricardo Neves', car: 'VW Gol', rating: 4.9, photo: 'https://i.imgur.com/L7515m3.png', position: { top: '70%', left: '25%' }, status: 'busy' },
];

const PRAXI_MARKETING_TEXT = "Praxi é a plataforma inteligente que conecta Autoescolas, Instrutores e Alunos direto pelo WhatsApp.\n\nCom ela, você contrata aulas, acessa simulados, recebe alertas automáticos e faz pagamentos com total segurança.\n\nTudo integrado, automático e simples.\n\n*Praxi: mobilidade, tecnologia e gestão em um só clique.*";

const LIA_AVATAR = "https://api.dicebear.com/9.x/avataaars/svg?seed=Lia&eyebrows=default&eyes=default&mouth=smile&top=longHairCurly&hairColor=4a312c&clothing=shirtCrewNeck&clothingColor=26547c&skinColor=light";

const ChatSimulator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1, text: 'Olá! Eu sou a LIA, sua assistente virtual da PRAXI. 👋\n\nAntes de começarmos, como você prefere ser atendido?\n\n🔊 *Áudio*\n📝 *Texto*',
      sender: 'bot', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const [view, setView] = useState<View>('chat');
  const [flowStep, setFlowStep] = useState<FlowStep>('preference');
  const [preferredMode, setPreferredMode] = useState<Preference>(null);

  const [instructors, setInstructors] = useState<Instructor[]>(mockInstructors);
  const [userPosition, setUserPosition] = useState({ top: '45%', left: '50%' });
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [lessonDetails, setLessonDetails] = useState({ duration: 0, cost: 0 });
  
  const [instructorArrived, setInstructorArrived] = useState(false);
  const [starRating, setStarRating] = useState(0);

  const [eta, setEta] = useState(5);
  const [preLessonCountdown, setPreLessonCountdown] = useState(3);
  const [lessonTime, setLessonTime] = useState(30);

  // Pass explicit mode optionally, otherwise use state
  const addBotMessageWithAudio = async (text: string, explicitMode?: Preference) => {
    let textToNarrate = text.includes("Confira o mapa") ? "Ótima escolha! Estou buscando os instrutores mais próximos de você agora mesmo." : text;
    textToNarrate = textToNarrate.replace(/\*/g, '');
    
    const messageId = Date.now();
    
    // Determine strict mode: Explicit override > State preference > Default Text
    // Note: If preferredMode is null (start), we default to text unless explicit.
    const targetMode = explicitMode || preferredMode || 'text';
    const shouldGenerateAudio = targetMode === 'audio';

    const botMessage: Message = {
        id: messageId,
        text, // Text is always stored for reference/accessibility, but hidden in UI if audio
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAudioLoading: shouldGenerateAudio,
    };
    setMessages(prev => [...prev, botMessage]);

    if (!shouldGenerateAudio) {
        return;
    }

    try {
        const timeoutPromise = new Promise<string>((_, reject) => 
            setTimeout(() => reject(new Error('Audio generation timed out after 60 seconds.')), 60000)
        );
        
        const audioBase64 = await Promise.race([
            generateNarration(textToNarrate),
            timeoutPromise
        ]);

        const audioSrc = pcmToWavDataUrl(audioBase64);
        setMessages(prev => 
            prev.map(m => m.id === messageId ? { ...m, audioSrc, isAudioLoading: false } : m)
        );
    } catch (error) {
        console.error("Failed to generate narration:", error);
        // If audio fails, fallback to showing text with an error note, or just show text
        setMessages(prev => 
            prev.map(m => m.id === messageId ? { ...m, isAudioLoading: false, audioSrc: undefined } : m)
        );
    }
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); }
  }, []);

  useEffect(() => {
    if (view === 'enRoute' && eta <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      setInstructorArrived(true);
    }
  }, [eta, view]);

  useEffect(() => {
    if (view === 'countdown' && preLessonCountdown <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      handleStartLesson();
    }
  }, [preLessonCountdown, view]);

  useEffect(() => {
    if (view === 'lesson' && lessonTime <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      handleEndLesson();
    }
  }, [lessonTime, view]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => console.log("Geolocalização obtida:", position.coords),
        () => console.log("Geolocalização negada.")
      );
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: Date.now(), text: inputValue, sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);
    
    // --- STEP 1: PREFERENCE SELECTION ---
    if (flowStep === 'preference') {
        const lowerInput = currentInput.toLowerCase();
        let selectedMode: Preference = null;
        let confirmationText = "";

        if (lowerInput.includes('audio') || lowerInput.includes('áudio') || lowerInput.includes('voz') || lowerInput.includes('falar')) {
            selectedMode = 'audio';
            confirmationText = "Combinado! 🔊 Vou falar com você por áudio.";
        } else if (lowerInput.includes('texto') || lowerInput.includes('escrito') || lowerInput.includes('escrever') || lowerInput.includes('mensagem')) {
            selectedMode = 'text';
            confirmationText = "Combinado! 📝 Vamos conversar por texto.";
        }

        if (selectedMode) {
            setPreferredMode(selectedMode);
            setFlowStep('onboarding');
            
            // 1. Send Confirmation (Audio or Text based on selection)
            // We pass 'selectedMode' explicitly because state 'preferredMode' might not be updated in this closure yet
            await addBotMessageWithAudio(confirmationText, selectedMode);

            // 2. Send Onboarding Question
            const nextText = "Para começarmos o seu cadastro, qual o seu nome? E você já conhece os serviços da PRAXI?";
            
            // Small delay to separate bubbles slightly in logic
            setTimeout(() => {
                 addBotMessageWithAudio(nextText, selectedMode);
            }, 500);

        } else {
            const retryText = "Desculpe, não entendi. Por favor, escolha entre *Áudio* ou *Texto*.";
            // Default to text for error handling
            await addBotMessageWithAudio(retryText, 'text');
        }
        setIsLoading(false);
        return;
    }

    // --- STEP 2: ONBOARDING (NAME & KNOWLEDGE) ---
    if (flowStep === 'onboarding') {
        const answeredSecondQuestion = /sim|conheço|claro|já|não|nao|desconheço/i.test(currentInput);

        if (answeredSecondQuestion) {
            const knowsPraxi = /sim|conheço|claro|já/i.test(currentInput);
            
            if (knowsPraxi) {
                await addBotMessageWithAudio(`Que ótimo! Fico feliz em te ver por aqui. 👋\n\nPara continuarmos, você é *aluno* ou *instrutor*?`);
            } else {
                // Introduction to Praxi
                await addBotMessageWithAudio(PRAXI_MARKETING_TEXT);
                setTimeout(() => {
                     addBotMessageWithAudio("Agora que você já sabe quem somos, para começarmos: você é *aluno* ou *instrutor*?");
                }, 1000);
            }
        } else {
            // Just name given
            const userName = currentInput;
            await addBotMessageWithAudio(`Prazer em te conhecer, ${userName}! 👋\n\nEu sou a LIA. Para começarmos, você é *aluno* ou *instrutor*?`);
        }
        setFlowStep('main');
        setIsLoading(false);
        return;
    }

    // --- STEP 3: MAIN CHAT ---
    if (flowStep === 'main') {
        const lowerInput = currentInput.toLowerCase();
        
        if (lowerInput.includes('o que é a praxi') || lowerInput.includes('oque é a praxi') || lowerInput.includes('quem é a praxi')) {
             await addBotMessageWithAudio(PRAXI_MARKETING_TEXT);
             setIsLoading(false);
             return;
        }

        const botResponseText = await generateBotResponse(
          currentInput,
          newMessages.map((m) => ({ text: m.text, sender: m.sender }))
        );
        
        await addBotMessageWithAudio(botResponseText);

        if (botResponseText.includes('Confira o mapa')) setView('map');
        if(currentInput.toLowerCase().includes('disponível') || currentInput.toLowerCase().includes('online')) {
            setInstructors(prev => prev.map(inst => inst.id === 3 ? {...inst, status: 'available'} : inst));
        } else if(currentInput.toLowerCase().includes('indisponível') || currentInput.toLowerCase().includes('offline')) {
            setInstructors(prev => prev.map(inst => inst.id === 3 ? {...inst, status: 'busy'} : inst));
        }

        setIsLoading(false);
    }
  };

  const handleHireInstructor = async (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setInstructors(prev => prev.map(i => i.id === instructor.id ? { ...i, status: 'busy' } : i));
    await addBotMessageWithAudio(`Ótima escolha! Você selecionou ${instructor.name}.\n\nPara confirmar a aula por R$ 65,00, é só seguir para o pagamento. 💳`);
    setView('payment');
  };

  const handlePayment = async () => {
    await addBotMessageWithAudio(`Pagamento aprovado! ✅\n${selectedInstructor?.name} já está a caminho.`);
    setView('enRoute');
    setEta(5);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => setEta(prev => prev - 1), 1000);
  };

  const handleConfirmArrival = async () => {
    setInstructorArrived(false);
    await addBotMessageWithAudio(`Ótimo! Sua aula de 50 minutos começará em 3 segundos. Prepare-se! 🚗`);
    setView('countdown');
    setPreLessonCountdown(3);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => setPreLessonCountdown(prev => prev - 1), 1000);
  };

  const handleStartLesson = async () => {
    await addBotMessageWithAudio(`Sua aula começou! Aproveite.`);
    setView('lesson');
    setLessonTime(30);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => setLessonTime(prev => prev - 1), 1000);
  }

  const handleEndLesson = async () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (view === 'lesson') {
        setLessonDetails({ duration: 50, cost: 65.00 });
        await addBotMessageWithAudio(`Aula finalizada! ✅\nPor favor, avalie sua experiência com o instrutor.`);
        setView('rating');
    }
  };
  
  const handleRateLesson = async () => {
    await addBotMessageWithAudio(`Avaliação recebida! Muito obrigado.`);
    setView('summary');
  };

  const handleReturnToChat = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if(selectedInstructor) setInstructors(prev => prev.map(i => i.id === selectedInstructor.id ? { ...i, status: 'available' } : i));
    setSelectedInstructor(null);
    setStarRating(0);
    setView('chat');
  }

  const renderChat = () => (
    <div className="flex flex-col h-full bg-praxi-blue">
        <div className="flex-1 overflow-y-auto p-4 pr-2 space-y-4">
            {messages.map((message) => {
                // Logic to determine visual style: Audio Bubble vs Text Bubble
                const isBot = message.sender === 'bot';
                // If it's a bot message and has audio (or loading audio), treat as "Audio Bubble"
                const isAudioMessage = isBot && (!!message.audioSrc || message.isAudioLoading);

                return (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start items-end gap-2'}`}>
                        {isBot && (
                            <img src={LIA_AVATAR} alt="Lia" className="w-8 h-8 rounded-full bg-white border border-gray-300 flex-shrink-0 mb-2" />
                        )}
                        <div className={`max-w-xs md:max-w-md lg:max-w-2xl rounded-lg shadow-md ${
                            message.sender === 'user'
                            ? 'bg-whatsapp-message text-black px-3 py-2'
                            : 'bg-whatsapp-light text-whatsapp-text px-3 py-2'
                        }`}>
                            {/* RENDER LOGIC: "One or the Other" */}
                            
                            {isAudioMessage ? (
                                // --- AUDIO MODE UI ---
                                <div>
                                    {/* Hidden Transcript / collapsed view could go here, but user requested 'one or the other' */}
                                    <div className="flex items-center gap-2 mb-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-whatsapp-teal" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-xs text-whatsapp-subtle font-bold">Mensagem de Voz</span>
                                    </div>
                                    
                                    {message.isAudioLoading && (
                                        <div className="flex items-center space-x-2 py-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-whatsapp-subtle animate-pulse"></div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-whatsapp-subtle animate-pulse delay-150"></div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-whatsapp-subtle animate-pulse delay-300"></div>
                                            <span className="text-xs text-whatsapp-subtle">Gravando...</span>
                                        </div>
                                    )}
                                    
                                    {message.audioSrc && !message.isAudioLoading && (
                                        <audio controls src={message.audioSrc} className="w-full h-10" />
                                    )}
                                    
                                    {/* Optional: Small 'transcription' toggle could be added here, but limiting to audio only per request */}
                                </div>
                            ) : (
                                // --- TEXT MODE UI ---
                                <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: message.text.replace(/\*(.*?)\*/g, '<b>$1</b>') }} />
                            )}

                            <p className="text-xs text-right mt-1 opacity-60">{message.timestamp}</p>
                        </div>
                    </div>
                );
            })}
            {isLoading && (
            <div className="flex justify-start items-end gap-2">
                 <img src={LIA_AVATAR} alt="Lia" className="w-8 h-8 rounded-full bg-white border border-gray-300 flex-shrink-0 mb-2" />
                <div className="max-w-xs md:max-w-md lg:max-w-2xl rounded-lg px-3 py-2 bg-whatsapp-light text-whatsapp-text">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-whatsapp-subtle animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-whatsapp-subtle animate-pulse delay-150"></div>
                        <div className="w-2 h-2 rounded-full bg-whatsapp-subtle animate-pulse delay-300"></div>
                    </div>
                </div>
            </div>
            )}
            <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="mt-4 flex items-center space-x-2 p-2">
            <input
            type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite uma mensagem..."
            className="flex-1 bg-whatsapp-light rounded-full py-2 px-4 text-whatsapp-text placeholder-whatsapp-subtle focus:outline-none focus:ring-2 focus:ring-whatsapp-teal"
            disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || inputValue.trim() === ''}
            className="bg-whatsapp-teal text-white rounded-full p-3 hover:bg-opacity-90 disabled:bg-whatsapp-subtle disabled:cursor-not-allowed transition-colors" aria-label="Enviar mensagem">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
        </form>
    </div>
  );

  // ... Map, Payment, etc views remain identical ...
  const renderMap = () => (
    <div className="h-full w-full relative bg-gray-800 overflow-hidden rounded-lg">
      <img src="https://i.imgur.com/4j61nOR.png" className="h-full w-full object-cover opacity-50" alt="Mapa da cidade"/>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-blue-500 w-8 h-8 rounded-full border-4 border-white shadow-lg animate-pulse" style={{ top: userPosition.top, left: userPosition.left, position: 'absolute' }}>
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-white text-xs font-bold bg-blue-500 px-1 rounded">VOCÊ</span>
        </div>
      </div>
      {instructors.map(inst => (
        <div key={inst.id} className="absolute transition-all duration-500" style={{ top: inst.position.top, left: inst.position.left }}>
            <button onClick={() => setSelectedInstructor(inst)} className={`w-12 h-12 rounded-full border-4 shadow-xl flex items-center justify-center ${inst.status === 'available' ? 'bg-green-500 border-white animate-pulse' : 'bg-red-500 border-gray-300'}`}>
                <img src={inst.photo} alt={inst.name} className="w-full h-full object-cover rounded-full" />
            </button>
            {inst.status === 'busy' && <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-white text-[10px] font-semibold bg-red-600 px-1.5 py-0.5 rounded-full whitespace-nowrap">Em aula</span>}
        </div>
      ))}
      {selectedInstructor && (
        <div className="absolute bottom-4 left-4 right-4 bg-whatsapp-light p-4 rounded-lg shadow-2xl border border-whatsapp-text/20 animate-slide-up">
            <button onClick={() => setSelectedInstructor(null)} className="absolute -top-3 -right-3 bg-whatsapp-subtle text-white w-7 h-7 rounded-full">&times;</button>
            <div className="flex items-center gap-4">
                <img src={selectedInstructor.photo} alt={selectedInstructor.name} className="w-16 h-16 rounded-full border-2 border-whatsapp-teal" />
                <div>
                    <h3 className="font-bold text-lg">{selectedInstructor.name}</h3>
                    <p className="text-sm text-whatsapp-subtle">{selectedInstructor.car}</p>
                    <p className="text-sm font-bold text-yellow-400">⭐ {selectedInstructor.rating}</p>
                </div>
            </div>
            <button 
                onClick={() => handleHireInstructor(selectedInstructor)}
                disabled={selectedInstructor.status === 'busy'}
                className="w-full bg-whatsapp-teal text-white font-bold py-3 mt-4 rounded-lg hover:bg-opacity-90 disabled:bg-whatsapp-subtle disabled:cursor-not-allowed transition-colors">
                {selectedInstructor.status === 'available' ? 'Contratar Aula (R$ 65,00)' : 'Instrutor em aula'}
            </button>
        </div>
      )}
    </div>
  );

  const renderPayment = () => (
    <div className="h-full w-full flex flex-col items-center justify-center bg-whatsapp-dark p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-white">Pagamento</h2>
        <p className="text-whatsapp-subtle mt-2">Confirme o pagamento para iniciar a aula.</p>
        <div className="bg-whatsapp-light w-full max-w-sm rounded-lg p-6 mt-6 space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-whatsapp-subtle">Instrutor:</span>
                <div className="flex items-center gap-2">
                    <img src={selectedInstructor?.photo} alt={selectedInstructor?.name} className="w-8 h-8 rounded-full" />
                    <span className="font-semibold">{selectedInstructor?.name}</span>
                </div>
            </div>
            <div className="flex justify-between border-t border-whatsapp-text/10 pt-4">
                <span className="text-whatsapp-subtle">Valor Total:</span>
                <span className="font-bold text-2xl text-whatsapp-teal">R$ 65,00</span>
            </div>
        </div>
        <button 
            onClick={handlePayment}
            className="w-full max-w-sm bg-whatsapp-teal text-white font-bold py-3 mt-6 rounded-lg hover:bg-opacity-90 transition-colors">
            Pagar com Cartão Cadastrado
        </button>
         <button 
            onClick={() => { setView('map'); setSelectedInstructor(null); }}
            className="w-full max-w-sm text-whatsapp-subtle font-bold py-3 mt-2 rounded-lg hover:bg-whatsapp-light/50 transition-colors">
            Cancelar
        </button>
    </div>
  );

  const renderEnRoute = () => (
     <div className="h-full w-full relative bg-gray-800 overflow-hidden rounded-lg">
      <img src="https://i.imgur.com/4j61nOR.png" className="h-full w-full object-cover opacity-30" alt="Mapa da cidade"/>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-green-500 animate-pulse">
            <img src={selectedInstructor?.photo} alt={selectedInstructor?.name} className="w-full h-full object-cover rounded-full" />
        </div>
      </div>
      <div className="absolute top-4 left-4 right-4 bg-whatsapp-light p-3 rounded-lg shadow-lg text-center">
          <h3 className="font-bold text-whatsapp-text">{selectedInstructor?.name} está a caminho!</h3>
          <p className="text-sm text-whatsapp-teal animate-pulse">Chega em {eta} segundos (1.2 km)</p>
      </div>
       {instructorArrived && (
         <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
            <div className="bg-whatsapp-light p-6 rounded-lg text-center shadow-2xl max-w-sm">
                <h3 className="font-bold text-lg">Seu instrutor chegou?</h3>
                <p className="text-sm text-whatsapp-subtle mt-2">Confirme para iniciarmos a contagem regressiva para o início da aula.</p>
                <div className="mt-4 flex gap-4">
                    <button onClick={handleConfirmArrival} className="flex-1 bg-whatsapp-teal text-white font-bold py-2 rounded-lg">Sim, ele chegou!</button>
                    <button onClick={() => setInstructorArrived(false)} className="flex-1 bg-whatsapp-subtle/50 text-white font-bold py-2 rounded-lg">Ainda não</button>
                </div>
            </div>
         </div>
       )}
    </div>
  );

  const renderCountdown = () => (
    <div className="h-full w-full flex flex-col items-center justify-center bg-whatsapp-dark p-6 rounded-lg text-center">
      <p className="text-whatsapp-subtle text-xl mb-4">A aula começará em...</p>
      <div className="text-9xl font-bold text-whatsapp-teal animate-ping">{preLessonCountdown}</div>
    </div>
  );

  const renderLesson = () => (
     <div className="h-full w-full relative bg-gray-800 overflow-hidden rounded-lg">
      <img src="https://i.imgur.com/4j61nOR.png" className="h-full w-full object-cover opacity-30" alt="Mapa da cidade"/>
      <div className="absolute transition-all duration-500 animate-drive" style={{ top: '40%', left: '35%' }}>
         <div className="w-10 h-10 rounded-full border-4 border-white shadow-lg bg-blue-500 flex items-center justify-center"/>
         <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center ml-2 bg-green-500">
            <img src={selectedInstructor?.photo} alt={selectedInstructor?.name} className="w-full h-full object-cover rounded-full" />
        </div>
      </div>
      <div className="absolute top-4 left-4 right-4 bg-whatsapp-light p-3 rounded-lg shadow-lg text-center">
          <h3 className="font-bold text-whatsapp-text">Aula em andamento com {selectedInstructor?.name}</h3>
          <p className="text-sm text-whatsapp-teal animate-pulse">Tempo restante: {Math.floor(lessonTime / 60)}:{(lessonTime % 60).toString().padStart(2, '0')}</p>
      </div>
       <div className="absolute bottom-4 left-4 right-4">
            <button 
                onClick={handleEndLesson}
                className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors">
                Finalizar Aula
            </button>
       </div>
       <style>{`.animate-drive { animation: drivePath 20s linear infinite; } @keyframes drivePath { 0% { transform: translate(0, 0); } 25% { transform: translate(80px, -40px); } 50% { transform: translate(120px, 50px); } 75% { transform: translate(20px, 80px); } 100% { transform: translate(0, 0); } }`}</style>
    </div>
  );

  const renderRating = () => (
    <div className="h-full w-full flex flex-col items-center justify-center bg-whatsapp-dark p-6 rounded-lg text-center">
      <img src={selectedInstructor?.photo} alt={selectedInstructor?.name} className="w-24 h-24 rounded-full border-4 border-whatsapp-teal mb-4" />
      <h2 className="text-2xl font-bold text-white">Como foi sua aula?</h2>
      <p className="text-whatsapp-subtle mt-2">Sua avaliação é importante para a comunidade.</p>
      <div className="flex gap-2 text-4xl mt-6 text-gray-600">
        {[1, 2, 3, 4, 5].map(star => (
          <button key={star} onClick={() => setStarRating(star)} className={`${star <= starRating ? 'text-yellow-400' : 'text-whatsapp-subtle'} transition-colors`}>
            ★
          </button>
        ))}
      </div>
      <button 
          onClick={handleRateLesson}
          disabled={starRating === 0}
          className="w-full max-w-sm bg-whatsapp-teal text-white font-bold py-3 mt-8 rounded-lg hover:bg-opacity-90 disabled:bg-whatsapp-subtle disabled:cursor-not-allowed transition-colors">
          Enviar Avaliação
      </button>
    </div>
  );

  const renderSummary = () => (
    <div className="h-full w-full flex flex-col items-center justify-center bg-whatsapp-dark p-6 rounded-lg text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-whatsapp-teal mb-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <h2 className="text-2xl font-bold text-white">Aula Finalizada!</h2>
        <p className="text-whatsapp-subtle mt-2">Um resumo foi enviado no seu chat.</p>
        <div className="bg-whatsapp-light text-left w-full max-w-sm rounded-lg p-4 mt-6 space-y-2">
            <div className="flex justify-between">
                <span className="text-whatsapp-subtle">Instrutor:</span>
                <span className="font-semibold">{selectedInstructor?.name}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-whatsapp-subtle">Duração:</span>
                <span className="font-semibold">{lessonDetails.duration} min</span>
            </div>
            <div className="flex justify-between">
                <span className="text-whatsapp-subtle">Valor:</span>
                <span className="font-semibold text-whatsapp-teal">R$ {lessonDetails.cost.toFixed(2)}</span>
            </div>
        </div>
        <p className="text-xs text-whatsapp-subtle mt-4">✅ Pagamento liberado para o instrutor.</p>
        <button 
            onClick={handleReturnToChat}
            className="w-full max-w-sm bg-whatsapp-teal text-white font-bold py-3 mt-6 rounded-lg hover:bg-opacity-90 transition-colors">
            Voltar para o Chat
        </button>
    </div>
  );

  const renderContent = () => {
    switch (view) {
      case 'map': return renderMap();
      case 'payment': return renderPayment();
      case 'enRoute': return renderEnRoute();
      case 'countdown': return renderCountdown();
      case 'lesson': return renderLesson();
      case 'rating': return renderRating();
      case 'summary': return renderSummary();
      case 'chat':
      default: return renderChat();
    }
  };

  return <div className="h-full">{renderContent()}</div>;
};

export default ChatSimulator;
