
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

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
            topAppBarHeight: 47,
            footerHeight: 173
        },
        cast: {
            labelWidth: 75
        }
    }
}));

export default theme;