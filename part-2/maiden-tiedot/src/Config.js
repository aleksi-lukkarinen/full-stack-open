export const APPLICATION_TITLE = "Country Information"

export const MSG_RETRIEVING_COUNTRY_DATA = "Retrieving country data..."
export const MSG_TOO_MANY_MATCHES = "Too many matches. Please adjust the criterion."

export const ERR_MSG_WEATHER_SRVC_CNN_ERR =
          "An error occurred while contacting weather service"

export const ERR_MSG_WEATHER_SRVC_API_KEY_MISSING =
          "Weather service API key has not been set!"

export const FIELD_LABEL_SEARCH = "Search for countries"
export const BUTTON_LABEL_SHOW = "Show"

export const LABEL_CAPITAL = "Capital"
export const LABEL_POPULATION = "Population"
export const LABEL_LANGUAGES = "Languages"
export const LABEL_FLAG = "Flag"
export const LABEL_CURRENT_WEATHER_AT = "Current weather at"
export const LABEL_TEMPERATURE = "Temperature"
export const LABEL_WIND = "Wind"
export const KEY_VALUE_SEPARATOR = ":"

export const URL_REST_COUNTRIES_API_ALL = "https://restcountries.eu/rest/v2/all"

export const WEATHERSTACK_APIKEY = process.env.REACT_APP_COUNTRY_INFO_WEATHERSTACK_API_KEY
export const WEATHERSTACK_BASE_URL = "http://api.weatherstack.com/"
export const WEATHERSTACK_CURRENT_QUERY_URL =
    WEATHERSTACK_BASE_URL + "current?access_key={}&query="
