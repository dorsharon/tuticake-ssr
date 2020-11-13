import React from 'react';
import CakeProductDetails from '../../../components/cakes/CakeProductDetails';
import { QueryCache } from 'react-query';
import { PRODUCT } from '../../../utils/query';
import { dehydrate } from 'react-query/hydration';
import { connectToDatabase } from '../../../utils/mongoDb';

export async function getStaticPaths() {
    const { db } = await connectToDatabase();

    const products = await db.collection('products').find({ type: 'cake' }).toArray();

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
