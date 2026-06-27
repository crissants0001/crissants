import fs from 'fs';
import path from 'path';
import PrintsGallery from '../../components/PrintsGallery';

export const metadata = {
  title: 'Screenshots | FleetControl',
};

export default function PrintsPage() {
  // Lendo a pasta de screenshots dinamicamente
  const dirPath = path.join(process.cwd(), 'public/screenshots');
  let images = [];
  
  try {
    const files = fs.readdirSync(dirPath);
    images = files.filter(file => /\.(png|jpe?g|webp)$/i.test(file));
  } catch (err) {
    console.error("Pasta public/screenshots não encontrada ou vazia.");
  }

  return (
    <main style={{ paddingTop: '8rem', minHeight: '100vh' }}>
      <div className="container">
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>Galeria do Sistema</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '4rem' }}>
          Explore as interfaces e dashboards do FleetControl Suite.
        </p>
        <PrintsGallery images={images} />
      </div>
    </main>
  );
}