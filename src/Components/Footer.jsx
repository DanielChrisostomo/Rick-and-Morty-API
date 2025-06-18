import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Rick } from '../../img/rick.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav>
        <div className={styles.nav}>
          <p>Rick</p>
          <Link to="/">
            <Rick style={{ maxHeight: '40px', maxWidth: '40px' }} />
          </Link>
          <p>Morty</p>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
