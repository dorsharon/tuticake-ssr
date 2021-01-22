import React, { useEffect } from 'react';
import UpperNavBar from '../components/layout/header/UpperNavBar';
import Footer from '../components/layout/footer';
import BottomNavBar from '../components/layout/header/BottomNavBar';
import styled, { createGlobalStyle, ThemeProvider as ScThemeProvider } from 'styled-components';
import { jssPreset, StylesProvider, MuiThemeProvider } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import Head from 'next/head';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { defaultQueryFn } from '../utils/query';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRouter } from 'next/router';
import { lightThemeLtr, lightThemeRtl } from '../utils/theme';
import { I18nProvider } from 'next-localization';
import HE from '../locales/he.json';
import EN from '../locales/en.json';

const MainLayoutWrapper = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        'header'
        'main'
        'footer';

    & > header {
        grid-area: header;
    }

    & > main {
        grid-area: main;
    }

    & > footer {
        grid-area: footer;
    }
`;

const MainContent = styled.main`
    display: flex;
    justify-content: center;
    flex: 1 0 auto;
`;

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        font-family: 'Assistant', sans-serif;
    }
`;

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 60, queryFn: defaultQueryFn } },
});

function MyApp({ Component, pageProps }) {
    const { locale } = useRouter();

    const theme = locale === 'he' ? lightThemeRtl : lightThemeLtr;
    const langDictionary = locale === 'he' ? HE : EN;

    const jss = create({
        plugins: [...jssPreset().plugins, locale === 'he' ? rtl() : null],
    });

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    useEffect(() => {
        document.body.dir = locale === 'he' ? 'rtl' : 'ltr';
    }, [locale]);

    return (
        <>
            <Head>
                <title>Tuticake | תותיקייק</title>

                <meta
                    name={'description'}
                    content={
                        'ברוכים הבאים לתותיקייק! פה תוכלו למצוא: עוגות מעוצבות, קינוחי כוסות, מארזים מגוונים ועוד! הזמנות ניתן לבצע דרך האתר או בטלפון: 054-6629179'
                    }
                />

                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Assistant&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <StylesProvider jss={jss}>
                <StylesProvider injectFirst>
                    <MuiThemeProvider theme={theme}>
                        <ScThemeProvider theme={theme}>
                            <MuiPickersUtilsProvider utils={LuxonUtils} locale={locale}>
                                <QueryClientProvider client={queryClient}>
                                    <Hydrate state={pageProps.dehydratedState}>
                                        <GlobalStyles />

                                        <I18nProvider locale={locale} lngDict={langDictionary}>
                                            <MainLayoutWrapper>
                                                <UpperNavBar />

                                                <MainContent>
                                                    <Component {...pageProps} />
                                                </MainContent>

                                                <Footer />

                                                <BottomNavBar />
                                            </MainLayoutWrapper>
                                        </I18nProvider>

                                        <ReactQueryDevtools
                                            initialIsOpen={false}
                                            panelProps={{ dir: 'ltr' }}
                                        />
                                    </Hydrate>
                                </QueryClientProvider>
                            </MuiPickersUtilsProvider>
                        </ScThemeProvider>
                    </MuiThemeProvider>
                </StylesProvider>
            </StylesProvider>
        </>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};

export default MyApp;
