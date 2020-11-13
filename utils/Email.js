import email from 'emailjs-com';
import settings from './settings';

const { emailJsServiceId, emailJsNewOrderTemplateId, emailJsUserId } = settings;

email.init(emailJsUserId);

export const sendNewOrder = async order => {
    await email.send(
        emailJsServiceId,
        emailJsNewOrderTemplateId,
        {
            fullName: order.customer.fullName,
            message: order.toHTMLString(),
        },
        emailJsUserId,
    );
};
