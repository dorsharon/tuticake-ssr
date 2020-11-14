import http from './http';
import {
    CUP_DESSERTS_EXAMPLE_IMAGES,
    PRODUCT,
    PRODUCTS,
    PROFILE_IMAGE,
} from '../constants/queryKeys';

const keyFns = {
    [PRODUCTS]: async ({ productType } = {}) => await http.get(`/api/products`, { productType }),
    [PRODUCT]: async (id) => await http.get(`/api/products/${id}`),
    [CUP_DESSERTS_EXAMPLE_IMAGES]: async () => await http.get(`/api/images/cup-desserts-examples`),
    [PROFILE_IMAGE]: async () => await http.get(`/api/images/profile`),
};

export const defaultQueryFn = async (key, ...args) => {
    return await keyFns[key](...args);
};
