import { v2 as cloudinary } from 'cloudinary';

export default async (req, res) => {
    const { resources: images } = await cloudinary.search
        .expression(`folder:website-assets/cup-desserts-examples/*`)
        .execute();

    const result = [];

    for (const { format, secure_url } of images) {
        if (format === 'webp') {
            result.push(secure_url);
        }
    }
    res.status(200).send(result);
};
