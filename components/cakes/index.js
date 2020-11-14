import React from 'react';
import styled from 'styled-components';
import { getBreakpointAndDown, getBreakpointAndUp } from '../../utils/ThemeSelectors';
import { useQuery } from 'react-query';
import { Grid } from '@material-ui/core';
import CakesEntry from './CakesEntry';
import { PRODUCTS } from '../../constants/queryKeys';

const ProductsListWrapper = styled.div`
    margin-block-start: 20px;

    ${getBreakpointAndUp('lg')} {
        width: 70%;
    }

    ${getBreakpointAndDown('md')} {
        width: 90%;
    }
`;

export default function Cakes() {
    const { data: cakes, isLoading } = useQuery([PRODUCTS, { productType: 'cake' }]);

    return (
        <ProductsListWrapper>
            <Grid container justify={'center'} spacing={5}>
                {!cakes || isLoading
                    ? Array.from({ length: 3 }, (_, index) => (
                          <Grid key={`cake-skeleton-${index}`} item xs={12} sm={6} md={4}>
                              <CakesEntry />
                          </Grid>
                      ))
                    : cakes?.map((cake) => (
                          <Grid item key={cake.id} xs={12} sm={6} md={4}>
                              <CakesEntry cake={cake} />
                          </Grid>
                      ))}
            </Grid>
        </ProductsListWrapper>
    );
}
