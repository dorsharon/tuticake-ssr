import { v2 as cloudinary } from 'cloudinary';
import { getProduct } from '../../../api/db/productsDb';

export default async (req, res) => {
    const { id } = req.query;

    const product = await getProduct(id);

    const { resources: images } = await cloudinary.search
        .expression(`folder:product-images/cake/${id}/* AND format:webp`)
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
        images: images.map((i) => i.public_id),
    };

    res.status(200).send(result);
};
