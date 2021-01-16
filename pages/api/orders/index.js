import { createOrder } from '../../../api/orders';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { customer, delivery, products, orderNotes, totalPrice } = req.body;

        try {
            await createOrder({ customer, delivery, products, orderNotes, totalPrice });
            res.status(200).send({});
        } catch (e) {
            res.status(500).send(e.message);
        }
    } else {
        res.status(404).send();
    }
};
