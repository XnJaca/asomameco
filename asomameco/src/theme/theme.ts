import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#07305d',
      light: '#0b488c',
      dark: '#07193d',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#eaa159',
      light: '#f0bb86',
      dark: '#e4872c',
      contrastText: '#000000',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#07305d',
      secondary: '#eaa159',
    },
  },
});

export default theme;
