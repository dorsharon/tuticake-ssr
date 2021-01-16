import { fetchAllProducts } from '../../../api/products';

export default async (req, res) => {
    if (req.method === 'GET') {
        const { productType } = req.query;
        res.status(200).send(await fetchAllProducts({ productType }));
    } else {
        res.status(404).send();
    }
};
