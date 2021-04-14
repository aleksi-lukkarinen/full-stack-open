import * as conf from "./Config"
import React, {useState, useEffect} from "react"
import axios from "axios"
import ApplicationTitle from "./components/ApplicationTitle"
import CountrySearchForm from "./components/CountrySearchForm"
import CountryNameList from "./components/CountryNameList"
import CountryInfo from "./components/CountryInfo"

function App() {
  const [countryData, setCountryData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    axios
      .get(conf.URL_REST_COUNTRIES_API_ALL)
      .then(response => {
        const data = response.data
        if (Array.isArray(data)) {
          setCountryData(data)
        }
      })
  }, [])

  const countryDataIsAvailable = countryData.length > 1
  const showRetrievalMessage = !countryDataIsAvailable
  const showSearchForm = countryDataIsAvailable

  let searchResults = []
  let cleanSearchTerm = ""
  if (showSearchForm) {
    cleanSearchTerm = searchTerm.trim().toLowerCase()
    const countryFilterFunc = country =>
        country.name.toLowerCase().includes(cleanSearchTerm)
    searchResults = countryData.filter(countryFilterFunc)
  }

  const showTooManyMatchesMessage =
      countryDataIsAvailable && searchResults.length > 10 &&
      cleanSearchTerm.length > 0
  const showCountryNameList =
      countryDataIsAvailable && searchResults.length > 1 &&
      searchResults.length <= 10
  const showCountryInfo =
      countryDataIsAvailable && searchResults.length === 1

  return (
    <>
      <ApplicationTitle />

      {showRetrievalMessage && conf.MSG_RETRIEVING_COUNTRY_DATA}

      {showSearchForm &&
        <CountrySearchForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm} />
      }

      {showTooManyMatchesMessage && conf.MSG_TOO_MANY_MATCHES}

      {showCountryNameList &&
        <CountryNameList
            countries={searchResults}
            setSearchTerm={setSearchTerm} />
      }

      {showCountryInfo &&
        <CountryInfo country={searchResults[0]} />
      }
    </>
  )
}

export default App
