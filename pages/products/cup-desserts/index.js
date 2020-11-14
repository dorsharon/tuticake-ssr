import React, { useCallback } from 'react';
import { QueryCache, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import CupDesserts from '../../../components/cup-desserts';
import { CUP_DESSERT, CUP_DESSERTS_BOX_SET } from '../../../constants/productTypes';
import { CUP_DESSERTS_EXAMPLE_IMAGES, PRODUCTS } from '../../../constants/queryKeys';

export async function getStaticProps() {
    const queryCache = new QueryCache();

    await queryCache.prefetchQuery(CUP_DESSERTS_EXAMPLE_IMAGES);
    await queryCache.prefetchQuery([PRODUCTS, { productType: CUP_DESSERTS_BOX_SET }]);
    await queryCache.prefetchQuery([PRODUCTS, { productType: CUP_DESSERT }]);

    return {
        props: {
            dehydratedState: dehydrate(queryCache),
        },
        revalidate: 60 * 30, // 30 Minutes
    };
}

export default CupDesserts;
