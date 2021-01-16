import { createMuiTheme } from '@material-ui/core';

const primaryColor = '#ff5f7f';
const secondaryColor = '#dd1767';

const lightThemeCommonProps = {
    palette: {
        primary: { main: primaryColor },
        secondary: { main: secondaryColor },
        text: {
            primary: '#333333',
            secondary: '#333333',
        },
        background: {
            default: '#ffffff',
        },
        common: {
            black: '#333333',
        },
    },
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: '2em',
                color: '#ffffff',
                background: `linear-gradient(180deg, ${primaryColor}, ${secondaryColor})`,
            },
            arrow: {
                color: primaryColor,
            },
        },
    },
};

export const lightThemeRtl = createMuiTheme({
    ...lightThemeCommonProps,
    direction: 'rtl',
    typography: {
        fontFamily: "'Assistant', sans-serif",
    },
});

export const lightThemeLtr = createMuiTheme({
    ...lightThemeCommonProps,
    direction: 'ltr',
    typography: {
        fontFamily: "'Quicksand', sans-serif",
    },
});
