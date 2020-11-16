import { v2 as cloudinary } from 'cloudinary';

export default async (req, res) => {
    const { resources: images } = await cloudinary.search
        .expression(`folder:website-assets/cup-desserts-examples/* AND format:webp`)
        .execute();

    res.status(200).send(images.map((i) => i.secure_url));
};
