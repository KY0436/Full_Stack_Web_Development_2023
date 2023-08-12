import React, { useEffect, useState } from 'react'
const Weather_API_Key = process.env.REACT_APP_API_KEY
console.log(Weather_API_Key)
import axios from 'axios'

// Displaying the weather of captial in the selected country
const CheckWeather = ({capital, personal_API, weather, setWeather}) =>{
    // For Exercise 2.11
    const hook0 = () => {
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${personal_API}&units=metric`)
        .then(response => {
          setWeather([response.data.main.temp, 
            response.data.weather[0].icon, 
            response.data.wind.speed]);
          console.log(response.data)
        })
    }
    
    useEffect(hook0, [capital])
  return(
    <div>
      <p>temperature {weather[0]} Celcius</p>
      <img src= {`https://openweathermap.org/img/wn/${weather[1]}@2x.png`}/>
      <p>wind {weather[2]} m/s</p>
    </div>
  )
}

// The handler for showing all the information including weather and geography, when selected
const HandleShow = ({singleCountry, weather, setWeather}) => {
  return(
    <div>
      <h1>
        {singleCountry[0].name.common}
      </h1>
      <p> 
        capital {singleCountry[0].capital} 
      </p>
      <p> 
        area {singleCountry[0].area} kilometers
      </p>      
      <h2>
        languages
      </h2>
      <ul>
        {Object.values(singleCountry[0].languages).map
        (language => <li key={language.name}>{language}</li>)}
      </ul>
      <img src={singleCountry[0].flags.png} />
      <h2>
        Weather in {singleCountry[0].capital} 
      </h2>      
      <CheckWeather capital={singleCountry[0].capital} personal_API={Weather_API_Key} weather={weather} setWeather={setWeather}/>
    </div>
  )
}



const Countries = ({newFilter, countries, newName, setNewName, setCountries, weather, setWeather, selectedCountries, setSelectedCountries}) => {
  const countriesToShow =
    newFilter === ""
      ? ""
      : countries.filter((country) =>
      country.name.common.toLowerCase().includes(newFilter.toLowerCase())
        );
  // The case with more than 10 countries repetitive with the filter
  if (countriesToShow.length > 10) {
    return(
      <p>Too many matches, specify another filter</p>
    )
  }

  // The case with more than 1 countries repetitive with the filter, but no more than 10
  else if(countriesToShow.length > 1 && countriesToShow.length <= 10){
    // When the "show" button is clicked, the detailed information will be displayed
    if (selectedCountries)
      {
        return(
          <div>
          <HandleShow singleCountry={newName} weather={weather} setWeather={setWeather}/>
          </div>
        )
    }
    // Present the result of search, when the "show" button is not clicked
    else{
      return(
        <p>
          {countriesToShow.map((country) => {
            return (
              <div key={country.name} className="contact-element">
                {country.name.common}
              <tab> </tab>
              <button
                type="submit"
                onClick={
                  () => {
                    setSelectedCountries(true);
                    //setNewName(newName.concat(country.name.common));
                    setNewName(newName.concat(country));
                    //console.log(newName)
                }
                }
              >
                show
              </button>            
            </div>
          );
        })}</p>
      )
    }
  }  
  // When there is only 1 country matching the filter
  else if (countriesToShow.length === 1){
    return (
      <div>
        <h1>
          {countriesToShow[0].name.common}
        </h1>
        <p>
          capital {countriesToShow[0].capital[0]}
        </p>
        <p>
          area {countriesToShow[0].area}
        </p>
        <div>
          <h3>
            languages
          </h3>
          <ul>
            {Object.values(countriesToShow[0].languages).map((language) => {
              return (
                <li key={language} className="li-element">
                  {language}
                </li>
              );
            })}
          </ul>
        </div>
        <img src={countriesToShow[0].flags.png} />
      </div>
    )
  }
  else{
    return (
      <div>
        <p>
          No result
        </p>
      </div>
    )
  }
};

export default Countries;