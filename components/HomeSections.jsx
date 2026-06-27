'use client';
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FiArrowRight, FiGithub, FiTrendingUp, FiMap, 
  FiTruck, FiDroplet, FiUsers, FiMonitor, 
  FiPieChart, FiDollarSign, FiCalendar, FiFileText, 
  FiDownload, FiFilter, FiSearch, FiArrowDown
} from 'react-icons/fi';
import { SiNextdotjs, SiPhp, SiMysql, SiJavascript, SiFramer } from 'react-icons/si';
import styles from '../styles/components.module.css';

// --- Utils de Animação ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// --- Contador Animado (Sem lib externa pesada) ---
const Counter = ({ from, to, duration = 2, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [from, to, duration]);

  return <span>{prefix}{count.toLocaleString('pt-BR')}{suffix}</span>;
};

// --- HERO ---
export const Hero = () => (
  <section className={styles.hero}>
    <motion.div className={styles.heroBg}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
    />
    <div className="container">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
        <motion.h1 variants={fadeInUp} className={styles.heroTitle}>
          FleetControl Suite
        </motion.h1>
        <motion.p variants={fadeInUp} className={styles.heroSubtitle}>
          Sistema Inteligente para Gestão de Frotas, Business Intelligence e Indicadores Operacionais. Transformando operações logísticas em decisões estratégicas através de dashboards analíticos e monitoramento em tempo real.
        </motion.p>
        <motion.div variants={fadeInUp} className={styles.heroButtons}>
          <Link href="#dashboard">
            <button className={styles.btnPrimary}>
              Ver Demonstração <FiArrowRight />
            </button>
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <button className={styles.btnSecondary}>
              <FiGithub /> GitHub
            </button>
          </a>
        </motion.div>
      </motion.div>
    </div>
    <motion.div 
      className={styles.scrollIndicator}
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <span>Scroll</span>
      <FiArrowDown />
    </motion.div>
  </section>
);

// --- KPIs ---
const kpiData = [
  { icon: <FiTrendingUp />, value: 1774265, label: 'Faturamento Monitorado', prefix: '+ R$ ' },
  { icon: <FiMap />, value: 1096, label: 'Viagens Controladas' },
  { icon: <FiMonitor />, value: 243594, label: 'KM Monitorados' },
  { icon: <FiDroplet />, value: 101154, label: 'Diesel Gerenciado (Lts)' },
  { icon: <FiUsers />, value: 21, label: 'Motoristas' },
  { icon: <FiTruck />, value: 23, label: 'Veículos' },
];

export const KPIs = () => (
  <section className={styles.section} id="kpis">
    <div className="container">
      <motion.div 
        className={styles.kpiGrid}
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
      >
        {kpiData.map((kpi, i) => (
          <motion.div key={i} variants={fadeInUp} className={styles.kpiCard}>
            <div className={styles.kpiIcon}>{kpi.icon}</div>
            <div className={styles.kpiValue}>
              <Counter from={0} to={kpi.value} prefix={kpi.prefix} />
            </div>
            <div className={styles.kpiLabel}>{kpi.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// --- DASHBOARD PREVIEW ---
export const DashboardPreview = () => (
  <section className={styles.section} id="dashboard">
    <div className="container">
      <div className={styles.sectionHeader}>
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" className={styles.sectionTitle}>Business Intelligence</motion.h2>
        <p className={styles.sectionSubtitle}>Visão unificada de toda a operação em tempo real.</p>
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={styles.dashboardPreview}
      >
        {/* Adicione uma imagem real na pasta public chamada dashboard-main.webp */}
        <div style={{ width: '100%', height: '600px', background: 'var(--bg-sec)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
          [Screenshot do Dashboard Aqui - Crie o arquivo public/dashboard-main.webp]
        </div>
      </motion.div>
    </div>
  </section>
);

// --- FEATURES ---
const features = [
  { icon: <FiPieChart />, title: 'Dashboard Executivo' },
  { icon: <FiTrendingUp />, title: 'Business Intelligence' },
  { icon: <FiMap />, title: 'Controle de Viagens' },
  { icon: <FiTruck />, title: 'Controle de Frota' },
  { icon: <FiDroplet />, title: 'Controle de Combustível' },
  { icon: <FiDollarSign />, title: 'Controle Financeiro' },
  { icon: <FiCalendar />, title: 'Agenda Operacional' },
  { icon: <FiMonitor />, title: 'Indicadores' },
  { icon: <FiFileText />, title: 'Relatórios' },
  { icon: <FiDownload />, title: 'Exportação PDF/Excel' },
  { icon: <FiFilter />, title: 'Filtros Inteligentes' },
  { icon: <FiSearch />, title: 'Pesquisa Global' },
];

export const Features = () => (
  <section className={styles.section} id="recursos">
    <div className="container">
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Módulos do Sistema</h2>
      </div>
      <motion.div className={styles.featuresGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
        {features.map((feat, i) => (
          <motion.div key={i} variants={fadeInUp} className={styles.featureCard}>
            <div className={styles.featureIcon}>{feat.icon}</div>
            <h3 className={styles.featureTitle}>{feat.title}</h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// --- TIMELINE ---
const timelineSteps = ['Cadastro', 'Operação', 'Viagens', 'Análises', 'Dashboards', 'KPIs', 'Relatórios'];
export const Timeline = () => (
  <section className={styles.section}>
    <div className="container">
      <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '3rem' }}>Fluxo Operacional</h2>
      <div className={styles.timelineWrapper}>
        {timelineSteps.map((step, i) => (
          <motion.div key={i} className={styles.timelineItem} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
            <div className={styles.timelineNode}>{i + 1}</div>
            <div>{step}</div>
            {i < timelineSteps.length - 1 && <div className={styles.timelineLine} />}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- TECHNOLOGIES & ARCHITECTURE ---
const techs = [
  { icon: <SiNextdotjs />, name: 'Next.js' },
  { icon: <SiPhp />, name: 'PHP' },
  { icon: <SiMysql />, name: 'MySQL' },
  { icon: <SiJavascript />, name: 'JavaScript' },
  { icon: <SiFramer />, name: 'Framer Motion' },
];

export const TechArchitecture = () => (
  <section className={styles.section}>
    <div className="container">
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Tecnologias & Arquitetura</h2>
      </div>
      
      <motion.div className={styles.techGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} style={{ marginBottom: '4rem' }}>
        {techs.map((tech, i) => (
          <motion.div key={i} variants={fadeInUp} className={styles.techCard}>
            <div className={styles.techIcon} style={{ color: 'var(--primary)' }}>{tech.icon}</div>
            <div>{tech.name}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className={styles.archDiagram} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
        <div className={styles.archBox}>Frontend (Next.js)</div>
        <FiArrowRight className={styles.archArrow} />
        <div className={styles.archBox}>API / PHP</div>
        <FiArrowRight className={styles.archArrow} />
        <div className={styles.archBox}>MySQL</div>
        <FiArrowRight className={styles.archArrow} />
        <div className={styles.archBox}>Analytics Engine</div>
        <FiArrowRight className={styles.archArrow} />
        <div className={styles.archBox}>Dashboards UI</div>
      </motion.div>
    </div>
  </section>
);

// --- CONTACT ---
export const Contact = () => (
  <section className={styles.contactSection} id="contato">
    <div className="container">
      <h2 className={styles.sectionTitle}>Vamos Conversar?</h2>
      <p className={styles.sectionSubtitle}>Disponível para oportunidades e projetos.</p>
      <div className={styles.socialLinks}>
        <a href="#" className={styles.socialIcon}><FiGithub /></a>
        <a href="#" className={styles.socialIcon}><FiMonitor /></a> {/* LinkedIn placeholder icon */}
        <a href="#" className={styles.socialIcon}><FiFileText /></a> {/* Email placeholder icon */}
      </div>
      <button className={styles.btnPrimary} style={{ margin: '0 auto' }}>Entrar em Contato</button>
    </div>
  </section>
);