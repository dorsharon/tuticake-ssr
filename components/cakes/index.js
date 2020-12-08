import React from 'react';
import styled from 'styled-components';
import { getBreakpointAndDown, getBreakpointAndUp } from '../../utils/ThemeSelectors';
import { useQuery } from 'react-query';
import { Grid } from '@material-ui/core';
import CakesEntry from './CakesEntry';
import { PRODUCTS } from '../../constants/queryKeys';

const ProductsListWrapper = styled.div`
    margin-block-start: 20px;
    display: grid;
    column-gap: 30px;
    row-gap: 30px;

    ${getBreakpointAndUp('md')} {
        width: 70%;
        grid-template-columns: 1fr 1fr 1fr;
    }

    ${getBreakpointAndDown('md')} {
        width: 90%;
        grid-template-columns: 1fr 1fr;
    }

    ${getBreakpointAndDown('xs')} {
        width: 90%;
        grid-template-columns: 1fr;
    }
`;

export default function Cakes() {
    const { data: cakes, isLoading } = useQuery([PRODUCTS, { productType: 'cake' }]);

    return (
        <ProductsListWrapper>
            {!cakes || isLoading
                ? Array.from({ length: 3 }, (_, index) => (
                      <CakesEntry key={`cake-skeleton-${index}`} />
                  ))
                : cakes?.map((cake) => <CakesEntry key={cake.id} cake={cake} />)}
        </ProductsListWrapper>
    );
}
