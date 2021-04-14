import * as conf from "../Config"

const CountrySearchForm = ({searchTerm, setSearchTerm}) => {

  function updateSearchTerm(event) {
    setSearchTerm(event.target.value)
  }

  return (
    <>
      <form>
        <label>{conf.FIELD_LABEL_SEARCH}</label>
        <input type="text" value={searchTerm} onChange={updateSearchTerm} />
      </form>
    </>
  )
}

export default CountrySearchForm
