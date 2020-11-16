import { v2 as cloudinary } from 'cloudinary';
import { getAllProducts } from '../../../db/productsDb';

export default async (req, res) => {
    const { productType } = req.query;

    const products = await getAllProducts(productType);

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

    for (const { folder, secure_url } of images) {
        const splitFolder = folder.split('/');
        const productId = splitFolder[splitFolder.length - 1];

        result[productId].images.push(secure_url);
    }

    res.status(200).send(Object.values(result));
};
