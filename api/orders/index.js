import { sendNewOrder } from '../../utils/emailUtils';

export async function createOrder({ customer, delivery, products, orderNotes, totalPrice }) {
    await sendNewOrder({ customer, delivery, products, orderNotes, totalPrice });
}
