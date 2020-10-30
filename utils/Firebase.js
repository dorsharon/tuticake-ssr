import settings from '../settings';

const { firebaseProjectId } = settings;
const region = 'europe-west1';

export const AUTHORIZE_ADMIN_ACCESS = 'authorizeAdminAccess';
export const GET_ALL_ORDERS = 'getAllOrders';
export const CREATE_NEW_ORDER = 'createNewOrder';

const url =
    process.env.NODE_ENV === 'production'
        ? `https://${region}-${firebaseProjectId}.cloudfunctions.net`
        : `http://localhost:5001/${firebaseProjectId}/${region}`;

export const getFunctionUrl = functionName => `${url}/${functionName}`;
