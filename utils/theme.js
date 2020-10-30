import { createMuiTheme } from '@material-ui/core';

const lightThemeCommonProps = {
    typography: {
        fontFamily: '"Alef", sans-serif',
    },
    palette: {
        primary: { main: '#ff5f7f' },
        secondary: { main: '#dd1767' },
        text: {
            primary: '#333333',
            secondary: '#333333',
        },
        background: {
            default: '#ffffff',
        },
    },
};

export const lightThemeRtl = createMuiTheme({
    ...lightThemeCommonProps,
    direction: 'rtl',
});

export const lightThemeLtr = createMuiTheme({
    ...lightThemeCommonProps,
    direction: 'ltr',
});
