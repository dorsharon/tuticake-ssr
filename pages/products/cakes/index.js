import React from 'react';
import Cakes from '../../../components/cakes';
import { QueryCache } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { PRODUCTS } from '../../../utils/query';

export async function getStaticProps() {
    const queryCache = new QueryCache();

    await queryCache.prefetchQuery([PRODUCTS, { productType: 'cake' }]);

    return {
        props: {
            dehydratedState: dehydrate(queryCache),
        },
        revalidate: 60 * 30, // 30 Minutes
    };
}

export default Cakes;
