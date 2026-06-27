'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiZoomIn } from 'react-icons/fi';
import styles from '../styles/components.module.css';

export default function PrintsGallery({ images }) {
  if (!images || images.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', borderRadius: '12px' }}>
        <p>Nenhuma imagem encontrada.</p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Adicione arquivos .png ou .jpg na pasta public/screenshots/</p>
      </div>
    );
  }

  return (
    <div className={styles.printsGrid}>
      {images.map((img, index) => (
        <motion.div 
          key={index}
          className={styles.printCard}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          onClick={() => window.open(`/screenshots/${img}`, '_blank')}
        >
          {/* Next/Image necessita width/height ou layout fill */}
          <Image 
            src={`/screenshots/${img}`} 
            alt={`Screenshot ${index + 1}`} 
            fill
            className={styles.printImg}
            unoptimized // Adicionado para lidar com as imagens locais estáticas sem erro de loader
          />
          <div className={styles.printOverlay}>
            <FiZoomIn size={40} color="white" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}