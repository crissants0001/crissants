'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiCommand } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/components.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? 'glass' : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/">
          <motion.div whileHover={{ scale: 1.05 }} className={styles.logo}>
            <FiCommand /> <span>FleetControl</span>
          </motion.div>
        </Link>

        <div className={`${styles.navLinks} ${isOpen ? styles.mobileOpen : ''}`}>
          <Link href="/#recursos" onClick={() => setIsOpen(false)}>Recursos</Link>
          <Link href="/#dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link href="/prints" onClick={() => setIsOpen(false)}>Screenshots</Link>
          <Link href="/#contato" onClick={() => setIsOpen(false)}>Contato</Link>
        </div>

        <button className={styles.menuMobileBtn} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
}