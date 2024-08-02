import { useState, useEffect } from "react";
import axios from "axios";

const ALL_COUNTRIES_URL =
  "https://studies.cs.helsinki.fi/restcountries/api/all";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [found, setFound] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;

    if (value !== "") {
      const found = allCountries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(e.target.value.toLowerCase()),
      );
      setFound(found);
      setSearchTerm(value);
    } else {
      setFound([]);
      setSearchTerm("");
    }
  };

  const handleShowCountry = (idx) => {
    setFound([found[idx]]);
    setSearchTerm(found[idx].name.common);
  };

  // Get countries at initial render
  useEffect(() => {
    axios
      .get(ALL_COUNTRIES_URL)
      .then((res) => {
        setAllCountries(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <p>Find country</p>
      <input value={searchTerm} onChange={handleSearch} />
      <DisplayFound data={found} handleShowCountry={handleShowCountry} />
    </>
  );
}

const DisplayFound = ({ data, handleShowCountry }) => {
  if (data.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (data.length === 1) {
    return (
      <div>
        <h1>{data[0].name.common}</h1>
        <p>Capital: {data[0].capital[0]}</p>
        <p>Area: {data[0].area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(data[0].languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={data[0].flags.png} alt={`${data[0].name.common}-flag`} />
      </div>
    );
  }

  return (
    <div>
      {data.map((country, idx) => (
        <div key={idx}>
          <p>{country.name.common}</p>
          <button onClick={() => handleShowCountry(idx)}>Show</button>
        </div>
      ))}
    </div>
  );
};

export default App;
