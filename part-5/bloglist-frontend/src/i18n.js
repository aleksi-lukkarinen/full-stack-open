import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"



const resources = {
  en: {
    translation: {
      Forms: {
        Required: "Required",
        unknownAuthor: "<unknown author>",
      },

      SiteHeader: {
        unknownUser: "Unknown",
        knownUser: "{{currentUser.name}}",
        sections: {
          blogs: "Blogs",
          users: "Users",
        }
      },

      UserMenu: {
        finnish: "Suomeksi",
        english: "In English",
        login: "Log In",
        logout: "Log Out",
      },

      LoginForm: {
        title: "Log in to BlogList",
        lblUsername: "Username",
        lblPassword: "Password",
        cmdLogin: "Log in",
        errInvalidCreds: "Incorrect username or password.",
      },

      BlogView: {
        subTitleBlog: "Blog",
      },

      BlogInsertionForm: {
        title: "Add a New Blog",
        cmdOpenForm: "Add a New Blog...",
        titleField: {
          placeHolder: "Title",
          helperText: "For instance: The Greenhouse Effect in the 21st Century",
        },
        authorField: {
          placeHolder: "Author's Name",
          helperText: "For instance: Jack Smith",
        },
        urlField: {
          placeHolder: "Internet Address",
          helperText: "For instance: http://www.blogplatform.com/this-cool-blog-post/",
        },
        cmdInsert: "Add",
        cmdCancel: "Cancel",
        msgSuccessfulInsertion: "Blog \"{{blogToInsert.title}}\" was successfully inserted.",
      },

      BlogList: {
        title: "Saved Blogs",
      },

      BlogListItem: {
        btnDetailVisibility: {
          hide: "Hide",
          show: "Show"
        },
        likes: "{{count}} like",
        likes_plural: "{{count}} likes",
        btnLike: "Like",
        btnDelete: "Delete",
        confirmDeletionWithAuthor: "Delete blog \"{{title}}\" written by {{author}}?",
        confirmDeletionWithoutAuthor: "Delete blog \"{{title}}\"?",
      },

      UserList: {
        title: "Users",
        columnTitleUser: "User",
        columnTitleBlogsCreated: "Blogs Created",
      },

      UserView: {
        subTitleUserProfile: "User Profile",
        loggedInLabel: "Logged In",
        sectionTitleAddedBlogs: "Added Blogs",
      },
    }
  },
  fi: {
    translation: {
      Forms: {
        Required: "Pakollinen",
        unknownAuthor: "<tuntematon kirjoittaja>",
      },

      SiteHeader: {
        unknownUser: "Tuntematon",
        knownUser: "{{currentUser.name}}",
        sections: {
          blogs: "Blogit",
          users: "Käyttäjät",
        }
      },

      UserMenu: {
        login: "Kirjaudu sisään",
        logout: "Kirjaudu ulos",
      },

      LoginForm: {
        title: "Kirjaudu BlogList-sovellukseen",
        lblUsername: "Käyttäjätunnus",
        lblPassword: "Salasana",
        cmdLogin: "Kirjaudu",
        errInvalidCreds: "Väärä käyttäjätunnus tai salasana",
      },

      BlogView: {
        subTitleBlog: "Blogi",
      },

      BlogInsertionForm: {
        title: "Lisää uusi blogi",
        cmdOpenForm: "Lisää uusi blogi...",
        titleField: {
          placeHolder: "Otsikko",
          helperText: "Esimerkki: Kasvihuoneilmiö 2000-luvulla",
        },
        authorField: {
          placeHolder: "Kirjoittajan nimi",
          helperText: "Esimerkki: Ville Virtanen",
        },
        urlField: {
          placeHolder: "Internet-osoite",
          helperText: "Esimerkki: http://www.blogipalvelu.fi/blogipostaus/",
        },
        cmdInsert: "Tallenna",
        cmdCancel: "Peruuta",
        msgSuccessfulInsertion: "Blogin \"{{blogToInsert.title}}\" lisääminen onnistui.",
      },

      BlogList: {
        title: "Tallennetut blogit",
      },

      BlogListItem: {
        btnDetailVisibility: {
          hide: "Piilota",
          show: "Näytä"
        },
        likes: "{{count}} tykkäys",
        likes_plural: "{{count}} tykkäystä",
        btnLike: "Tykkää",
        btnDelete: "Poista",
        confirmDeletionWithAuthor: "Poistetaanko kirjoittajan {{author}} blogi \"{{title}}\"?",
        confirmDeletionWithoutAuthor: "Poistetaanko blogi \"{{title}}\"?",
      },

      UserList: {
        title: "Käyttäjät",
        columnTitleUser: "Käyttäjä",
        columnTitleBlogsCreated: "Luodut blogit",
      },

      UserView: {
        subTitleUserProfile: "Käyttäjäprofiili",
        loggedInLabel: "Kirjautuneena",
        sectionTitleAddedBlogs: "Lisätyt blogit",
      },
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
