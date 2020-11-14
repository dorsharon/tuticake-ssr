import { connectToDatabase } from './dbUtils';

export const getAllProducts = async (productType) => {
    const { db } = await connectToDatabase();
    return await db.collection('products').find({ type: productType }).toArray();
};

export const getProduct = async (id) => {
    const { db } = await connectToDatabase();
    return await db.collection('products').findOne({ id });
};
