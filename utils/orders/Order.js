import { I18n } from 'react-redux-i18n';
import { DateTime } from 'luxon';

export default class Order {
    constructor(customer, delivery, products, notes, totalPrice) {
        this.customer = customer;
        this.delivery = delivery;
        this.products = products;
        this.notes = notes;
        this.totalPrice = totalPrice;
    }

    toHTMLString() {
        return `
            <h3>התקבלה הזמנה חדשה מאת ${this.customer.fullName}</h3>
            <h4>טלפון: ${this.customer.phoneNumber}</h4>
            
            <div>שיטת המשלוח הינה: ${I18n.t(`order.${this.delivery.method}`)}.</div>
            <div>האיסוף/משלוח יתבצע ב: ${this.delivery.dateTime
                .setLocale('he')
                .toLocaleString(DateTime.DATETIME_HUGE)}</div>
            ${
                this.delivery.method === 'delivery'
                    ? `<div> כתובת המשלוח: ${I18n.t(`deliveryCities.${this.delivery.city}`)}, ${
                          this.delivery.address
                      }.</div>`
                    : ''
            }
            
            <h2>הערות להזמנה: ${this.notes}</h2>
            
            <h1>פרטי ההזמנה:</h1>
            ${this.products.reduce(
                (result, product) => `
                ${result}
                ${product.toHTMLString()}
            `,
                ``,
            )}
        `;
    }
}
