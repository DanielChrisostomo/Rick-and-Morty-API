import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav>
        <div className={styles.nav}>
          <p>Rick</p>
          <Link to="/">
            <img src="../../img/rick.svg" alt="" />
          </Link>
          <p>Morty</p>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
