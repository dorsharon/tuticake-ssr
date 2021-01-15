import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import {
    getPrimaryColor,
    getBreakpointAndDown,
    getBreakpointAndUp,
    getCommonColor,
} from '../../utils/ThemeSelectors';
import CakeFormOrder from './CakeOrderForm';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { PRODUCT } from '../../constants/queryKeys';
import ImageCarousel from '../common/ImageCarousel';
import Image from 'next/image';

const CakeProductDetailsWrapper = styled.div`
    display: grid;
    place-items: center;

    ${getBreakpointAndUp('md')} {
        max-width: 70%;
        grid-template-columns: repeat(2, calc(50% - 25px));
        column-gap: 50px;
    }

    ${getBreakpointAndDown('sm')} {
        max-width: 85%;
        grid-template-rows: auto auto;
        row-gap: 50px;
    }

    ${getBreakpointAndDown('xs')} {
        max-width: 90%;
    }
`;

const ProductInfoWrapper = styled.div`
    display: grid;
    grid-template-rows: 400px 1fr;
    row-gap: 20px;

    ${getBreakpointAndUp('sm')} {
        position: sticky;
        top: 5rem;
    }
`;

const ProductName = styled(Typography).attrs(() => ({ variant: 'h4' }))`
    text-align: center;
    color: ${getPrimaryColor()};
`;

const ProductDescription = styled(Typography).attrs(() => ({ variant: 'h6' }))`
    color: ${getCommonColor('black')};
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
        <CakeProductDetailsWrapper>
            <ProductInfoWrapper>
                <ImageCarousel>
                    {images.map((url, index) => (
                        <Image
                            key={`${id}-${index}`}
                            alt={`product-${index}`}
                            src={url}
                            height={400}
                            width={350}
                            objectFit={'contain'}
                        />
                    ))}
                </ImageCarousel>

                <ProductName>{name}</ProductName>

                <ProductDescription>{description}</ProductDescription>
            </ProductInfoWrapper>

            <CakeFormOrder product={product} />
        </CakeProductDetailsWrapper>
    );
}
