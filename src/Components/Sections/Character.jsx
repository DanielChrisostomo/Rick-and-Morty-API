import React from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import styles from './Character.module.css';

const Character = () => {
  const { id } = useParams();

  const [characters, setCharacters] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const url = `https://rickandmortyapi.com/api/character/${id}`;

  React.useEffect(() => {
    async function request() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setCharacters(json);
      } catch (err) {
        setError('An error has occurred');
      } finally {
        setLoading(false);
      }
    }
    request();
  }, []);

  if (loading) return <div className="loader"></div>;
  if (error) return <p>{error}</p>;
  if (characters === null) return null;
  return (
    <>
      <div className={`${styles.container} animeLeft`}>
        <div className={styles.img}>
          <img src={characters.image} alt={characters.name} />
          {/* <Link to="/cast">
            <button className="btn">BACK</button>
          </Link> */}
        </div>
        <div>
          <h1>{characters.name}</h1>
          <div className={styles.info}>
            <p>Status: {characters.status}</p>
            <p>Specie: {characters.species}</p>
            <p>Gender: {characters.gender}</p>
            <p>Origin: {characters.origin.name}</p>
            {characters.type === '' ? null : <p>Type: {characters.type}</p>}
            <p>Last known location: {characters.location.name}</p>
            <div className={styles.rick}></div>
          </div>
        </div>
      </div>
      <div className={styles.botao}>
        <Link to="/cast">
          <button className={'btn'}>BACK</button>
        </Link>{' '}
      </div>
    </>
  );
};

export default Character;
