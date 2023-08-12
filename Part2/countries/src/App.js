import { useState, useEffect } from "react";
import CountriesService from "./services/countries";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import "./index.css"

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newName, setNewName] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [weather, setWeather] = useState([])
  const [selectedCountries, setSelectedCountries] = useState(false)

  const hook = () => {
    CountriesService.getAll().then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(hook, []);


  return (
    <div>
      <Filter setNewFilter={setNewFilter}
       newFilter={newFilter} 
       />

      <Countries
        newFilter={newFilter}
        countries={countries}
        setCountries={setCountries}
        newName={newName}
        setNewName={setNewName}
        weather={weather}
        setWeather={setWeather}
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
      />
    </div>
  );
};

export default App;