import http from '../../utils/HttpClient';
import { getFunctionUrl } from '../../utils/Firebase';
import { getCanUseWebp } from '../../utils/BrowserSupport';
import { connectToDatabase } from '../../utils/mongoDb';

const { MONGO_DB } = process.env;

export default async (req, res) => {
    const { productType } = req.query;

    const { client } = await connectToDatabase();
    const db = client.db(MONGO_DB);
    const products = db.collection('products');

    const result = await products.find({ type: productType }).toArray();

    res.status(200).send(result);
};
