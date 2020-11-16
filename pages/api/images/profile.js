import { v2 as cloudinary } from 'cloudinary';

export default async (req, res) => {
    const { resources: images } = await cloudinary.search
        .expression(`folder:website-assets/profile/* AND format:webp`)
        .execute();

    res.status(200).send(images.length > 0 ? images[0].secure_url : null);
};
