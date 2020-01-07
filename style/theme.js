import { createMuiTheme } from '@material-ui/core/styles';

import { colors, fonts, sizes, backupFontStack } from '@constants/style';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1400,
      xl: 1920
    }
  },
  palette: {
    type: 'dark',
    common: {
      white: colors.white,
      black: colors.black
    },
    primary: {
      main: colors.yellow,
      dark: colors.yellow,
      contrastText: colors.white
    },
    secondary: {
      main: colors.purple,
      dark: colors.purple,
      contrastText: colors.white
    },
    error: {
      main: colors.red,
      dark: colors.red,
      contrastText: colors.white
    },
    text: {
      primary: colors.yellow,
      secondary: colors.white,
      disabled: colors.gray,
      hint: colors.yellow
    },
    background: {
      paper: colors.black,
      default: colors.black
    }
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
    fontFamily: `${fonts.body}, ${backupFontStack.sans}`,
    h1: {
      fontFamily: `${fonts.header}, ${backupFontStack.sans}`,
      fontSize: sizes.h1,
      fontWeight: 800,
      lineHeight: '3.125rem'
    },
    h2: {
      fontFamily: `${fonts.header}, ${backupFontStack.sans}`,
      fontSize: sizes.h2,
      fontWeight: 800,
      lineHeight: '1.875rem'
    },
    h3: {
      // Title T1
      fontFamily: `${fonts.header}, ${backupFontStack.sans}`,
      fontSize: sizes.title,
      fontWeight: 800,
      lineHeight: '1.4375rem'
    },
    h4: {
      // subhead S1
      fontFamily: `${fonts.caption}, ${backupFontStack.sans}`,
      '-webkit-font-variant-ligatures': 'no-common-ligatures',
      'font-feature-settings': '"liga" 0',
      'font-variant-ligatures': 'none',
      fontSize: sizes.subhead,
      fontWeight: 400,
      lineHeight: '1.4375rem'
    },
    subtitle1: {
      // subhead S1
      fontFamily: `${fonts.caption}, ${backupFontStack.sans}`,
      '-webkit-font-variant-ligatures': 'no-common-ligatures',
      'font-feature-settings': '"liga" 0',
      'font-variant-ligatures': 'none',
      fontSize: sizes.subhead,
      fontWeight: 400,
      lineHeight: '1.4375rem'
    },
    caption: {
      fontFamily: `${fonts.caption}, ${backupFontStack.sans}`,
      '-webkit-font-variant-ligatures': 'no-common-ligatures',
      'font-feature-settings': '"liga" 0',
      'font-variant-ligatures': 'none',
      fontSize: sizes.caption,
      fontWeight: 400,
      lineHeight: '0.9375rem'
    },
    button: {
      fontFamily: `${fonts.header}, ${backupFontStack.sans}`,
      textTransform: 'uppercase',
      textDecoration: 'none',
      color: colors.white
    },
    body1: {
      fontFamily: `${fonts.body}, ${backupFontStack.sans}`,
      fontSize: sizes.body,
      fontWeight: 400,
      lineHeight: '1.4375rem'
    }
  },
  overrides: {
    MuiButton: {
      label: {
        fontWeight: 800
      },
      root: {
        border: `2px solid ${colors.yellow}`,
        '&:hover': {
          border: `2px solid ${colors.white}`
        },
        '&:active': {
          color: colors.yellow,
          background: colors.white,
          border: `2px solid ${colors.white}`
        },
        '&:focus': {
          color: colors.yellow,
          background: colors.white,
          border: `2px solid ${colors.white}`
        },
        '&$disabled': {
          background: colors.gray,
          border: `2px solid ${colors.gray}`
        },
        '&.submit-search': {
          marginTop: '8px',
          paddingTop: '9px'
        }
      },
      contained: {
        boxShadow: 'none',
        '&$disabled': {
          color: colors.white,
          backgroundColor: colors.gray,
          border: `2px solid ${colors.gray}`
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        '& $notchedOutline': {
          borderColor: colors.purple,
          borderWidth: '2px'
        },
        '&$error $notchedOutline': {
          borderColor: colors.red
        },
        '&:hover $notchedOutline': {
          borderColor: colors.white
        }
      },
      inputMarginDense: {
        paddingBottom: '10px'
      }
    },
    MuiFormControl: {
      root: {
        '&.field-search .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.green
        },
        '&.field-search .MuiInputLabel-outlined': {
          color: colors.yellow
        },
        '&.field-search p.MuiTypography-root': {
          color: colors.yellow
        }
      }
    },
    MuiInputLabel: {
      root: {
        textTransform: 'uppercase'
      }
    },
    MuiInputBase: {
      root: {
        backgroundColor: colors.black
      },
      input: {
        '&:-webkit-autofill': {
          transition:
            'background-color 9999s ease-in-out 0s, color 9999s ease-in-out 0s',
          'transition-delay': 'background-color 9999s, color 9999s'
        }
      }
    },
    MuiAppBar: {
      colorDefault: {
        backgroundColor: colors.black
      }
    },
    MuiDialog: {
      paper: {
        border: `2px solid ${colors.yellow}`,
        backgroundColor: colors.red,
        boxShadow: `10px 10px 0px ${colors.blue}`
      }
    },
    MuiToolbar: {
      root: {
        borderBottom: `2px solid ${colors.yellow}`
      }
    },
    MuiTabs: {
      root: {
        borderBottom: `2px solid ${colors.purple}`
      }
    },
    MuiTab: {
      root: {
        color: colors.yellow,
        '&.Mui-selected': {
          color: colors.white
        }
      },
      textColorInherit: {
        color: colors.yellow,
        opacity: '1'
      }
    },
    MuiLink: {
      root: {
        fontFamily: `${fonts.header}, ${backupFontStack.sans}`,
        fontWeight: 800
      }
    },
    MuiListSubheader: {
      root: {
        fontFamily: `${fonts.header}, ${backupFontStack.sans}`,
        fontWeight: 800
      }
    },
    MuiExpansionPanel: {
      root: {
        borderBottom: `3px solid ${colors.purple}`
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        paddingLeft: '0',
        paddingTop: '18px'
      }
    },
    MuiChip: {
      label: {
        paddingLeft: '6px'
      }
    },
    MuiPickersDay: {
      dayDisabled: {
        color: colors.gray
      }
    }
  },
  shape: {
    borderRadius: 0
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
});

export default theme;
