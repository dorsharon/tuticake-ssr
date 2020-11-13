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
import {
    CUP_DESSERTS,
    CUP_DESSERTS_BOX_SETS,
    CUP_DESSERTS_EXAMPLE_IMAGES,
} from '../../utils/query';
import { useI18n } from 'next-localization';

const CupDessertsWrapper = styled.div`
    display: grid;
    place-items: center;
    grid-template-columns: repeat(2, calc(50% - 25px));
    column-gap: 50px;

    ${getBreakpointAndUp('md')} {
        max-width: 80%;
    }

    ${getBreakpointAndDown('sm')} {
        max-width: 85%;
    }

    ${getBreakpointAndDown('xs')} {
        max-width: 95%;
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

    ${getBreakpointAndUp('sm')} {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
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
            cache.prefetchQuery(CUP_DESSERTS_BOX_SETS),
            cache.prefetchQuery(CUP_DESSERTS),
        ]);
    }, [cache]);

    useEffect(() => {
        prefetchData();
    }, [prefetchData]);

    return (
        <CupDessertsWrapper>
            <ExampleImagesWrapper>
                {isLoading
                    ? Array.from({ length: 4 }, (_, index) => (
                          <Skeleton
                              key={`cup-dessert-image-skeleton-${index}`}
                              variant={'rect'}
                              height={240}
                              width={300}
                          />
                      ))
                    : exampleImages?.map((url, index) => (
                          <ExampleImage key={url} alt={`example-image-${index}`} src={url} />
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
