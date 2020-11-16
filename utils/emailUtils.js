import gmailSend from 'gmail-send';
import { DateTime } from 'luxon';
import { CAKE, CUP_DESSERTS_BOX_SET } from '../constants/productTypes';
import i18n from './i18n';

const send = gmailSend({
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    to: ['reutnimni26@gmail.com', 'dor442@gmail.com'],
    from: 'תותיקייק',
});

export const sendNewOrder = async (order) => {
    i18n.locale('he');

    await send({
        subject: `התקבלה הזמנה חדשה מאת ${order.customer.fullName}`,
        html: getOrderHTMLString(order),
    });
};

export const getOrderHTMLString = (order) => `
    <h3>התקבלה הזמנה חדשה מאת ${order.customer.fullName}</h3>
    <h4>טלפון: ${order.customer.phoneNumber}</h4>
    
    <div>שיטת המשלוח הינה: ${i18n.t(`order.${order.delivery.method}`)}.</div>
    <div>האיסוף/משלוח יתבצע ב: ${DateTime.fromISO(order.delivery.dateTime)
        .setLocale('he')
        .toLocaleString(DateTime.DATETIME_HUGE)}</div>
    ${
        order.delivery.method === 'delivery'
            ? `<div> כתובת המשלוח: ${i18n.t(`deliveryCities.${order.delivery.city}`)}, ${
                  order.delivery.address
              }.</div>`
            : ''
    }
    
    ${
        order.notes && order.notes.trim() !== ''
            ? `<h2>הערות להזמנה: ${order.notes.trim()}</h2>`
            : ''
    }
    
    <h1>פרטי ההזמנה:</h1>
    ${order.products.reduce(
        (result, product) => `
        ${result}
        ${getProductHTMLString(product)}
    `,
        ``,
    )}
    
    <h1>מחיר סופי:${order.totalPrice}</h1>
`;

export const getProductHTMLString = (product) => {
    switch (product.type) {
        case CAKE:
            return getCakeHTMLString(product);
        case CUP_DESSERTS_BOX_SET:
            return getCupDessertsBoxSetHTMLString(product);
        default:
            return '';
    }
};

export const getCakeHTMLString = (cake) => `
    <h2>${cake.name}</h2>
    
    ${Object.entries(cake.extras).reduce(
        (result, [key, value]) => `
        ${result}
        <b>${i18n.t(`cakes.questions.${key}.question`)}</b><br/>
        <div>${value.trim() ? value : '--'}</div>
        
        <h6>מחיר: ${cake.price}</h6>
    `,
        '',
    )}
    
    <b>הערות: ${cake.notes.trim() ? cake.notes : '--'}</b>
`;

export const getCupDessertsBoxSetHTMLString = (boxSet) => `
    <h2>מארז ${boxSet.quantity} קינוחי כוסות</h2>
    <h4>מחיר: ${boxSet.price}</h4>
    
    ${boxSet.flavors.reduce(
        (result, { name, quantity }) => `
        ${result}
        <h3>${name}: ${quantity}</h3>
    `,
        ``,
    )}
`;
