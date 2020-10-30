import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import ProductsListEntry from './ProductsListEntry';
import { getProductCardId, getProductsListId } from '../../utils/Selectors';
import { useDispatch } from 'react-redux';
import { fetchAllProducts } from '../../redux/products/productsActions';
import { Grid } from '@material-ui/core';
import useProducts from '../common/hooks/useProducts';

export default function ProductsList(props) {
    const { productType, sortComparer = () => {}, onProductSelect = productId => {} } = props;

    const dispatch = useDispatch();

    const { data: products, isLoading } = useProducts();

    useEffect(() => {
        dispatch(fetchAllProducts(productType));
    }, [dispatch, productType]);

    if (isLoading) {
        return (
            <Grid container justify={'center'} spacing={5}>
                <Grid item xs={12} sm={6} md={4}>
                    <ProductsListEntry skeleton />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <ProductsListEntry skeleton />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <ProductsListEntry skeleton />
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container id={getProductsListId()} justify={'center'} spacing={5}>
            {products.sort(sortComparer).map(product => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                    <ProductsListEntry
                        id={getProductCardId(product.id)}
                        productId={product.id}
                        onClick={() => onProductSelect(product.id)}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

ProductsList.propTypes = {
    productType: PropTypes.string.isRequired,
    sortComparer: PropTypes.func,
    onProductSelect: PropTypes.func,
};
