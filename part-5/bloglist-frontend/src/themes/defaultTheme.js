import { createMuiTheme } from "@material-ui/core/styles"


const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff0077",
    }
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
        },
      },
    },
  },
  typography: {
    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
    h1: {
      fontSize: "20pt",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "16pt",
      paddingTop: "0em",
    },
  },
  shape: {
    borderRadius: 3,
  },
  spacing: 8,
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
      }
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiButton: {
      focusVisibleClassName: "focusedButton",
      variant: "contained",
      size: "small",
    },
    MuiTextField: {
      variant: "filled",
      size: "small",
    },
    MuiInputLabel: {
      shrink: true,
    },
  }
})

export default defaultTheme
