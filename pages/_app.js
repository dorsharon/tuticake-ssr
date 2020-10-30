import { useEffect } from 'react';
import UpperNavBar from '../components/layout/nav-bar/UpperNavBar';
import Footer from '../components/layout/footer';
import BottomNavBar from '../components/layout/nav-bar/BottomNavBar';
import styled, { createGlobalStyle, ThemeProvider as ScThemeProvider } from 'styled-components';
import { jssPreset, StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import * as PropTypes from 'prop-types';
import Head from 'next/head';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { defaultQueryFn } from '../utils/query';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { useRouter } from 'next/router';
import { lightThemeLtr, lightThemeRtl } from '../utils/theme';

const MainLayoutWrapper = styled.div`
    display: grid;
    grid-template-rows: minmax(auto, 200px) 1fr 50px;
`;

const MainContent = styled.main`
    display: flex;
    justify-content: center;
    flex: 1 0 auto;
`;

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
    }
`;

const queryCache = new QueryCache({
    defaultConfig: { queries: { staleTime: 1000 * 60 * 60, queryFn: defaultQueryFn } },
});

export default function MyApp({ Component, pageProps }) {
    const { locale } = useRouter();

    const theme = locale === 'he' ? lightThemeRtl : lightThemeLtr;

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

    return (
        <>
            <Head>
                <title>Tuticake | תותיקייק</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <StylesProvider jss={jss}>
                <StylesProvider injectFirst>
                    <MuiThemeProvider theme={theme}>
                        <ScThemeProvider theme={theme}>
                            <MuiPickersUtilsProvider utils={LuxonUtils} locale={locale}>
                                <ReactQueryCacheProvider queryCache={queryCache}>
                                    <GlobalStyles />

                                    <MainLayoutWrapper>
                                        {/*<UpperNavBar />*/}

                                        <MainContent>
                                            <div className={'asdfdasfsda'}>
                                                <Component {...pageProps} />
                                            </div>
                                        </MainContent>

                                        <Footer />

                                        <BottomNavBar />
                                    </MainLayoutWrapper>

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
        </>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
