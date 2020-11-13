import { connectToDatabase } from '../../../utils/mongoDb';
import { v2 as cloudinary } from 'cloudinary';

export default async (req, res) => {
    const { id } = req.query;

    const { db } = await connectToDatabase();

    const product = await db.collection('products').findOne({ id });

    const { resources: images } = await cloudinary.search
        .expression(`folder:product-images/*/${id}/*`)
        .execute();

    const result = {
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
    };

    for (const image of images) {
        const { format, secure_url } = image;

        if (result.images[format]) {
            result.images[format].push(secure_url);
        } else {
            result.images[format] = [secure_url];
        }
    }

    res.status(200).send(result);
};
