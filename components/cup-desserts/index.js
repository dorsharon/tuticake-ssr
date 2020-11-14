import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
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
import NextImage from 'next/image';

const CupDessertsWrapper = styled.div`
    display: grid;
    place-items: center;
    grid-template-columns: repeat(2, calc(50% - 25px));
    column-gap: 50px;

    & > :first-child {
        order: 1;
    }

    & > :last-child {
        order: 0;
    }

    ${getBreakpointAndUp('md')} {
        width: 80%;
    }

    ${getBreakpointAndDown('sm')} {
        width: 85%;
    }

    ${getBreakpointAndDown('xs')} {
        width: 95%;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(2, auto);

        & > :first-child {
            order: 1;
            margin-block-start: 40px;
            margin-block-end: 40px;
        }

        & > :last-child {
            order: 0;
        }
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

const Image = styled(NextImage)`
    object-fit: fill;
`;

const ExampleImagesWrapper = styled.div`
    display: grid;

    ${getBreakpointAndUp('sm')} {
        grid-template-columns: repeat(2, 300px);
        grid-template-rows: repeat(2, 300px);
    }

    ${getBreakpointAndDown('xs')} {
        grid-template-columns: 100%;
        grid-template-rows: 250px;
    }

    & > * {
        border: 10px solid white;
        filter: drop-shadow(2px 4px 6px black);

        :nth-child(1) {
            transform: rotate(20deg);
        }

        :nth-child(2) {
            transform: rotate(-15deg);
        }

        :nth-child(3) {
            transform: rotate(15deg);
        }

        :nth-child(4) {
            transform: rotate(-5deg);
        }
    }
`;

const ExampleImage = styled.img`
    max-width: 300px;
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

    useEffect(() => {
        prefetchData();
    }, [prefetchData]);

    return (
        <CupDessertsWrapper>
            <ExampleImagesWrapper>
                {!exampleImages || isLoading
                    ? Array.from({ length: 4 }, (_, index) => (
                          <Skeleton
                              key={`cup-dessert-image-skeleton-${index}`}
                              variant={'rect'}
                              height={240}
                              width={300}
                          />
                      ))
                    : exampleImages?.map((url, index) => (
                          <Image
                              key={url}
                              alt={`example-image-${index}`}
                              src={url}
                              height={240}
                              width={300}
                          />
                      ))}
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
