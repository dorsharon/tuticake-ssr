import { sendNewOrder } from '../../../utils/emailUtils';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { customer, delivery, products, orderNotes, totalPrice } = req.body;

        await sendNewOrder({ customer, delivery, products, orderNotes, totalPrice });

        res.status(200).send();
    } else {
        res.status(404).send();
    }
};
