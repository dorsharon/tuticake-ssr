import { v2 as cloudinary } from 'cloudinary';
import { connectToDatabase } from '../dbUtils';

export async function fetchAllProducts({ productType }) {
    const { db } = await connectToDatabase();

    const products = await db
        .collection('products')
        .find({ type: productType }, { projection: { _id: 0 } })
        .toArray();

    const { resources: images } = await cloudinary.search
        .expression(`folder:product-images/${productType}/* AND format:webp`)
        .execute();

    const result = products.reduce(
        (res, { _id, ...product }) => ({
            ...res,
            [product.id]: { ...product, images: [] },
        }),
        {},
    );

    for (const { folder, public_id } of images) {
        const splitFolder = folder.split('/');
        const productId = splitFolder[splitFolder.length - 1];

        result[productId].images.push(public_id);
    }

    return Object.values(result);
}

export async function fetchProduct(id) {
    const { db } = await connectToDatabase();

    const product = await db.collection('products').findOne({ id }, { projection: { _id: 0 } });

    const { resources: images } = await cloudinary.search
        .expression(`folder:product-images/cake/${id}/* AND format:webp`)
        .execute();

    return {
        descriptionEn: product.descriptionEn,
        descriptionHe: product.descriptionHe,
        id: product.id,
        isAvailable: product.isAvailable,
        isDairy: product.isDairy,
        isGlutenFree: product.isGlutenFree,
        nameEn: product.nameEn,
        nameHe: product.nameHe,
        price: product.price,
        type: product.type,
        images: images.map((i) => i.public_id),
    };
}
