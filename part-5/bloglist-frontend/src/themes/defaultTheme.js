import { createMuiTheme } from "@material-ui/core/styles"


const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff0077",
    }
  },
  typography: {
    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
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
