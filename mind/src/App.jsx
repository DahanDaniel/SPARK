import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Brain, Sparkles, Target, Users, Sun, Moon, 
  BarChart3, Activity, Layers, Shuffle, TrendingUp, CheckCircle2, 
  XCircle, ChevronRight, Briefcase, HardHat, Presentation,
  Menu, X
} from 'lucide-react';

const Strawberry = ({ size = 24, color = "currentColor", style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={style}
  >
    {/* Body Outline Scallops */}
    <path d="M8.5 9.5 
             a2.5 2.5 0 0 0 -1.5 4.5 
             a2.5 2.5 0 0 0 1.5 4.5 
             a3 3 0 0 0 3.5 3 
             a3 3 0 0 0 3.5 -3 
             a2.5 2.5 0 0 0 1.5 -4.5 
             a2.5 2.5 0 0 0 -1.5 -4.5" />
    
    {/* Top edge closing the body */}
    <path d="M8.5 9.5 c 1 -1 2.5 -1.5 3.5 -1.5 c 1 0 2.5 0.5 3.5 1.5" />

    {/* Inner beads/texture arcs */}
    <path d="M7 14 a3 3 0 0 0 4.5 1.5" />
    <path d="M12.5 15.5 a3 3 0 0 0 4.5 -1.5" />
    <path d="M8.5 18.5 a3 3 0 0 0 7 0" />
    
    <path d="M9 11 a2.5 2.5 0 0 0 3 1.5" />
    <path d="M12 12.5 a2.5 2.5 0 0 0 3 -1.5" />

    {/* Stem and Leaves */}
    <path d="M12 2 v 5" />
    <path d="M12 7 c-2-3 -5-3 -5-3 s1 4 4 4" />
    <path d="M12 7 c2-3 5-3 5-3 s-1 4 -4 4" />
  </svg>
);



function App() {
  const [theme, setTheme] = useState('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('mind-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Initialize CRM Script for auto-resizing
    const script = document.createElement('script');
    script.src = 'https://api.crazy-crm.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('mind-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <>
      {/* Navigation */}
      <nav className="nav-glass animate-fade-in">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700', fontSize: '1.5rem', letterSpacing: '0.05em' }}>
            <Brain className="text-gradient" size={32} />
            MIND
          </div>

          <div className="mobile-menu-btn" style={{ display: 'none' }}>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center' }}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`} style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            <a href="#wizja" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Wizja i Problem</a>
            <a href="#metodologia" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Metodologia</a>
            <a href="#zespol" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Zespół</a>
            
            <button 
              onClick={toggleTheme} 
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: 'var(--text-primary)', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '0.5rem',
                borderRadius: '50%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--glass-bg)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <a href="#kontakt" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.95rem' }}>Rozmowa strategiczna</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="section-padding" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'var(--accent-primary)', borderRadius: '50%', filter: 'blur(120px)', opacity: '0.3', zIndex: -1 }}></div>
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '400px', height: '400px', background: 'var(--accent-secondary)', borderRadius: '50%', filter: 'blur(150px)', opacity: '0.2', zIndex: -1 }}></div>

        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1, paddingTop: '4rem' }}>
          <div className="animate-fade-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--glass-bg)', padding: '0.5rem 1rem', borderRadius: '100px', marginBottom: '2rem', border: '1px solid var(--glass-border)' }}>
            <Sparkles size={16} className="text-gradient" />
            <span style={{ fontSize: '0.875rem', fontWeight: '500', letterSpacing: '0.05em' }}>SYSTEMOWE ZARZĄDZANIE</span>
          </div>
          
          <h1 className="animate-fade-in delay-100" style={{ marginBottom: '1.5rem', maxWidth: '1000px', margin: '0 auto 1.5rem' }}>
            Odblokuj Swój Pełen Potencjał z <span className="text-gradient">MIND</span>
          </h1>
          
          <p className="animate-fade-in delay-200" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
            Porządkujemy firmy MŚP i budujemy systemy, które pozwalają im rosnąć bez chaosu. Łączymy nowoczesne technologie z wieloletnim doświadczeniem biznesowym.
          </p>
          
          <div className="animate-fade-in delay-300" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="#kontakt" className="btn-primary" style={{ padding: '1rem 2rem' }}>
              Umów rozmowę strategiczną <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </header>

      {/* ZAUFALI NAM */}
      <section style={{ padding: '3rem 0 1.5rem', background: 'var(--glass-bg)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Zaufali nam / Korzystali z naszych systemów</p>
          <div className="logos-grid">
            {[
              '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '18', 'I'
            ].map((filename, idx) => (
              <div key={idx} className="logo-wrapper">
                <img src={`/mind/logos_clients/${filename}.png`} alt={`Client Logo ${idx}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM & WIZJA */}
      <section id="wizja" className="section-padding" style={{ position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '4rem', alignItems: 'flex-start', marginBottom: '4rem' }}>
            <div>
              <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '100px', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>Symptomy Chaosu</div>
              <h2 style={{ marginBottom: '1.5rem' }}>Dlaczego wiele firm <br/><span style={{ color: '#ef4444' }}>przestaje rosnąć</span>?</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                Większość firm nie ma problemu z potencjałem. Ma problem z chaosem operacyjnym. Gdy firma rośnie szybciej niż jej struktura zarządzania, pojawia się chaos. Zamiast rozwijać się stabilnie, firma zaczyna działać reaktywnie.
              </p>
            </div>
            
            <div>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Brak spójnego systemu zarządzania',
                  'Decyzje podejmowane intuicyjnie',
                  'Sprzedaż zależna od pojedynczych osób / przypadkowych działań',
                  'Brak przejrzystości procesów i wyników',
                  'Przeciążenie właściciela operacyjną codziennością',
                  'Chaos technologiczny i nadmiar narzędzi'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    <XCircle size={24} style={{ color: '#ef4444', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '1.125rem', fontWeight: '500' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="glass-panel animate-fade-in" style={{ padding: '4rem', textAlign: 'center', maxWidth: '1000px', margin: '0 auto', borderTop: '4px solid var(--accent-primary)' }}>
            <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderRadius: '100px', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Nasza Wizja</div>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Od chaosu do <br className="hide-on-desktop" /><span className="text-gradient">przewidywalnego wzrostu</span></h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
              MIND kompleksowo wspiera przedsiębiorstwa z sektora MŚP. Edukujemy i szkolimy zarządy, układamy organizację od fundamentów po skalowanie, łącząc technologię z biznesowym kunsztem.
            </p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '40px', height: '4px', background: 'var(--accent-primary)', borderRadius: '2px' }}></div>
              <div style={{ width: '20px', height: '4px', background: 'var(--accent-secondary)', borderRadius: '2px' }}></div>
              <div style={{ width: '40px', height: '4px', background: 'var(--accent-primary)', borderRadius: '2px' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* CZYM JEST MIND */}
      <section className="section-padding" style={{ background: 'var(--glass-bg)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Czym jest <span className="text-gradient">MIND?</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto' }}>
              Systemowe podejście do rozwoju firm. Łączymy trzy elementy, które w większości firm funkcjonują oddzielnie: strategię, procesy i technologię.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <Target size={36} color="var(--accent-primary)" style={{ marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Strategia</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                Pomagamy właścicielom i zarządom określić kierunek rozwoju firmy oraz priorytety działania.
              </p>
            </div>
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <Layers size={36} color="var(--accent-secondary)" style={{ marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Procesy i systemy</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                Projektujemy przejrzyste struktury operacyjne (KPI, MBO, CRM, ERP), które pozwalają firmie działać w sposób całkowicie przewidywalny.
              </p>
            </div>
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <Activity size={36} color="var(--accent-tertiary)" style={{ marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Technologia i sprzedaż</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                Integrujemy narzędzia technologiczne oraz budujemy systemy generowania klientów (np. BusinessHub, wirtualne działy handlowe).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* METODOLOGIA */}
      <section id="metodologia" className="section-padding" style={{ position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Nasza Metodologia</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
              Jak krok po kroku porządkujemy organizację, by działała spójnie ze swoją wizją i strategią.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            {[
              { num: '1', title: 'Analiza i mapowanie', desc: 'Poznajemy strukturę firmy, procesy oraz sposób podejmowania decyzji.' },
              { num: '2', title: 'Porządkowanie i optymalizacja', desc: 'Upraszczamy procesy oraz eliminujemy chaos operacyjny wykorzystując m.in. LEAN, AGILE.' },
              { num: '3', title: 'Systemy zarządzania', desc: 'Budujemy system zarządzania oparty na danych za pomocą KPI, MBO i CRM.' },
              { num: '4', title: 'Technologia i automatyzacja', desc: 'Integrujemy narzędzia technologiczne i wdrażamy automatyzację procesów, w tym rozwiązania oparte na AI.' }
            ].map((step, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--glass-border)', lineHeight: 1 }}>{step.num}</div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPARK & GLG */}
      <section className="section-padding" style={{ background: 'var(--glass-bg)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', gap: '3rem' }}>
            
            <div className="glass-panel" style={{ padding: '3rem', borderTop: '4px solid var(--accent-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Shuffle size={32} color="var(--accent-primary)" />
                <h2 style={{ margin: 0 }}>Metodologia SPARK</h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.125rem' }}>
                SPARK to autorska metodologia transformacji rozwijana w MIND, pomagająca przechodzić od intuicyjnego zarządzania do systemu.
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Systemowe myślenie', 'Porządkowanie procesów', 'Analiza skuteczności', 'Reorganizacja firmy', 'Koncentracja na kliencie'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontWeight: '500' }}>
                    <span style={{ fontSize: '1.5rem', color: 'var(--accent-primary)', fontWeight: 'bold', width: '20px' }}>{item.charAt(0)}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel" style={{ padding: '3rem', borderTop: '4px solid var(--accent-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <TrendingUp size={32} color="var(--accent-secondary)" />
                <h2 style={{ margin: 0 }}>GLG – Golden Lead Generation</h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.125rem' }}>
                W wielu firmach sprzedaż jest najbardziej niestabilnym elementem. Budujemy systemy oparte na:
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Spersonalizowanych bazach klientów', 'Kampaniach outbound', 'Kwalifikacji leadów', 'Umawianiu spotkań sprzedażowych'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={20} color="var(--accent-secondary)" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p style={{ color: 'var(--text-secondary)', marginTop: '2rem', fontStyle: 'italic' }}>
                Cel: stworzenie przewidywalnego dopływu klientów.
              </p>
            </div>

          </div>

          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Jeden system – Trzy poziomy</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
              <div className="glass-panel" style={{ padding: '1rem 2rem' }}><strong>MIND:</strong> Strategia i architektura</div>
              <ChevronRight color="var(--text-secondary)" />
              <div className="glass-panel" style={{ padding: '1rem 2rem' }}><strong>SPARK:</strong> Systemy wyższego rzędu</div>
              <ChevronRight color="var(--text-secondary)" />
              <div className="glass-panel" style={{ padding: '1rem 2rem' }}><strong>GLG:</strong> Generowanie leadów</div>
            </div>
          </div>
        </div>
      </section>

      {/* HISTORIE TRANSFORMACJI */}
      <section className="section-padding" style={{ position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Historie Transformacji</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
              Zobacz, jak wprowadzenie systemowego zarządzania odmieniło firmy naszych klientów.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <HardHat size={28} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Firma Budowlana</h3>
              <p style={{ fontWeight: 'bold', color: '#22c55e', marginBottom: '1.5rem', fontSize: '0.875rem' }}>Od 1,2 mln zł straty do 4 mln zł zysku</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Restrukturyzacja procesów zarządzania, wdrożenie mierników wyników, uporządkowanie struktury. W 14 miesięcy firma wyciągnęła się z zapaści nie dzięki zwiększeniu wysiłku, lecz systemowemu stylowi zarządzania.
              </p>
            </div>
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <Presentation size={28} color="var(--accent-secondary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Studio Marketingowe</h3>
              <p style={{ fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>Odzyskana stabilność w dynamicznym wzroście</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Duże przychody towarzyszyły ogromnemu przeciążeniu właściciela, braku jasnej strategii i chaosowi w sprzedaży. Po analizie, wyczyszczono procesy operacyjne – odzyskano stabilność i klarowność rośnięcia.
              </p>
            </div>
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <Strawberry size={28} color="var(--accent-tertiary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Firma BERRY (Branża sezonowa)</h3>
              <p style={{ fontWeight: 'bold', color: '#22c55e', marginBottom: '1.5rem', fontSize: '0.875rem' }}>Wzrost o 1,25 mln zł w jednym sezonie</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Borykali się z niską efektywnością i brakiem zaangażowania zespołu. Wprowadziliśmy nowe cele sprzedażowe, system motywacyjny i jasny podział odpowiedzialności.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DLA KOGO JESTEŚMY */}
      <section id="oferta" className="section-padding" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '4rem' }}>
            <div>
              <h2 style={{ marginBottom: '2.5rem', minHeight: '80px' }}>Dla kogo jesteśmy?</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Firmy z sektora MŚP',
                  'Zatrudniające od kilku do kilkudziesięciu osób',
                  'Rozwijające się szybciej niż ich struktura organizacyjna',
                  'Właściciele chcący uporządkować sposób zarządzania firmą'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 color="#22c55e" size={24} style={{ flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 style={{ marginBottom: '2.5rem', minHeight: '80px' }}>Dla kogo <span style={{ color: '#ef4444' }}>NIE</span> jesteśmy?</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Podmioty szukające "szybkich trików" marketingowych',
                  'Firmy, które nie są gotowe zmieniać sposobu działania',
                  'Osoby, które nie chcą pracować systemowo'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontSize: '1.125rem', color: 'var(--text-secondary)', opacity: 0.6, textDecoration: 'line-through' }}>
                    <XCircle color="#ef4444" size={24} style={{ flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: '2rem', fontStyle: 'italic', color: 'var(--text-secondary)', opacity: 0.8 }}>
                Nasze podejście wymaga realnej gotowości do zmian.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ZESPÓŁ */}
      <section id="zespol" className="section-padding">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem' }}>Zespół MIND</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '4rem' }}>Integracja doświadczenia, technologii i operacyjnej skuteczności.</p>
          
          <div className="team-grid" style={{ gap: '3rem' }}>
            
            <div className="glass-panel team-card team-mate-daniel" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '160px', height: '160px', borderRadius: '50%', marginBottom: '1.5rem', border: '3px solid var(--accent-secondary)', overflow: 'hidden', flexShrink: 0 }}>
                <img src="/mind/team/daniel.jpg" alt="Daniel Dahan" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Daniel Dahan</h3>
              <p style={{ color: 'var(--accent-secondary)', fontWeight: 'bold', marginBottom: '1rem', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Systemy technologiczne</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6', flexGrow: 1 }}>
                Pasjonat innowacji łączący świat biznesu z precyzją skalowalnego i nowoczesnego kodu.
              </p>
              <div style={{ textAlign: 'left', width: '100%', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <strong>Specjalista w zakresie:</strong>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                  <li>Optymalizacji systemów biznesowych</li>
                  <li>Automatyzacji procesów</li>
                  <li>Integracji technologii i wdrażania AI</li>
                </ul>
              </div>
            </div>

            <div className="glass-panel team-card team-mate-eytan" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '160px', height: '160px', borderRadius: '50%', marginBottom: '1.5rem', border: '3px solid var(--accent-primary)', overflow: 'hidden', flexShrink: 0 }}>
                <img src="/mind/team/eytan.jpg" alt="Eytan Dahan" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Eytan Dahan</h3>
              <p style={{ color: 'var(--accent-primary)', fontWeight: 'bold', marginBottom: '1rem', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>CEO</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6', flexGrow: 1 }}>
                Przedsiębiorca i doradca biznesowy z ponad 40-letnim doświadczeniem w budowaniu i rozwijaniu firm.
              </p>
              <div style={{ textAlign: 'left', width: '100%', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <strong>Specjalizuje się w:</strong>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                  <li>Strategii rozwoju przedsiębiorstw</li>
                  <li>Systemach zarządzania</li>
                  <li>Strukturach organizacyjnych</li>
                </ul>
              </div>
            </div>

            <div className="glass-panel team-card team-mate-lukasz" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '160px', height: '160px', borderRadius: '50%', marginBottom: '1.5rem', border: '3px solid var(--accent-tertiary)', overflow: 'hidden', flexShrink: 0 }}>
                <img src="/mind/team/lukasz.png" alt="Łukasz Krupa" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Łukasz Krupa</h3>
              <p style={{ color: 'var(--accent-tertiary)', fontWeight: 'bold', marginBottom: '1rem', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Procesy i optymalizacja operacyjna</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6', flexGrow: 1 }}>
                Wnikliwy analityk skutecznie usprawniający nawet w najbardziej zawiłe procesy logistyczne operacji.
              </p>
              <div style={{ textAlign: 'left', width: '100%', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <strong>Specjalista w zakresie:</strong>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                  <li>Mapowania procesów biznesowych</li>
                  <li>Optymalizacji operacyjnej</li>
                  <li>Projektowania systemów procesowych</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA: ROZMOWA STRATEGICZNA */}
      <section id="kontakt" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="glass-panel" style={{ padding: '5rem 2rem', border: '1px solid var(--accent-primary)', background: 'var(--glass-bg)' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Rozmowa Strategiczna</h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', fontWeight: '500', marginBottom: '1.5rem', textAlign: 'center' }}>15 minut, które mogą zmienić sposób patrzenia na Twoją firmę.</p>
            
            <div style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: '1.7', textAlign: 'left' }}>
              <p style={{ marginBottom: '1rem', textAlign: 'center' }}><strong>Podczas spotkania:</strong></p>
              <ul style={{ paddingLeft: '2rem', marginBottom: '1.5rem' }}>
                <li>Spojrzymy na Twoją firmę z zewnątrz</li>
                <li>Zidentyfikujemy główne źródła chaosu</li>
                <li>Pokażemy możliwe kierunki uporządkowania organizacji</li>
              </ul>
              <p style={{ fontStyle: 'italic', textAlign: 'center', fontSize: '0.95rem' }}>Rozmowa nie jest sprzedażą. To moment, w którym sprawdzamy, czy nasze podejście może być pomocne.</p>
            </div>

            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
              <iframe 
                src="https://api.crazy-crm.com/widget/booking/DHXu63ftJx46QdYzUeVC" 
                style={{ width: '100%', border: 'none', minHeight: '650px', display: 'block', borderRadius: 'var(--radius-lg)' }} 
                scrolling="no" 
                id="DHXu63ftJx46QdYzUeVC_1773595317760"
                title="CRAZY CRM Calendar"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding" style={{ background: 'var(--glass-bg)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Często Zadawane Pytania (FAQ)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <details className="faq-item glass-panel">
              <summary className="faq-summary">Czym różni się MIND od klasycznego doradztwa biznesowego?</summary>
              <div className="faq-content">
                <p style={{ color: 'var(--text-secondary)' }}>Większość firm doradczych koncentruje się na jednym obszarze: strategii, marketingu lub technologii. MIND integruje te elementy w jeden spójny system zarządzania organizacją.</p>
              </div>
            </details>
            <details className="faq-item glass-panel">
              <summary className="faq-summary">Czy współpracujecie tylko z dużymi firmami?</summary>
              <div className="faq-content">
                <p style={{ color: 'var(--text-secondary)' }}>Nie. Specjalizujemy się w firmach z sektora MŚP, które chcą uporządkować sposób działania całej organizacji.</p>
              </div>
            </details>
            <details className="faq-item glass-panel">
              <summary className="faq-summary">Czy pomagacie również w sprzedaży?</summary>
              <div className="faq-content">
                <p style={{ color: 'var(--text-secondary)' }}>Tak. W ramach systemu Golden Lead Generation (GLG) na bieżąco budujemy systemy przewidywalnego pozyskiwania klientów.</p>
              </div>
            </details>
            <details className="faq-item glass-panel">
              <summary className="faq-summary">Jak wygląda pierwszy krok współpracy?</summary>
              <div className="faq-content">
                <p style={{ color: 'var(--text-secondary)' }}>Pierwszym krokiem jest krótka rozmowa strategiczna służąca upewnieniu się, czy nasze podejście może pomóc Twojej specyficznej firmie.</p>
              </div>
            </details>
            <details className="faq-item glass-panel">
              <summary className="faq-summary">Czy rozmowa jest zobowiązująca?</summary>
              <div className="faq-content">
                <p style={{ color: 'var(--text-secondary)' }}>W żadnym razie. To jedynie wstępna rozmowa (ok. 15 minut), która nie niesie żadnych kosztów, pozwala jednak ocenić Twoją sytuację organizacyjną z lotu ptaka.</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="section-padding" style={{ background: 'var(--bg-primary)', textAlign: 'center', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="https://idaco.pl/kontakt/polityka-prywatnosci/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Polityka Prywatności</a>
            </div>
            <div>
              &copy; {new Date().getFullYear()} MIND. Wszelkie prawa zastrzeżone.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
