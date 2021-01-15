import React from 'react';
import Cakes from '../../../components/cakes';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration'
import { CAKE } from '../../../constants/productTypes';
import { PRODUCTS } from '../../../constants/queryKeys';

export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery([PRODUCTS, { productType: CAKE }]);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60 * 30, // 30 Minutes
    };
}

export default Cakes;
