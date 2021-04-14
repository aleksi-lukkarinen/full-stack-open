import * as conf from "../Config"

const CountryInfo = ({country}) => {
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
    </div>
  )
}

export default CountryInfo
