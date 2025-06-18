import React from "react";
import styles from "./Cast.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as Morty } from "../../img/morty.svg";
import { useDebounce } from "../Hooks/useDebounce";

const Cast = () => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [apiState, setApiState] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [pagination, setPagination] = React.useState(1);

  const debouncedSearch = useDebounce(search, 500);

  React.useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const url = `https://rickandmortyapi.com/api/character/?page=${apiState}&name=${debouncedSearch}`;
        const response = await fetch(url);
        const json = await response.json();
        if (!response.ok) throw new Error("Error trying fetch data");
        setPagination(json.info.pages);
        setData(json.results);
      } catch (err) {
        if (isMounted) {
          setError("An error has occurred or no results found.");
          setData([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();
    return () => { isMounted = false; };
  }, [apiState, debouncedSearch]);

  function handleSearchInput(event) {
    setSearch(event.target.value);
    setApiState(1); 
  }

  function handleNext() {
    if (apiState < pagination) {
      setApiState((prev) => prev + 1);
    }
  }

  if (error) {
    return (
      <div className={styles.noSearch}>
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleSearchInput}
          placeholder="Search your favorite character"
          className="inputSearch"
        />
        <p>There are no results that match your search.</p>
        <button className="btn" onClick={() => { setSearch(""); setApiState(1); setError(null); }}>
          BACK
        </button>
        <Morty className={styles.morty} />
      </div>
    );
  }

  return (
    <main>
      <h1 className={styles.title}>Rick & Morty Characters</h1>
      <div className={styles.search}>
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleSearchInput}
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
                <p>
                  Status:
                  <span style={{ color: dado.status === "Alive" ? "green" : "red" }}>
                    {" "}{dado.status}
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>
      <div className={styles.btnMore}>
        <button onClick={handleNext} className={"btn"} disabled={apiState >= pagination || loading}>
          MORE
        </button>
      </div>
      {loading && <div className={"loader"}></div>}
    </main>
  );
};

export default Cast;
