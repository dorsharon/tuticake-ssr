import React, { useEffect } from 'react';
import MainLayout from './MainLayout';
import { create } from 'jss';
import rtl from 'jss-rtl';
import {
    StylesProvider,
    jssPreset,
    ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import { ThemeProvider as ScThemeProvider, createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUiTheme } from '../../redux/ui/uiSlice';
import { lightThemeRtl, lightThemeLtr } from '../../utils/theme';
import { selectI18nDirection, selectI18nLocale } from '../../redux/i18n/i18nSelectors';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { defaultQueryFn } from '../../utils/query';

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
    }
`;

const queryCache = new QueryCache({
    defaultConfig: { queries: { staleTime: 1000 * 60 * 60, queryFn: defaultQueryFn } },
});

export default function Root() {
    const i18nLocale = useSelector(selectI18nLocale);
    const i18nDirection = useSelector(selectI18nDirection);
    const theme =
        useSelector(selectUiTheme) === 'light'
            ? i18nDirection === 'rtl'
                ? lightThemeRtl
                : lightThemeLtr
            : null;

    useEffect(() => {
        document.getElementsByTagName('html')[0].setAttribute('lang', i18nLocale);
        document.body.setAttribute('dir', i18nDirection);
    }, [i18nDirection, i18nLocale]);

    const jss = create({
        plugins: [...jssPreset().plugins, i18nDirection === 'rtl' ? rtl() : null],
    });

    return (
        <StylesProvider jss={jss}>
            <StylesProvider injectFirst>
                <MuiThemeProvider theme={theme}>
                    <ScThemeProvider theme={theme}>
                        <MuiPickersUtilsProvider utils={LuxonUtils} locale={i18nLocale}>
                            <ReactQueryCacheProvider queryCache={queryCache}>
                                <GlobalStyles />

                                <Router>
                                    <MainLayout />
                                </Router>

                                <ReactQueryDevtools
                                    initialIsOpen={false}
                                    panelProps={{ dir: 'ltr' }}
                                />
                            </ReactQueryCacheProvider>
                        </MuiPickersUtilsProvider>
                    </ScThemeProvider>
                </MuiThemeProvider>
            </StylesProvider>
        </StylesProvider>
    );
}
