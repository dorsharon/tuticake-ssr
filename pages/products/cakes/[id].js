import React from 'react';
import CakeProductDetails from '../../../components/cakes/CakeProductDetails';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { CAKE } from '../../../constants/productTypes';
import { PRODUCT } from '../../../constants/queryKeys';
import { fetchAllProducts, fetchProduct } from '../../../api/products';

export async function getStaticPaths({ locales }) {
    const products = await fetchAllProducts({ productType: CAKE });

    return {
        paths: products.reduce(
            (result, { id }) => [
                ...result,
                ...locales.map((locale) => ({ params: { id }, locale })),
            ],
            [],
        ),
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const queryClient = new QueryClient();
    const { id } = context.params;

    await queryClient.prefetchQuery([PRODUCT, id], () => fetchProduct(id));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            id,
        },
        revalidate: 60 * 30, // 30 Minutes
    };
}

export default CakeProductDetails;
