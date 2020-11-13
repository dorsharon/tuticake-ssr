import { connectToDatabase } from '../../../utils/mongoDb';
import { v2 as cloudinary } from 'cloudinary';

export default async (req, res) => {
    const { productType } = req.query;

    const { db } = await connectToDatabase();

    const products = await db.collection('products').find({ type: productType }).toArray();

    const { resources: images } = await cloudinary.search
        .expression(`folder:product-images/${productType}/*`)
        .execute();

    const result = products.reduce(
        (res, product) => ({
            ...res,
            [product.id]: {
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
                images: {},
            },
        }),
        {},
    );

    for (const image of images) {
        const { folder, format, secure_url } = image;
        const splitFolder = folder.split('/');
        const productId = splitFolder[splitFolder.length - 1];

        if (result[productId]) {
            if (result[productId].images[format]) {
                result[productId].images[format].push(secure_url);
            } else {
                result[productId].images[format] = [secure_url];
            }
        }
    }

    res.status(200).send(Object.values(result));
};
