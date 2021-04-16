import * as conf from "../Config"
import {useState, useEffect} from "react"
import axios from "axios"

function buildWeatherDataURL(forCountryName) {
  let u = conf.WEATHERSTACK_CURRENT_QUERY_URL
  u = u.replace("{}", conf.WEATHERSTACK_APIKEY)
  u += encodeURIComponent(forCountryName)

  return u
}

function isErroneousWeatherDataApiKey() {
  return typeof(conf.WEATHERSTACK_APIKEY) !== "string" ||
            conf.WEATHERSTACK_APIKEY.length < 1
}

function isErroneousWeatherData(data) {
  return typeof(data) !== "object" ||
            data === null ||
            data.success ||
            data.success === false
}

function weatherDataErrorOccurred(data) {
  let errorFound = isErroneousWeatherData(data)

  if (errorFound) {
    let msg = conf.ERR_MSG_WEATHER_SRVC_CNN_ERR
    if (data.error) {
    if (data.error.code)
      msg += `: ${data.error.code}`
    if (data.error.info)
      msg += `: ${data.error.info}`
    }

    console.error(msg)
  }

  return errorFound
}

const CountryInfo = ({country}) => {
  const [weatherData, setWeatherData] = useState({})
  const weatherUrl = buildWeatherDataURL(country.name)

  useEffect(() => {
    let isMounted = true

    if (isErroneousWeatherDataApiKey()) {
      console.error(conf.ERR_MSG_WEATHER_SRVC_API_KEY_MISSING)
      return
    }

    axios
      .get(weatherUrl)
      .then(response => {
        const data = response.data
        if (isMounted && !weatherDataErrorOccurred(data)) {
          setWeatherData(data)
        }
    })

    return () => isMounted = false
  }, [weatherUrl])


  const curW = weatherData.current
  const locW = weatherData.location

  return (
    <div>
      <h2>{country.name}</h2>
      <div>{conf.LABEL_CAPITAL}{conf.KEY_VALUE_SEPARATOR} {country.capital}</div>
      <div>{conf.LABEL_POPULATION}{conf.KEY_VALUE_SEPARATOR} {country.population}</div>
      <div>
        <div>{conf.LABEL_LANGUAGES}{conf.KEY_VALUE_SEPARATOR} </div>
        <ul>
          {country.languages.map(lang =>
            <li key={lang.iso639_1}>
              {lang.name} (<span style={{fontStyle: "italic"}}>{lang.nativeName}</span>)
            </li>
          )}
        </ul>
      </div>
      <div>
        <div>{conf.LABEL_FLAG}{conf.KEY_VALUE_SEPARATOR}</div>
        <img src={country.flag}
              alt={"The flag of " + country.name}
              style={{width: "10em", border: "1px solid gray"}} />
      </div>
      {curW &&
        <div>
          <div>{conf.LABEL_CURRENT_WEATHER_AT} {locW.name} ({locW.country}){conf.KEY_VALUE_SEPARATOR}</div>
          <div>
            {curW.weather_descriptions.map(d => <span key={d}>{d}</span>)}
          </div>
          <div>{conf.LABEL_TEMPERATURE}{conf.KEY_VALUE_SEPARATOR} {curW.temperature} ℃</div>
          <div>{conf.LABEL_WIND}{conf.KEY_VALUE_SEPARATOR} {curW.wind_dir} {curW.wind_speed} mph</div>
          <div>
            {curW.weather_icons.map(url =>
              <img key={url} src={url} alt="" />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default CountryInfo
