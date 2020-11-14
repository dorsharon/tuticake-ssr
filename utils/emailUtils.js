import email from 'emailjs-com';
import settings from './settings';
import { DateTime } from 'luxon';
import { CAKE, CUP_DESSERTS_BOX_SET } from '../constants/productTypes';
import i18n from './i18n';

const { emailJsServiceId, emailJsNewOrderTemplateId, emailJsUserId } = settings;

email.init(emailJsUserId);

export const sendNewOrder = async (order) => {
    await email.send(
        emailJsServiceId,
        emailJsNewOrderTemplateId,
        {
            fullName: order.customer.fullName,
            message: getOrderHTMLString(order),
        },
        emailJsUserId,
    );
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
    
    <h2>הערות להזמנה: ${order.notes}</h2>
    
    <h1>פרטי ההזמנה:</h1>
    ${order.products.reduce(
        (result, product) => `
        ${result}
        ${getProductHTMLString(product)}
    `,
        ``,
    )}
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
    `,
        '',
    )}
    
    <b>הערות: ${cake.notes.trim() ? cake.notes : '--'}</b>
`;

export const getCupDessertsBoxSetHTMLString = (boxSet) => `
    <h2>מארז ${boxSet.boxSetQuantity} קינוחי כוסות</h2>
    
    ${boxSet.flavors.reduce(
        (result, { name, quantity }) => `
        ${result}
        <h3>${name}: ${quantity}</h3>
    `,
        ``,
    )}
`;
