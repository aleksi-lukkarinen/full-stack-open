import * as conf from "../Config"

const CountryNameList = ({countries, setSearchTerm}) => {
  function setSelectedCountry(event) {
    setSearchTerm(event.target.id)
  }

  return (
    <>
      {countries.map(country => {
        return (
          <div key={country.alpha2Code}>
            <span>{country.name}</span>
            <button
                id={country.name}
                onClick={setSelectedCountry}>{conf.BUTTON_LABEL_SHOW}</button>
          </div>
        )
      })}
    </>
  )
}

export default CountryNameList
