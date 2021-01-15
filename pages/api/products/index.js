import { fetchAllProducts } from '../../../api/products';

export default async (req, res) => {
    const { productType } = req.query;
    res.status(200).send(await fetchAllProducts({ productType }));
};
