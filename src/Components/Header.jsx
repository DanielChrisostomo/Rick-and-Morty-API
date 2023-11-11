import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.nav}>
          <p>Rick</p>
          <Link to="/">
            <img src="../../img/morty.svg" alt="" />
          </Link>
          <p>Morty</p>
        </div>
      </nav>
    </header>
  );
};

export default Header;
