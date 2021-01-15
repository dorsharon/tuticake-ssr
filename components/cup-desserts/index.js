import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { useQuery, useQueryCache } from 'react-query';
import {
    getBackgroundColor,
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
import Carousel from '../common/ImageCarousel';

const CupDessertsWrapper = styled.div`
    display: grid;
    place-items: center;
    width: 100%;

    ${getBreakpointAndUp('md')} {
        grid-template-columns: repeat(2, 50%);
    }

    ${getBreakpointAndDown('sm')} {
        grid-template-rows: 385px auto;
        row-gap: 10px;
        margin-block-end: 20px;
    }
`;

const IntroductionWrapper = styled.div`
    ${getBreakpointAndUp('lg')} {
        width: 60%;
    }

    ${getBreakpointAndDown('sm')} {
        width: 90%;
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

const ImageWrapper = styled.div`
    & > div {
        border: 10px solid ${getCommonColor('white')};
        filter: drop-shadow(2px 4px 6px black);
        box-sizing: border-box;
    }
`;

const ImageCarousel = styled(Carousel)`
    margin-block-start: 20px;

    & .control-dots {
        bottom: 25px;
    }

    & .prev-button,
    .next-button {
        top: calc(50% - 20px);
        svg {
            fill: ${getCommonColor('white')};
        }
    }
`;

const ExampleImagesWrapper = styled.div`
    background: ${getGradient()};
    height: 100%;
    width: 100%;

    ${getBreakpointAndUp('md')} {
        display: grid;
        place-content: center;
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
        display: grid;
        place-content: center;
        grid-template-columns: repeat(2, 300px);
        grid-template-rows: repeat(2, 300px);
    }
`;

export default function CupDesserts() {
    const { t } = useI18n();

    const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

    const exampleImageUrls = [1, 2, 3, 4].map(
        (i) => `website-assets/cup-desserts-examples/example${i}.webp`,
    );

    const cache = useQueryCache();

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
                {isInBreakpointSm ? (
                    <ImageCarousel>
                        {exampleImageUrls?.map((url, index) => (
                            <ImageWrapper key={url}>
                                <Image
                                    alt={`example-image-${index}`}
                                    src={url}
                                    width={300}
                                    height={300}
                                    // layout={'fill'}
                                    objectFit={'cover'}
                                />
                            </ImageWrapper>
                        ))}
                    </ImageCarousel>
                ) : (
                    exampleImageUrls?.map((url, index) => (
                        <ImageWrapper key={url}>
                            <Image
                                alt={`example-image-${index}`}
                                src={url}
                                width={300}
                                height={300}
                                // layout={'fill'}
                                objectFit={'cover'}
                            />
                        </ImageWrapper>
                    ))
                )}
            </ExampleImagesWrapper>

            {isOrderFormOpen ? (
                <CupDessertsOrderForm />
            ) : (
                <Grid
                    container
                    direction={'column'}
                    alignItems={'center'}
                    justify={'center'}
                    component={IntroductionWrapper}
                >
                    {[1, 2, 3, 4, 5].map((i) => (
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
