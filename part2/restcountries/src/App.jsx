import { useState, useEffect } from "react";
import axios from "axios";

const ALL_COUNTRIES_URL =
  "https://studies.cs.helsinki.fi/restcountries/api/all";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${WEATHER_API_KEY}&q=`;
const WEATHER_ICON_URL = "https://openweathermap.org/img/wn";

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
    return <DisplayOneCountry data={data[0]} />;
  }

  return (
    <>
      {data.map((country, idx) => (
        <div key={idx}>
          <p>{country.name.common}</p>
          <button onClick={() => handleShowCountry(idx)}>Show</button>
        </div>
      ))}
    </>
  );
};

const DisplayOneCountry = ({ data }) => {
  return (
    <>
      <h1>{data.name.common}</h1>
      <p>Capital: {data.capital[0]}</p>
      <p>Area: {data.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(data.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={data.flags.png} alt={`${data.name.common}-flag`} />
      <DisplayWeather name={data.capital[0]} />
    </>
  );
};

const DisplayWeather = ({ name }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (name) {
      axios
        .get(`${WEATHER_URL}${name}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [name]);

  if (!data) {
    return null;
  }

  return (
    <>
      <h2>Weather in {name}</h2>
      <p>Temperature: {data.main.temp} °C</p>
      <img
        src={`${WEATHER_ICON_URL}/${data.weather[0].icon}@2x.png`}
        alt="weather-icon"
      />
      <p>Wind: {data.wind.speed} m/s</p>
    </>
  );
};

export default App;
