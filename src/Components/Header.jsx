import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Morty } from '../../img/morty.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.nav}>
          <p>Rick</p>
          <Link to="/">
            <Morty style={{ maxHeight: '40px', maxWidth: '40px' }} />
          </Link>
          <p>Morty</p>
        </div>
      </nav>
    </header>
  );
};

export default Header;
