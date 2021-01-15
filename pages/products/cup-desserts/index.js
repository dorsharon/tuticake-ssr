import React from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import CupDesserts from '../../../components/cup-desserts';
import { CUP_DESSERT, CUP_DESSERTS_BOX_SET } from '../../../constants/productTypes';
import { PRODUCTS } from '../../../constants/queryKeys';

export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery([PRODUCTS, { productType: CUP_DESSERTS_BOX_SET }]);
    await queryClient.prefetchQuery([PRODUCTS, { productType: CUP_DESSERT }]);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60 * 30, // 30 Minutes
    };
}

export default CupDesserts;
