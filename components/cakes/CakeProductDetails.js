import React from 'react';
import styled from 'styled-components';
import { Grid, Typography, Divider as MuiDivider } from '@material-ui/core';
import {
    getPrimaryColor,
    getBreakpointAndDown,
    getBreakpointAndUp,
} from '../../utils/ThemeSelectors';
import CakeFormOrder from './CakeOrderForm';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { PRODUCT } from '../../constants/queryKeys';
import ImageCarousel from '../common/ImageCarousel';

const CakeProductDetailsWrapper = styled.div`
    ${getBreakpointAndUp('md')} {
        max-width: 70%;
    }

    ${getBreakpointAndDown('sm')} {
        max-width: 85%;
    }

    ${getBreakpointAndDown('xs')} {
        max-width: 95%;
    }
`;

const ProductInfoWrapper = styled.div`
    position: sticky;
    top: 5rem;
`;

const ProductName = styled(Typography).attrs(() => ({ variant: 'h4' }))`
    text-align: center;
    color: ${getPrimaryColor()};
    margin-block-end: 10px;
`;

const ProductDescription = styled(Typography).attrs(() => ({ variant: 'h6' }))``;

const Divider = styled(MuiDivider)`
    margin-block-start: 10px;
    margin-block-end: 10px;
    background-color: ${getPrimaryColor()};
`;

export default function CakeProductDetails({ id }) {
    const { data: product } = useQuery([PRODUCT, id]);

    const { nameHe = '', nameEn = '', descriptionHe = '', descriptionEn = '', images = [] } =
        product ?? {};

    const { locale } = useRouter();

    const name = locale === 'he' ? nameHe : nameEn;
    const description = locale === 'he' ? descriptionHe : descriptionEn;

    if (!product) {
        return null;
    }

    return (
        <Grid container component={CakeProductDetailsWrapper} alignItems={'center'} spacing={6}>
            <Grid item sm={12} md={6}>
                <ProductInfoWrapper>
                    <>
                        <ImageCarousel images={images} maxHeight={400} />

                        <Divider />

                        <ProductName>{name}</ProductName>

                        <ProductDescription>{description}</ProductDescription>
                    </>
                </ProductInfoWrapper>
            </Grid>

            <Grid item sm={12} md={6}>
                <CakeFormOrder product={product} />
            </Grid>
        </Grid>
    );
}
