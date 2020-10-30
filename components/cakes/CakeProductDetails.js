import React from 'react';
import styled from 'styled-components';
import { Grid, Typography, Divider as MuiDivider } from '@material-ui/core';
import ImageCarousel from '../products/ImageCarousel';
import { useSelector } from 'react-redux';
import { selectI18nLocale } from '../../redux/i18n/i18nSelectors';
import {
    getPrimaryColor,
    getBreakpointAndDown,
    getBreakpointAndUp,
} from '../../utils/ThemeSelectors';
import { useParams } from 'react-router-dom';
import useProducts from '../common/hooks/useProducts';
import GeneralError from '../common/errors/GeneralError';
import Skeleton from '@material-ui/lab/Skeleton';
import CakeFormOrder from './CakeOrderForm';

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

export default function CakeProductDetails() {
    const { productId } = useParams();

    const {
        data: { [productId]: product = {} },
        isLoading,
        hasError,
    } = useProducts({
        asObject: true,
        productType: 'cake',
    });

    const {
        nameHe = '',
        nameEn = '',
        descriptionHe = '',
        descriptionEn = '',
        images = [],
    } = product;

    const locale = useSelector(selectI18nLocale);

    const name = locale === 'he' ? nameHe : nameEn;
    const description = locale === 'he' ? descriptionHe : descriptionEn;

    if (!productId) {
        return null;
    }

    if (hasError) {
        return <GeneralError />;
    }

    return (
        <Grid container component={CakeProductDetailsWrapper} alignItems={'center'} spacing={6}>
            <Grid item sm={12} md={6}>
                <ProductInfoWrapper>
                    {isLoading ? (
                        <Skeleton variant={'rect'} height={400} />
                    ) : (
                        <>
                            <ImageCarousel images={images} maxHeight={400} />

                            <Divider />

                            <ProductName>{name}</ProductName>

                            <ProductDescription>{description}</ProductDescription>
                        </>
                    )}
                </ProductInfoWrapper>
            </Grid>

            <Grid item sm={12} md={6}>
                <CakeFormOrder />
            </Grid>
        </Grid>
    );
}
