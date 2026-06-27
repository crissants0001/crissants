import styles from '../styles/components.module.css';
import { FiCommand } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <FiCommand size={24} color="var(--primary)" />
          <h2 style={{ color: 'white' }}>FleetControl Suite</h2>
        </div>
        <p>Desenvolvido como demonstração de interface e arquitetura de software.</p>
        <p style={{ marginTop: '2rem', fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} FleetControl. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}