//import * as conf from "../Config"

const CountryNameList = ({countries, setSearchhTerm}) => {
  return (
    <>
      {countries.map(country => {
        return <div key={country.alpha2Code}>{country.name}</div>
      })}
    </>
  )
}

export default CountryNameList
