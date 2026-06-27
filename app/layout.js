import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'FleetControl Suite | SaaS Premium',
  description: 'Sistema Inteligente para Gestão de Frotas, Business Intelligence e Indicadores Operacionais.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}