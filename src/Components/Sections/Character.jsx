import React from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import styles from './Character.module.css';

const Character = () => {
  const { id } = useParams();

  const [characters, setCharacters] = React.useState(null);
  const url = `https://rickandmortyapi.com/api/character/${id}`;

  React.useEffect(() => {
    async function request() {
      const response = await fetch(url);
      const json = await response.json();
      setCharacters(json);
      console.log(json);
    }
    request();
  }, []);

  if (characters === null) return null;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.img}>
          <img src={characters.image} alt={characters.name} />
          <Link to="/cast">
            <button className="btn">BACK</button>
          </Link>
        </div>
        <div className="animeLeft">
          <h1>{characters.name}</h1>
          <div className={styles.info}>
            <p>Status: {characters.status}</p>
            <p>Specie: {characters.species}</p>
            <p>Gender: {characters.gender}</p>
            <p>Origin: {characters.origin.name}</p>
            <p>Last known location: {characters.location.name}</p>
            <div className={styles.rick}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Character;
