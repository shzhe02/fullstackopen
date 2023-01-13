import { useState, useEffect } from "react"
import axios from "axios"

const CountryView = ({ country }) => {
  const [temp, setTemp] = useState(0)
  const [weather, setWeather] = useState([])
  const [wind, setWind] = useState(0)
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setTemp(response.data.main.temp)
        setWeather(response.data.weather[0])
        setWind(response.data.wind.speed)
      })
  }, [apiKey, country])
  console.log(country)
  return (
    <div>
      <h2>{country.name.common}</h2>
      capital {country.capital} <br />
      area {country.area}
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag" />
      <h3>Weather in {country.capital}</h3>
      temperature {temp} Celsius <br />
      <img
        src={
          typeof weather.icon !== "undefined"
            ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
            : ""
        }
        alt={weather.description}
      />{" "}
      <br />
      wind {wind} m/s
    </div>
  )
}

export default CountryView
