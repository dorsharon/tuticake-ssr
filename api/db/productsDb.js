import { connectToDatabase } from './dbUtils';

export const getAllProducts = async (productType) => {
    const { db } = await connectToDatabase();
    return db
        .collection('products')
        .find({ type: productType }, { projection: { _id: 0 } })
        .toArray();
};

export const getProduct = async (id) => {
    const { db } = await connectToDatabase();
    return db.collection('products').findOne({ id }, { projection: { _id: 0 } });
};
