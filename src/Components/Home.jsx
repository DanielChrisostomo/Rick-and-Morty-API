import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <Link to="/cast">
          <button className="btn">Characters</button>
        </Link>
      </div>
    </>
  );
};

export default Home;
