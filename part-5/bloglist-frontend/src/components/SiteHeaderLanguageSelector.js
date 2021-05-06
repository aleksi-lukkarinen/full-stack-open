import React from "react"

import { useTranslation } from "react-i18next"


const languageInfo = {
  en: { abbr: "EN", },
  fi: { abbr: "FI", },
}

const SiteHeaderLanguageSelector = () => {
  const { i18n } = useTranslation()

  function switchLanguage(event) {
    event.preventDefault()

    const targetLanguage = event.target.dataset.language
    i18n.changeLanguage(targetLanguage)
  }

  const languageButtons =
    Object.keys(languageInfo).map((lang) => {
      const isActiveLanguage = i18n.language === lang

      return (
        <button
          type="submit" key={ lang } data-language={ lang }
          onClick={ switchLanguage }
          disabled={ isActiveLanguage }
          className={ isActiveLanguage ? "active" : "selectable" }>

          {languageInfo[`${lang}`].abbr}
        </button>
      )
    })

  return (
    <span className="languageSwitcher">{ languageButtons }</span>
  )
}

export default SiteHeaderLanguageSelector
