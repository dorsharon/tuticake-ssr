import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../../redux/products/productsActions';
import { selectHasError, selectIsLoading } from '../../../redux/status/statusSelectors';
import { selectAllCakes } from '../../../redux/products/productsSelectors';

export default function useProducts(options = {}) {
    const { asObject = false, productType } = options;

    const dispatch = useDispatch();

    const { array: productsArray, object: productsObject } = useSelector(selectAllCakes);
    const isFetching = useSelector(selectIsLoading(fetchAllProducts.typePrefix));
    const hasError = useSelector(selectHasError(fetchAllProducts.typePrefix));

    useEffect(() => {
        // If the products haven't been fetched yet, fetch them
        if (
            productType &&
            (!productsArray || productsArray.length === 0) &&
            !isFetching &&
            !hasError
        ) {
            dispatch(fetchAllProducts(productType));
        }
    }, [dispatch, hasError, productsArray, isFetching, productType]);

    return {
        data: asObject ? productsObject : productsArray,
        isLoading: isFetching,
        hasError,
    };
}
