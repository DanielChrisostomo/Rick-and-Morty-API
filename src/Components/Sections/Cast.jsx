import React from 'react';
import styles from './Cast.module.css';
import { Link } from 'react-router-dom';

const Cast = () => {
  const [data, setData] = React.useState([]);
  const [apiState, setApiState] = React.useState(1);
  const [search, setSearch] = React.useState('');

  let url = `https://rickandmortyapi.com/api/character/?page=${apiState}&name=${search}`;

  React.useEffect(() => {
    async function request() {
      const response = await fetch(url);
      const json = await response.json();
      if (!data.length) setData(json.results);
      else setData([...data, ...json.results]);
    }
    request();
  }, [apiState]);

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(url);
    const json = await response.json();
    console.log(event);
    setData(json.results);
    setSearch(search);
    console.log(json);
  }

  function handleNext() {
    if (apiState >= 42) {
      return null;
    } else {
      setApiState(apiState + 1);
      console.log(url);
    }
  }

  if (!data) return null;
  return (
    <>
      <main>
        <h1 className={styles.title}>Rick & Morty Characters</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
          <button>search</button>
        </form>

        <section className={styles.section}>
          {data.map((dado) => (
            <Link key={dado.id} to={`character/${dado.id}`}>
              <div className={styles.container}>
                <div>
                  <img
                    className={styles.img}
                    src={dado.image}
                    alt={dado.name}
                  />
                </div>
                <div>
                  <h2>{dado.name}</h2>
                  {dado.status === 'Alive' ? (
                    <p>
                      Status:{' '}
                      <span style={{ color: 'green' }}> {dado.status}</span>
                    </p>
                  ) : (
                    <p>
                      Status:{' '}
                      <span style={{ color: 'red' }}> {dado.status}</span>
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </section>
        <div className={styles.btnMore}>
          <button onClick={handleNext} className={'btn'}>
            MORE
          </button>
        </div>
      </main>
    </>
  );
};

export default Cast;
