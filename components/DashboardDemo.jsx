'use client';

import { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { FiActivity, FiAlertTriangle, FiBarChart2, FiCheckCircle, FiFilter, FiTruck } from 'react-icons/fi';
import styles from '../styles/components.module.css';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
);

const operations = [
  { label: 'Todas', value: 'all' },
  { label: 'Areia', value: 'Areia' },
  { label: 'Biometano', value: 'Biometano' },
  { label: 'Coleta', value: 'Coleta' }
];

const periods = [
  { label: '30 dias', value: 30, months: ['Set/26'] },
  { label: '60 dias', value: 60, months: ['Ago/26', 'Set/26'] },
  { label: '90 dias', value: 90, months: ['Jul/26', 'Ago/26', 'Set/26'] }
];

const rows = [
  { month: 'Jul/26', operation: 'Areia', trips: 180, revenue: 294100, km: 40100, diesel: 16800, tollIssued: 38600, tollCredited: 36045, vehicles: 19, availability: 92, maintenance: 5 },
  { month: 'Jul/26', operation: 'Biometano', trips: 65, revenue: 103000, km: 14400, diesel: 6200, tollIssued: 10600, tollCredited: 10195, vehicles: 7, availability: 96, maintenance: 1 },
  { month: 'Jul/26', operation: 'Coleta', trips: 90, revenue: 149000, km: 20500, diesel: 8400, tollIssued: 14100, tollCredited: 13680, vehicles: 10, availability: 90, maintenance: 4 },
  { month: 'Ago/26', operation: 'Areia', trips: 205, revenue: 332600, km: 45600, diesel: 18900, tollIssued: 43900, tollCredited: 40910, vehicles: 21, availability: 94, maintenance: 4 },
  { month: 'Ago/26', operation: 'Biometano', trips: 70, revenue: 115000, km: 15500, diesel: 6700, tollIssued: 11900, tollCredited: 11480, vehicles: 7, availability: 97, maintenance: 1 },
  { month: 'Ago/26', operation: 'Coleta', trips: 115, revenue: 180000, km: 27500, diesel: 11400, tollIssued: 17600, tollCredited: 16840, vehicles: 11, availability: 91, maintenance: 4 },
  { month: 'Set/26', operation: 'Areia', trips: 195, revenue: 316700, km: 43000, diesel: 17650, tollIssued: 42100, tollCredited: 39185, vehicles: 23, availability: 95, maintenance: 4 },
  { month: 'Set/26', operation: 'Biometano', trips: 66, revenue: 108500, km: 14800, diesel: 6250, tollIssued: 11300, tollCredited: 10910, vehicles: 8, availability: 98, maintenance: 1 },
  { month: 'Set/26', operation: 'Coleta', trips: 110, revenue: 175365.92, km: 22194, diesel: 8854, tollIssued: 16200, tollCredited: 15720, vehicles: 11, availability: 93, maintenance: 3 }
];

const panels = [
  { label: 'Resumo', value: 'resumo' },
  { label: 'Pedágio', value: 'pedagio' },
  { label: 'Frota', value: 'frota' },
  { label: 'Relatórios', value: 'relatorios' }
];

const managerialReport = [
  { label: 'Viagens finalizadas', value: 650, details: '177 casa / 473 freteiro' },
  { label: 'Fora do prazo', value: 214, details: '54 casa / 160 freteiro' },
  { label: 'Clientes atendidos', value: 38, details: 'Carteira ativa no período' },
  { label: 'Cargas em rota', value: 15, details: '10 casa / 5 freteiro' },
  { label: 'Pedidos pendentes', value: 9, details: 'Fila operacional' },
  { label: 'Canceladas / DARJ', value: 3, details: '1 casa / 2 freteiro' }
];

const fuelReport = [
  { day: '11/06/2026', supplies: 1, plates: 1, drivers: 1, liters: '330,01 L', cost: '- R$ 2.293,56' },
  { day: '10/06/2026', supplies: 3, plates: 3, drivers: 3, liters: '1.258,93 L', cost: '- R$ 8.749,62' },
  { day: '09/06/2026', supplies: 2, plates: 2, drivers: 1, liters: '478,95 L', cost: '- R$ 3.223,45' },
  { day: '08/06/2026', supplies: 1, plates: 1, drivers: 1, liters: '550,00 L', cost: '- R$ 3.822,50' },
  { day: '05/06/2026', supplies: 4, plates: 3, drivers: 2, liters: '1.018,44 L', cost: '- R$ 6.835,37' }
];

const loadingAgenda = [
  { day: 1, trips: 9 }, { day: 2, trips: 14 }, { day: 3, trips: 23, extra: true },
  { day: 4, trips: 14 }, { day: 5, trips: 13 }, { day: 6, trips: 8 },
  { day: 8, trips: 10 }, { day: 9, trips: 19 }, { day: 10, trips: 19 },
  { day: 11, trips: 23, extra: true }, { day: 12, trips: 18 }, { day: 13, trips: 11 },
  { day: 15, trips: 11 }, { day: 16, trips: 22, extra: true }, { day: 17, trips: 21, extra: true },
  { day: 18, trips: 23, extra: true }, { day: 19, trips: 19 }, { day: 20, trips: 2 },
  { day: 22, trips: 15 }, { day: 23, trips: 16 }, { day: 24, trips: 19 },
  { day: 25, trips: 8 }, { day: 26, trips: 23, extra: true }, { day: 27, trips: 9 }
];

const chartColors = {
  primary: '#ff6b2d',
  secondary: '#ffb020',
  green: '#32d583',
  blue: '#5ea1ff',
  muted: 'rgba(255,255,255,0.16)'
};

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const number = new Intl.NumberFormat('pt-BR');

const sum = (data, key) => data.reduce((total, item) => total + item[key], 0);
const average = (data, key) => Math.round(data.reduce((total, item) => total + item[key], 0) / Math.max(data.length, 1));

function groupByMonth(data, key) {
  return ['Jul/26', 'Ago/26', 'Set/26'].map((month) => sum(data.filter((item) => item.month === month), key));
}

function groupByOperation(data, key) {
  return ['Areia', 'Biometano', 'Coleta'].map((operation) => sum(data.filter((item) => item.operation === operation), key));
}

const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: '#ffffff', boxWidth: 12, usePointStyle: true }
    },
    tooltip: {
      backgroundColor: '#181818',
      borderColor: 'rgba(255,255,255,0.08)',
      borderWidth: 1
    }
  },
  scales: {
    x: {
      ticks: { color: '#888888' },
      grid: { color: 'rgba(255,255,255,0.05)' }
    },
    y: {
      ticks: { color: '#888888' },
      grid: { color: 'rgba(255,255,255,0.05)' }
    }
  }
};

function MetricCard({ icon, label, value, note, tone = 'default' }) {
  return (
    <div className={`${styles.metricCard} ${styles[`metric${tone}`] || ''}`}>
      <div className={styles.metricIcon}>{icon}</div>
      <span className={styles.metricLabel}>{label}</span>
      <strong className={styles.metricValue}>{value}</strong>
      <small className={styles.metricNote}>{note}</small>
    </div>
  );
}

export default function DashboardDemo({ compact = false }) {
  const [period, setPeriod] = useState(90);
  const [operation, setOperation] = useState('all');
  const [activePanel, setActivePanel] = useState('resumo');

  const activePeriod = periods.find((item) => item.value === period) || periods[2];

  const filteredRows = useMemo(() => rows.filter((item) => (
    activePeriod.months.includes(item.month) && (operation === 'all' || item.operation === operation)
  )), [activePeriod, operation]);

  const totals = useMemo(() => {
    const tollGap = sum(filteredRows, 'tollIssued') - sum(filteredRows, 'tollCredited');
    return {
      revenue: sum(filteredRows, 'revenue'),
      trips: sum(filteredRows, 'trips'),
      km: sum(filteredRows, 'km'),
      diesel: sum(filteredRows, 'diesel'),
      tollIssued: sum(filteredRows, 'tollIssued'),
      tollCredited: sum(filteredRows, 'tollCredited'),
      tollGap,
      vehicles: Math.max(...filteredRows.map((item) => item.vehicles), 0),
      availability: average(filteredRows, 'availability'),
      maintenance: sum(filteredRows, 'maintenance')
    };
  }, [filteredRows]);

  const revenueData = {
    labels: ['Jul/26', 'Ago/26', 'Set/26'],
    datasets: [
      {
        label: 'Faturamento',
        data: groupByMonth(filteredRows, 'revenue'),
        borderColor: chartColors.primary,
        backgroundColor: 'rgba(255,107,45,0.16)',
        pointBackgroundColor: chartColors.primary,
        fill: true,
        tension: 0.4
      },
      {
        label: 'KM rodados',
        data: groupByMonth(filteredRows, 'km'),
        borderColor: chartColors.blue,
        backgroundColor: 'rgba(94,161,255,0.12)',
        pointBackgroundColor: chartColors.blue,
        fill: true,
        tension: 0.4
      }
    ]
  };

  const operationData = {
    labels: ['Areia', 'Biometano', 'Coleta'],
    datasets: [
      {
        label: 'Viagens',
        data: groupByOperation(filteredRows, 'trips'),
        backgroundColor: [chartColors.primary, chartColors.green, chartColors.blue],
        borderWidth: 0
      }
    ]
  };

  const tollData = {
    labels: ['Jul/26', 'Ago/26', 'Set/26'],
    datasets: [
      {
        label: 'Vale emitido',
        data: groupByMonth(filteredRows, 'tollIssued'),
        backgroundColor: 'rgba(255,107,45,0.72)',
        borderRadius: 8
      },
      {
        label: 'Crédito recebido',
        data: groupByMonth(filteredRows, 'tollCredited'),
        backgroundColor: 'rgba(50,213,131,0.72)',
        borderRadius: 8
      }
    ]
  };

  const fleetData = {
    labels: ['Jul/26', 'Ago/26', 'Set/26'],
    datasets: [
      {
        label: 'Viagens',
        data: groupByMonth(filteredRows, 'trips'),
        backgroundColor: 'rgba(255,107,45,0.7)',
        borderRadius: 8
      },
      {
        label: 'Litros diesel',
        data: groupByMonth(filteredRows, 'diesel'),
        backgroundColor: 'rgba(255,176,32,0.62)',
        borderRadius: 8
      }
    ]
  };

  return (
    <div className={`${styles.dashboardShell} ${compact ? styles.dashboardCompact : ''}`}>
      <div className={styles.dashboardTop}>
        <div>
          <span className={styles.dashboardBadge}>Fleet Control BI</span>
          <h3>Central demonstrativa de operação</h3>
          <p>Filtros, abas, gráficos e relatórios fictícios inspirados nas telas originais de operação.</p>
        </div>

        <div className={styles.dashboardToolbar}>
          <div className={styles.filterGroup} aria-label="Filtro de período">
            <FiFilter />
            {periods.map((item) => (
              <button
                key={item.value}
                className={period === item.value ? styles.filterActive : ''}
                onClick={() => setPeriod(item.value)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className={styles.filterGroup} aria-label="Filtro de operação">
            {operations.map((item) => (
              <button
                key={item.value}
                className={operation === item.value ? styles.filterActive : ''}
                onClick={() => setOperation(item.value)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.dashboardTabs}>
        {panels.map((panel) => (
          <button
            key={panel.value}
            type="button"
            className={activePanel === panel.value ? styles.activeTab : ''}
            onClick={() => setActivePanel(panel.value)}
          >
            {panel.label}
          </button>
        ))}
      </div>

      {activePanel === 'resumo' && (
        <>
          <div className={styles.metricGrid}>
            <MetricCard icon={<FiBarChart2 />} label="Faturamento" value={currency.format(totals.revenue)} note="Receita monitorada no período" />
            <MetricCard icon={<FiTruck />} label="Viagens" value={number.format(totals.trips)} note={`${number.format(totals.km)} km acompanhados`} />
            <MetricCard icon={<FiActivity />} label="Consumo" value={`${number.format(totals.diesel)} L`} note="Diesel gerenciado por operação" />
            <MetricCard icon={<FiCheckCircle />} label="Disponibilidade" value={`${totals.availability}%`} note="Média da frota ativa" tone="Success" />
          </div>

          <div className={styles.dashboardGrid}>
            <div className={`${styles.chartPanel} ${styles.chartWide}`}>
              <div className={styles.chartHeader}>
                <strong>Faturamento x KM</strong>
                <span>Atualização em tempo real</span>
              </div>
              <div className={styles.chartArea}>
                <Line data={revenueData} options={baseChartOptions} />
              </div>
            </div>

            <div className={styles.chartPanel}>
              <div className={styles.chartHeader}>
                <strong>Viagens por operação</strong>
                <span>Distribuição filtrada</span>
              </div>
              <div className={styles.chartArea}>
                <Doughnut
                  data={operationData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: baseChartOptions.plugins
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {activePanel === 'pedagio' && (
        <>
          <div className={styles.metricGrid}>
            <MetricCard icon={<FiBarChart2 />} label="Vale emitido" value={currency.format(totals.tollIssued)} note="Valor previsto nos lançamentos" />
            <MetricCard icon={<FiCheckCircle />} label="Recebido" value={currency.format(totals.tollCredited)} note="Crédito demonstrativo conciliado" tone="Success" />
            <MetricCard icon={<FiAlertTriangle />} label="Divergência" value={currency.format(totals.tollGap)} note="Diferença para conferência" tone="Warning" />
            <MetricCard icon={<FiActivity />} label="Aderência" value={`${Math.round((totals.tollCredited / Math.max(totals.tollIssued, 1)) * 100)}%`} note="Crédito sobre vale emitido" />
          </div>

          <div className={styles.dashboardGrid}>
            <div className={`${styles.chartPanel} ${styles.chartWide}`}>
              <div className={styles.chartHeader}>
                <strong>Vale-pedágio emitido x recebido</strong>
                <span>Comparativo mensal</span>
              </div>
              <div className={styles.chartArea}>
                <Bar data={tollData} options={baseChartOptions} />
              </div>
            </div>

            <div className={styles.chartPanel}>
              <div className={styles.chartHeader}>
                <strong>Conciliação</strong>
                <span>Linhas demonstrativas</span>
              </div>
              <div className={styles.demoTable}>
                {filteredRows.slice(0, 5).map((item) => (
                  <div className={styles.demoTableRow} key={`${item.month}-${item.operation}`}>
                    <span>{item.month}</span>
                    <strong>{item.operation}</strong>
                    <small>{currency.format(item.tollIssued - item.tollCredited)}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activePanel === 'frota' && (
        <>
          <div className={styles.metricGrid}>
            <MetricCard icon={<FiTruck />} label="Veículos ativos" value={number.format(totals.vehicles)} note="Maior frota em operação no filtro" />
            <MetricCard icon={<FiActivity />} label="Viagens" value={number.format(totals.trips)} note="Ordem de transporte consolidada" />
            <MetricCard icon={<FiCheckCircle />} label="Disponibilidade" value={`${totals.availability}%`} note="Meta operacional: 95%" tone="Success" />
            <MetricCard icon={<FiAlertTriangle />} label="Manutenções" value={number.format(totals.maintenance)} note="Abertas no período" tone="Warning" />
          </div>

          <div className={styles.dashboardGrid}>
            <div className={`${styles.chartPanel} ${styles.chartWide}`}>
              <div className={styles.chartHeader}>
                <strong>Viagens x consumo</strong>
                <span>Produtividade da frota</span>
              </div>
              <div className={styles.chartArea}>
                <Bar data={fleetData} options={baseChartOptions} />
              </div>
            </div>

            <div className={styles.chartPanel}>
              <div className={styles.chartHeader}>
                <strong>Status operacional</strong>
                <span>Fila demonstrativa</span>
              </div>
              <div className={styles.statusList}>
                {[
                  ['Frota liberada', totals.availability, 'success'],
                  ['Rotas no prazo', 88, 'default'],
                  ['Conferência pedágio', 76, 'warning']
                ].map(([label, value, tone]) => (
                  <div className={styles.statusItem} key={label}>
                    <div>
                      <strong>{label}</strong>
                      <span>{value}%</span>
                    </div>
                    <div className={styles.progressTrack}>
                      <span className={`${styles.progressFill} ${styles[tone] || ''}`} style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activePanel === 'relatorios' && (
        <div className={styles.reportsStack}>
          <section className={styles.reportPanel}>
            <div className={styles.reportTitle}>
              <div>
                <span>Relatório Logística</span>
                <h4>Visão Geral Fleet Control</h4>
              </div>
              <small>Última atualização: 20:29:13</small>
            </div>
            <div className={styles.reportKpiGrid}>
              <MetricCard icon={<FiBarChart2 />} label="Total de viagens" value="1.096" note="Base demonstrativa do relatório" />
              <MetricCard icon={<FiActivity />} label="Faturamento total" value="R$ 1.774.265,92" note="Média por viagem: R$ 1.618,86" />
              <MetricCard icon={<FiTruck />} label="KM total" value="243.594" note="11 motoristas / 10 veículos" />
            </div>
          </section>

          <section className={styles.reportPanel}>
            <div className={styles.reportTitle}>
              <div>
                <span>Painel Gerencial</span>
                <h4>Resumo de prazos, clientes e cargas</h4>
              </div>
              <small>Período: Junho/2026</small>
            </div>
            <div className={styles.managerGrid}>
              {managerialReport.map((item) => (
                <div className={styles.managerCard} key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <small>{item.details}</small>
                </div>
              ))}
            </div>
          </section>

          <div className={styles.reportTwoColumns}>
            <section className={styles.reportPanel}>
              <div className={styles.reportTitle}>
                <div>
                  <span>Combustível</span>
                  <h4>Abastecimentos por dia</h4>
                </div>
                <small>Custo operacional separado do frete</small>
              </div>
              <div className={styles.fuelSummary}>
                <strong>R$ 661.557,08</strong>
                <span>101.154 L diesel | 2,30 km/l | 3.192 L Arla</span>
              </div>
              <div className={styles.reportTable}>
                <div className={styles.reportTableHead}>
                  <span>Dia</span><span>Abast.</span><span>Placas</span><span>Litros</span><span>Gasto</span>
                </div>
                {fuelReport.map((item) => (
                  <div className={styles.reportTableRow} key={item.day}>
                    <span>{item.day}</span>
                    <span>{item.supplies}</span>
                    <span>{item.plates}</span>
                    <span>{item.liters}</span>
                    <span>{item.cost}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.reportPanel}>
              <div className={styles.reportTitle}>
                <div>
                  <span>Agenda de Carregamento</span>
                  <h4>Junho 2026</h4>
                </div>
                <small>Dias com viagens extras destacados</small>
              </div>
              <div className={styles.calendarGrid}>
                {loadingAgenda.map((item) => (
                  <div className={`${styles.calendarCell} ${item.extra ? styles.calendarExtra : ''}`} key={item.day}>
                    <strong>{item.day}</strong>
                    <span>{item.trips} viagens</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className={styles.reportTwoColumns}>
            <section className={styles.reportPanel}>
              <div className={styles.reportTitle}>
                <div>
                  <span>Detalhes da Entrega</span>
                  <h4>Pedido #1659</h4>
                </div>
                <small>Ficha operacional fictícia</small>
              </div>
              <div className={styles.deliveryDetails}>
                <p><strong>Cliente:</strong> POLIMIX</p>
                <p><strong>Localidade:</strong> Cachoeiras de Macacu</p>
                <p><strong>Tipo de areia:</strong> Areia Média</p>
                <p><strong>Prazo limite:</strong> 25/06/2026 - dentro do prazo</p>
                <p><strong>Voucher da fazenda:</strong> 551291</p>
                <p><strong>Motorista:</strong> Leonardo</p>
                <p><strong>Placa:</strong> LLC1F87</p>
                <p><strong>Tipo de frota:</strong> Agregado/Freteiro</p>
              </div>
            </section>

            <section className={styles.reportPanel}>
              <div className={styles.reportTitle}>
                <div>
                  <span>Lançamento</span>
                  <h4>Viagens, fretes e abastecimentos</h4>
                </div>
                <small>Modelo de cadastro demonstrativo</small>
              </div>
              <div className={styles.launchPreview}>
                <div><span>Data da viagem</span><strong>26/06/2026</strong></div>
                <div><span>Origem</span><strong>Areal Tosana</strong></div>
                <div><span>Destino</span><strong>Cliente / contrato</strong></div>
                <div><span>Material</span><strong>Minério</strong></div>
                <div><span>Tipo de frota</span><strong>Carro da casa</strong></div>
                <div><span>Status</span><strong>Concluída</strong></div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
