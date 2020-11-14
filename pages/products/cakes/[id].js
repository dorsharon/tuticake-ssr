import React from 'react';
import CakeProductDetails from '../../../components/cakes/CakeProductDetails';
import { QueryCache } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getAllProducts } from '../../../db/productsDb';
import { CAKE } from '../../../constants/productTypes';
import { PRODUCT } from '../../../constants/queryKeys';

export async function getStaticPaths() {
    const products = await getAllProducts(CAKE);

    return {
        paths: products.map(({ id }) => ({ params: { id } })),
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const queryCache = new QueryCache();
    const { id } = context.params;

    await queryCache.prefetchQuery([PRODUCT, id]);

    return {
        props: {
            dehydratedState: dehydrate(queryCache),
            id,
        },
        revalidate: 60 * 30, // 30 Minutes
    };
}

export default CakeProductDetails;
