import {  fetchProduct } from '../../../api/products';

export default async (req, res) => {
    if (req.method === 'GET') {
        const { id } = req.query;
        res.status(200).send(await fetchProduct(id));
    } else {
        res.status(404).send();
    }
};
