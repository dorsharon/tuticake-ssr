import http from './http';
import { PRODUCT, PRODUCTS } from '../constants/queryKeys';

const keyFns = {
    [PRODUCTS]: ({ productType } = {}) => http.get(`/api/products`, { productType }),
    [PRODUCT]: (id) => http.get(`/api/products/${id}`),
};

export const defaultQueryFn = async ({ queryKey }) => {
    const [key, args] = queryKey;
    return keyFns[key](args);
};
