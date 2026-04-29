/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  HelpCircle, 
  Star, 
  ArrowRight, 
  Timer,
  Zap,
  Lock,
  MessageCircle,
  XCircle,
  ShoppingCart,
  Users,
  Palette,
  Gamepad2,
  Smartphone,
  Briefcase
} from "lucide-react";
import { useState, useEffect } from "react";

const faqs = [
  {
    q: "É difícil de aplicar?",
    a: "Não. Você recebe o arquivo + um passo a passo simples. Qualquer pessoa consegue em menos de 2 minutos."
  },
  {
    q: "Funciona no meu celular?",
    a: "Sim. Compatível com Android, versão mais recente do Truck Simulator."
  },
  {
    q: "Vou perder meu progresso atual?",
    a: "Não. O save substitui apenas o saldo da conta, o restante fica intacto."
  },
  {
    q: "Como recebo após o pagamento?",
    a: "Na hora, direto no seu E-mail."
  },
  {
    q: "E se não funcionar no meu celular?",
    a: "Tem suporte incluso. Se der qualquer problema, a gente resolve junto."
  }
];

function PromoBar() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      
      const diff = midnight.getTime() - now.getTime();
      
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      
      setTimeLeft(
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      );
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="bg-[#FFB800] text-black py-2.5 md:py-3 w-full sticky top-0 z-50 shadow-xl flex items-center justify-center overflow-hidden">
      <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] xs:text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-tight whitespace-nowrap">
        <span className="text-sm sm:text-lg">⏰</span>
        <span>Oferta válida até meia-noite</span>
        <span className="font-black font-mono bg-black text-[#FFB800] px-2 md:px-3 py-1 rounded shadow-inner text-xs sm:text-sm md:text-base tracking-wider ml-1 sm:ml-2">
          {timeLeft}
        </span>
      </div>
    </div>
  );
}

const MALE_NAMES = [
  "João", "Pedro", "Lucas", "Mateus", "Marcos", "Gabriel", "Rafael", 
  "Marcelo", "Carlos", "Bruno", "Fernando", "Ricardo", "Eduardo", 
  "Gustavo", "Felipe", "Rodrigo", "Thiago", "Diego", "Alexandre", "Caio"
];

function SalesNotification() {
  const [notification, setNotification] = useState<{ name: string; time: string } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      const randomName = MALE_NAMES[Math.floor(Math.random() * MALE_NAMES.length)];
      const randomTime = Math.floor(Math.random() * 59) + 1;
      
      setNotification({ name: randomName, time: `${randomTime} min atrás` });
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Hide after 5 seconds
    };

    // Initial delay
    const initialTimer = setTimeout(showNotification, 3000);

    // Loop interval
    const intervalTimer = setInterval(() => {
      showNotification();
    }, 15000 + Math.random() * 10000); // Show every 15-25 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && notification && (
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-4 left-4 z-50 bg-[#121212] border border-zinc-800 text-white p-3 pr-5 rounded-2xl shadow-2xl flex items-center gap-3 w-[280px] xs:w-[320px]"
        >
          <div className="bg-brand/20 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-brand/30">
            <ShoppingCart className="w-5 h-5 text-brand" />
          </div>
          <div>
            <p className="text-[13px] font-bold leading-tight"><span className="text-brand">{notification.name}</span> acabou de comprar</p>
            <p className="text-[11px] text-zinc-400 font-medium">Trk dinheiro infinito</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">{notification.time}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToOffer = () => {
    const element = document.getElementById("oferta");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-bg-dark text-zinc-100 font-sans selection:bg-brand selection:text-white">
      {/* Promo Bar */}
      <PromoBar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-brand/10 blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight font-heading">
              Descubra como ter <span className="text-brand">dinheiro infinito</span> no Truck Simulator em 90 segundos
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Chega de gastar dias preso no mesmo caminhão para fazer dinheiro
            </p>
          </motion.div>

          {/* VSL Video Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl overflow-hidden mb-12 relative bg-black"
          >
            <div className="wistia-embed-container" ref={(el) => {
              if (el && !el.querySelector('wistia-player')) {
                el.innerHTML = '';
                
                // Add the wistia player and styles
                el.innerHTML = `
                  <style>wistia-player[media-id='wdn8f6p4ir']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/wdn8f6p4ir/swatch'); display: block; filter: blur(5px); padding-top:75.0%; }</style> 
                  <wistia-player media-id="wdn8f6p4ir" aspect="1.3333333333333333"></wistia-player>
                `;

                // Add Wistia scripts if they don't already exist
                if (!document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
                  const playerScript = document.createElement('script');
                  playerScript.src = "https://fast.wistia.com/player.js";
                  playerScript.async = true;
                  document.head.appendChild(playerScript);
                }

                if (!document.querySelector('script[src="https://fast.wistia.com/embed/wdn8f6p4ir.js"]')) {
                  const embedScript = document.createElement('script');
                  embedScript.src = "https://fast.wistia.com/embed/wdn8f6p4ir.js";
                  embedScript.async = true;
                  embedScript.type = "module";
                  document.head.appendChild(embedScript);
                }
              }
            }} />
          </motion.div>

          {/* Initial CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <motion.button 
              onClick={scrollToOffer}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-md px-8 py-5 bg-brand hover:bg-brand/90 text-white font-bold rounded-xl text-[15px] leading-[25px] shadow-[0_0_40px_-10px_rgba(0,200,83,0.5)] transition-all transform active:scale-95 flex items-center justify-center group mb-4 text-center"
            >
              QUERO DINHEIRO INFINITO AGORA
            </motion.button>
            <p className="text-white text-sm mb-1 font-medium">Versão 1.4.1 (atualizado)</p>
            <p className="text-brand font-bold">POR APENAS R$ 5,00</p>
          </motion.div>
        </div>
      </section>

      {/* Pain Section */}
      <section className="py-20 px-4 bg-zinc-900/30">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 font-heading">Você conhece bem essa sensação…</h2>
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src="https://iili.io/Bimx10F.png" 
              alt="Você conhece bem essa sensação" 
              className="w-full max-w-2xl mx-auto rounded-2xl shadow-xl mb-12 object-contain"
              loading="lazy"
              decoding="async"
            />
            <div className="space-y-6 text-zinc-400 text-lg">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500/60 mt-1 flex-shrink-0" />
                <p>Você abre o Truck Simulator animado, faz uma entrega, ganha uma mixaria.</p>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500/60 mt-1 flex-shrink-0" />
                <p>Olha o preço do próximo caminhão e percebe que vai levar semanas até conseguir comprar.</p>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500/60 mt-1 flex-shrink-0" />
                <p>Um anúncio após o outro e você ainda ganha pouco pra evoluir no jogo..😪</p>
              </div>
              <div className="p-6 bg-brand/10 border-l-4 border-brand rounded-r-xl">
                <p className="text-zinc-100 font-semibold italic">E se você pudesse pular tudo isso?</p>
              </div>
              <p>Com o mod de dinheiro infinito, você abre o jogo e já tem grana sobrando pra tudo. Sem grind. Sem esperar nível 32 pra desbloquear caminhão. Sem assistir propaganda pra mandar funcionário trabalhar.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 font-heading">O que você consegue de imediato:</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { text: "Compra qualquer caminhão da loja na hora", icon: ShoppingCart },
              { text: "Expande a garagem e contrata os melhores motoristas", icon: Users },
              { text: "Personaliza tudo sem pensar duas vezes", icon: Palette },
              { text: "Joga do jeito que sempre quis sem limitação nenhuma", icon: Gamepad2 },
              { text: "Disponível para Android e IOS", icon: Smartphone },
              { text: "Foco total em dirigir e montar sua empresa", icon: Briefcase }
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-brand/30 transition-colors"
              >
                <div className="p-2 rounded-lg bg-brand/20 text-brand">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <p className="text-lg font-medium text-zinc-200">{benefit.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-zinc-900/50 overflow-hidden relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-heading">Quem já usou, não volta atrás</h2>
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-brand text-brand" />)}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-8">
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src="https://iili.io/BiWije4.png"
              alt="Depoimento 1"
              className="w-full max-w-sm rounded-2xl shadow-xl border border-zinc-800 object-contain"
              loading="lazy"
              decoding="async"
            />
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              src="https://iili.io/BiWiwml.png"
              alt="Depoimento 2"
              className="w-full max-w-sm rounded-2xl shadow-xl border border-zinc-800 object-contain"
              loading="lazy"
              decoding="async"
            />
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              src="https://iili.io/BiWiOI2.png"
              alt="Depoimento 3"
              className="w-full max-w-sm rounded-2xl shadow-xl border border-zinc-800 object-contain"
              loading="lazy"
              decoding="async"
            />
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              src="https://iili.io/Bim2ITX.png"
              alt="Depoimento 4"
              className="w-full max-w-sm rounded-2xl shadow-xl border border-zinc-800 object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Special Offer */}
      <section id="oferta" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand/5 blur-[100px]" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-zinc-900 border-2 border-brand rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-10">
              <span className="px-4 py-1.5 rounded-full bg-brand text-white text-sm font-bold uppercase tracking-wider mb-6 inline-block">
                OFERTA ESPECIAL
              </span>
              <h2 className="text-xl md:text-2xl font-bold mb-4 font-heading">Pagamento único — Receba na hora no seu e-mail</h2>
            </div>

            <div className="space-y-4 mb-10">
              {[
                "Dinheiro Infinito no Truck Simulator",
                "Entrega imediata",
                "Suporte passo a passo incluso",
                "Funciona na versão mais recente",
                "Acesso vitalício"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-lg">
                  <CheckCircle2 className="w-5 h-5 text-brand flex-shrink-0" />
                  <span className="text-zinc-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center justify-center p-8 bg-zinc-950 rounded-3xl border border-zinc-800 mb-8">
              <span className="text-zinc-500 line-through text-xl mb-1">De R$ 29,90</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">R$</span>
                <span className="text-7xl font-black text-brand">5,00</span>
              </div>
            </div>

            <motion.a 
              href="https://ggcheckout.app/checkout/v5/AR14FwAkZkaNZel0l2qh"
              target="_blank"
              rel="noopener noreferrer"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-full py-6 bg-brand hover:bg-brand/90 text-white font-black text-lg md:text-xl rounded-2xl shadow-[0_10px_40px_-5px_rgba(0,200,83,0.4)] transition-all transform active:scale-[0.98] flex items-center justify-center group text-center"
            >
              QUERO BAIXAR AGORA
            </motion.a>

            <div className="mt-8 flex flex-wrap justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-semibold">Criptografia SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <span className="text-xs font-semibold">Entrega Instantânea</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                <span className="text-xs font-semibold">Checkout Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-10 bg-zinc-900/50 p-10 rounded-[2rem] border border-zinc-800">
          <div className="w-40 h-40 flex-shrink-0 relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-dashed border-brand/30 rounded-full"
            />
            <div className="absolute inset-2 bg-brand rounded-full flex flex-col items-center justify-center text-center p-4">
              <span className="text-3xl font-black leading-none">30</span>
              <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Dias de</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Garantia</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight font-heading">30 DIAS DE GARANTIA</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Se nos primeiros 30 dias você achar que não valeu cada centavo, devolvemos 100% do seu dinheiro. Sem pergunta, sem burocracia. Nosso compromisso é com a sua diversão.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-zinc-950/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <HelpCircle className="w-12 h-12 text-brand mx-auto mb-4" />
            <h2 className="text-4xl font-bold font-heading">Perguntas Frequentes</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-zinc-800 rounded-2xl overflow-hidden transition-colors hover:border-zinc-700">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center bg-zinc-900/30"
                >
                  <span className="text-lg font-bold">{faq.q}</span>
                  <div className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </div>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? 'max-h-96' : 'max-h-0'}`}
                >
                  <div className="p-6 pt-0 text-zinc-400 bg-zinc-900/30">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Section */}
      <footer className="py-24 px-4 bg-bg-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase italic leading-tight">
            NÃO FIQUE DE FORA <br />
            <span className="text-brand">COMECE A JOGAR AGORA MESMO</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl mb-12">
            Junte-se a milhares de brasileiros que já pararam de perder horas grindando no Truck Simulator.
          </p>
          
          <motion.a 
            href="https://ggcheckout.app/checkout/v5/AR14FwAkZkaNZel0l2qh"
            target="_blank" 
            rel="noopener noreferrer"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-2xl mx-auto py-8 bg-white text-black hover:bg-brand hover:text-white font-black text-lg md:text-2xl rounded-3xl shadow-2xl transition-all transform hover:scale-105 active:scale-95 mb-8 flex items-center justify-center text-center px-4"
          >
            QUERO BAIXAR POR R$ 5,00 AGORA
          </motion.a>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-zinc-500 text-sm font-medium">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Pagamento seguro
            </span>
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand" /> Entrega imediata no E-mail
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-sky-500" /> Suporte incluso via Whatsapp
            </span>
          </div>
        </div>

        {/* Decorative Truck Icon BG */}
        <div className="absolute -bottom-20 -right-20 opacity-[0.03] rotate-[-15deg]">
          <Truck className="w-[600px] h-[600px]" />
        </div>
      </footer>
      
      <SalesNotification />
    </div>
  );
}
