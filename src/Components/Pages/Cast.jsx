import React from "react";
import styles from "./Cast.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as Morty } from "../../../img/morty.svg";
import { useFetch } from "../../Hooks/useFetch";

const Cast = () => {
  const [apiState, setApiState] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const url = `https://rickandmortyapi.com/api/character/?page=${apiState}&name=${search}`;
  const { data, setData, loading, error, pagination } = useFetch(url);

  function searchInput(event) {
    setSearch(event.target.value);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json.results);
        setApiState(1);
      });
  }

  function handleNext() {
    if (apiState >= pagination) {
      return null;
    } else {
      setApiState(apiState + 1);
    }
  }

  if (error) return <p style={{ color: "white" }}>{error}</p>;
  if (!data)
    return (
      <div className={styles.noSearch}>
        <input
          type="text"
          name="search"
          value={search}
          onChange={searchInput}
          placeholder="Search your favorite character"
          className="inputSearch"
        />
        <p>There are no results that match your search.</p>
        <button className="btn" onClick={() => window.location.reload()}>
          BACK
        </button>
        <Morty className={styles.morty} />
      </div>
    );

  return (
    <>
      <main>
        <h1 className={styles.title}>Rick & Morty Characters</h1>
        <div className={styles.search}>
          <input
            type="text"
            name="search"
            value={search}
            onChange={searchInput}
            placeholder="Search your favorite character"
            className="inputSearch"
          />
        </div>

        <section className={`${styles.section} animeLeft`}>
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
                  {dado.status === "Alive" ? (
                    <p>
                      Status:{" "}
                      <span style={{ color: "green" }}> {dado.status}</span>
                    </p>
                  ) : (
                    <p>
                      Status:{" "}
                      <span style={{ color: "red" }}> {dado.status}</span>
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </section>
        <div className={styles.btnMore}>
          <button onClick={handleNext} className={"btn"}>
            MORE
          </button>
        </div>
        {loading && <div className={"loader"}></div>}
      </main>
    </>
  );
};

export default Cast;
