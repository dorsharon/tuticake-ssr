import http from './http';
import { PRODUCT, PRODUCTS } from '../constants/queryKeys';

const keyFns = {
    [PRODUCTS]: async ({ productType } = {}) =>{
        const res =  await http.get(`/api/products`, { productType });
        console.log('res',res);
        return res;
    },
    [PRODUCT]: async (id) => await http.get(`/api/products/${id}`),
};

export const defaultQueryFn = async ({ queryKey }) => {
    const [key, args] = queryKey;
    return await keyFns[key](args);
};
