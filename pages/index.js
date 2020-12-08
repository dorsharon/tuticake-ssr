import React from 'react';
import LandingPage from '../components/landing-page';
import { QueryCache } from 'react-query';
import { PROFILE_IMAGE } from '../constants/queryKeys';
import { dehydrate } from 'react-query/hydration';

export async function getStaticProps() {
    const queryCache = new QueryCache();

    await queryCache.prefetchQuery(PROFILE_IMAGE);

    return {
        props: {
            dehydratedState: dehydrate(queryCache),
        },
    };
}

export default LandingPage;
