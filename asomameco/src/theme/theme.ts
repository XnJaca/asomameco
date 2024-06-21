import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#07305d',
      light: '#0b488c',
      dark: '#07193d',
      "300": "#85C2FF",
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#eaa159',
      light: '#f0bb86',
      dark: '#e4872c',
      contrastText: '#000000',
    },
    background: {
      // F1F1FB
      default: '#FFFFFF',
    },
    text: {
      primary: '#07305d',
      secondary: '#eaa159',
    },
    divider: '#85C2FF',
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },


  },

  // shape: {
  //   borderRadius: 12,
  // },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          // borderRadius: 16,
          padding: "16px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: "0px",
          paddingRight: "0px",
          marginBottom: "10px",
        },

      },
    },
  },
});

export default theme;
