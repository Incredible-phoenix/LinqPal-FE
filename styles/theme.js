
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const chaloops = {
  fontFamily: 'Chaloops',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  color: '#FFFFFF',
  src: `
    local('chaloops'),
    url('/assets/fonts/chaloops.woff2') format('woff2')`
};

const verdanas = {
  fontFamily: 'Verdanas',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  color: '#FFFFFF',
  src: `
    local('verdanas'),
    url('/assets/fonts/verdanas.woff2') format('woff2')`
};

const theme = responsiveFontSizes(createMuiTheme({
  palette: {
    primary: {
      light: '#4791db',
      main: '#1976d3',
      dark: '#115293',
      contrastText: '#fff'
    },
    secondary: {
      light: '#555e6c',
      main: '#2b3648',
      dark: '#1e2532',
      contrastText: '#fff'
    },
    error: {
      light: '#ff3333',
      main: '#ff0000',
      dark: '#b20000',
      contrastText: '#fff'
    },
    background: {
      default: '#292c40',
      main: '#1b1f2e'
    },
    text: {
      primary: '#fff',
      secondary: '#8697a2'
    },
  },
  custom: {
    palette: {
      green: '#4caf50',
      blueGrey: '#5c739c',
      lightGrey: '#31373f',
    },
    layout: {
      topAreaHeight: 160,
      footerAreaHeight: 154
    }
  }
}));

export default theme;