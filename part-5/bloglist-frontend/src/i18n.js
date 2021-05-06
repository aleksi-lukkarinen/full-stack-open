import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"


const resources = {
  en: {
    translation: {
      "SiteHeader": {
        "unknownUser": "Unknown User",
        "knownUser": "{{currentUser.name}} logged in",
        "cmdLogout": "Log out",
      },

      "LoginForm": {
        "title": "Log in to BlogList",
        "lblUsername": "Username",
        "lblPassword": "Password",
        "cmdLogin": "Log in",
        "errInvalidCreds": "Incorrect username or password.",
      },

      "BlogInsertionForm": {
        "title": "Insert a New Blog",
        "cmdOpenForm": "Add a New Blog...",
        "lblTitle": "Title",
        "lblAuthor": "Author",
        "lblURL": "URL",
        "cmdInsert": "Save",
        "cmdCancel": "Cancel",
        "msgSuccessfulInsertion": "Blog \"{{blogToInsert.title}}\" was successfully inserted.",
      },

      "BlogList": {
        "title": "Saved Blogs",
      },

      "BlogListItem": {
        "btnDetailVisibility": {
          "hide": "Hide",
          "show": "Show"
        },
        "likes": "{{count}} like",
        "likes_plural": "{{count}} likes",
        "btnLike": "Like"
      }
    }
  },
  fi: {
    translation: {
      "SiteHeader": {
        "unknownUser": "Tuntematon käyttäjä",
        "knownUser": "{{currentUser.name}} kirjautuneena",
        "cmdLogout": "Kirjaudu ulos",
      },

      "LoginForm": {
        "title": "Kirjaudu BlogList-sovellukseen",
        "lblUsername": "Käyttäjätunnus",
        "lblPassword": "Salasana",
        "cmdLogin": "Kirjaudu",
        "errInvalidCreds": "Väärä käyttäjätunnus tai salasana",
      },

      "BlogInsertionForm": {
        "title": "Lisää uusi blogi",
        "cmdOpenForm": "Lisää uusi blogi...",
        "lblTitle": "Otsikko",
        "lblAuthor": "Kirjoittaja",
        "lblURL": "Osoite",
        "cmdInsert": "Tallenna",
        "cmdCancel": "Peruuta",
        "msgSuccessfulInsertion": "Blogin \"{{blogToInsert.title}}\" lisääminen onnistui.",
      },

      "BlogList": {
        "title": "Tallennetut blogit",
      },

      "BlogListItem": {
        "btnDetailVisibility": {
          "hide": "Piilota",
          "show": "Näytä"
        },
        "likes": "{{count}} tykkäys",
        "likes_plural": "{{count}} tykkäystä",
        "btnLike": "Tykkää"
      }
    }
  }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: "en",

      keySeparator: ".",

      interpolation: {
        escapeValue: false,
      }
    })

export default i18n
