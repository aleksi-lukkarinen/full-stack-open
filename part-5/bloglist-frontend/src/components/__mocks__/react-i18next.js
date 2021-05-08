
// As described at https://react.i18next.com/misc/testing

export const useTranslation = () => {
  return {
    t: (str) => str,

    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }
}
