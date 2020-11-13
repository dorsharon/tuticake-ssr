import { connectToDatabase } from '../../../utils/mongoDb';
import { v2 as cloudinary } from 'cloudinary';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { id } = req.query;

        res.status(200).send();
    } else {
        res.status(404).send();
    }
};
