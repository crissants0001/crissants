import DashboardDemo from '../../components/DashboardDemo';

export const metadata = {
  title: 'Dashboards | Fleet Control',
  description: 'Dashboards demonstrativos e funcionais para gestão de frota.'
};

export default function DashboardsPage() {
  return (
    <main style={{ paddingTop: '8rem', minHeight: '100vh' }}>
      <div className="container">
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>Dashboards Fleet Control</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '4rem' }}>
          Demonstração incorporada no site com filtros, abas, gráficos e indicadores simulados.
        </p>
        <DashboardDemo />
      </div>
    </main>
  );
}
