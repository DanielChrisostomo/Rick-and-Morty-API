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
      if (data === null) setData(json.results);
      else setData([...data, ...json.results]);
      console.log(url);
    }
    request();
  }, [apiState]);

  function handleSubmit(event) {
    setSearch(event.target.value);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json.results);
        setApiState(1);
      });
  }

  function handleNext() {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.info.pages);
        if (apiState >= json.info.pages) {
          return null;
        } else {
          setApiState(apiState + 1);
        }
      });
  }

  if (!data) return null;
  return (
    <>
      <main>
        <h1 className={styles.title}>Rick & Morty Characters</h1>

        <div className={styles.form}>
          <input type="text" value={search} onChange={handleSubmit} />
          <button>search</button>
        </div>

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
