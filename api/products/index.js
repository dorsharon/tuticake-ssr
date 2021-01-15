import { getAllProducts } from '../db/productsDb';
import { v2 as cloudinary } from 'cloudinary';

export async function fetchAllProducts({ productType }) {
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

    for (const { folder, public_id } of images) {
        const splitFolder = folder.split('/');
        const productId = splitFolder[splitFolder.length - 1];

        result[productId].images.push(public_id);
    }

    return Object.values(result);
}
