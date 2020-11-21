import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { useQuery, useQueryCache } from 'react-query';
import {
    getBreakpointAndDown,
    getBreakpointAndUp,
    getCommonColor,
    getGradient,
    getPrimaryColor,
} from '../../utils/ThemeSelectors';
import { Skeleton } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import CupDessertsOrderForm from './CupDessertsOrderForm';
import { useI18n } from 'next-localization';
import { CUP_DESSERTS_EXAMPLE_IMAGES, PRODUCTS } from '../../constants/queryKeys';
import { CUP_DESSERT, CUP_DESSERTS_BOX_SET } from '../../constants/productTypes';
import Image from 'next/image';
import ImageCarousel from '../common/ImageCarousel';

const CupDessertsWrapper = styled.div`
    display: grid;
    place-items: center;
    width: 90%;

    ${getBreakpointAndUp('md')} {
        grid-template-columns: repeat(2, calc(50% - 25px));
        column-gap: 50px;
    }

    ${getBreakpointAndDown('sm')} {
        grid-template-rows: repeat(2, auto);
        row-gap: 50px;
    }
`;

const Introduction = styled(Typography).attrs(() => ({
    variant: 'h5',
}))`
    text-align: center;
    color: ${getPrimaryColor()};
    margin-block-start: 20px;
`;

const StartOrderButton = styled(Button)`
    background: ${getGradient()};
    color: ${getCommonColor('white')};
    padding: 12px;
    font-size: 1.5rem;
    width: 200px;
    margin-block-start: 20px;
    margin-block-end: 20px;
`;

const ExampleImagesWrapper = styled.div`
    display: grid;

    ${getBreakpointAndUp('md')} {
        grid-template-columns: repeat(2, 250px);
        grid-template-rows: repeat(2, 250px);

        & > div {
            filter: drop-shadow(2px 4px 6px black);
            transform: rotate(20deg);

            &:nth-child(1) {
                transform: rotate(20deg);
            }

            &:nth-child(2) {
                transform: rotate(-15deg);
            }

            &:nth-child(3) {
                transform: rotate(15deg);
            }

            &:nth-child(4) {
                transform: rotate(-5deg);
            }
        }
    }

    ${getBreakpointAndUp('lg')} {
        grid-template-columns: repeat(2, 300px);
        grid-template-rows: repeat(2, 300px);
    }

    ${getBreakpointAndDown('sm')} {
        grid-template-rows: 250px;
        width: 100%;
        margin-block-start: 40px;
    }
`;

export default function CupDesserts() {
    const { t } = useI18n();

    const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

    const cache = useQueryCache();

    const { data: exampleImages, isLoading } = useQuery(CUP_DESSERTS_EXAMPLE_IMAGES);

    const prefetchData = useCallback(async () => {
        await Promise.all([
            cache.prefetchQuery([PRODUCTS, { productType: CUP_DESSERTS_BOX_SET }]),
            cache.prefetchQuery([PRODUCTS, { productType: CUP_DESSERT }]),
        ]);
    }, [cache]);

    const isInBreakpointSm = useMediaQuery((theme) => getBreakpointAndDown('sm')({ theme }));

    useEffect(() => {
        prefetchData();
    }, [prefetchData]);

    return (
        <CupDessertsWrapper>
            <ExampleImagesWrapper>
                {!exampleImages || isLoading ? (
                    isInBreakpointSm ? (
                        <Skeleton variant={'rect'} height={240} width={300} />
                    ) : (
                        Array.from({ length: 4 }, (_, index) => (
                            <Skeleton
                                key={`cup-dessert-image-skeleton-${index}`}
                                variant={'rect'}
                                height={300}
                                width={300}
                            />
                        ))
                    )
                ) : isInBreakpointSm ? (
                    <ImageCarousel images={exampleImages} />
                ) : (
                    exampleImages
                        ?.sort((i1, i2) => i1.localeCompare(i2))
                        ?.map((url, index) => (
                            <Image
                                key={url}
                                alt={`example-image-${index}`}
                                src={url}
                                height={300}
                                width={300}
                                objectFit={'contain'}
                            />
                        ))
                )}
            </ExampleImagesWrapper>

            {isOrderFormOpen ? (
                <CupDessertsOrderForm />
            ) : (
                <Grid container direction={'column'} alignItems={'center'} justify={'center'}>
                    {['1', '2', '3', '4', '5'].map((i) => (
                        <Introduction key={i}>{t(`cupDesserts.introduction.${i}`)}</Introduction>
                    ))}

                    <StartOrderButton size={'large'} onClick={() => setIsOrderFormOpen(true)}>
                        {t('cupDesserts.startOrder')}
                    </StartOrderButton>
                </Grid>
            )}
        </CupDessertsWrapper>
    );
}
