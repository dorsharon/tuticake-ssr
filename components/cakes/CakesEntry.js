import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Button, Typography, CardContent as MuiCardContent, Card } from '@material-ui/core';
import { useInView } from 'react-intersection-observer';
import { getCommonColor, getFontFamily, getGradient } from '../../utils/ThemeSelectors';
import { motion } from 'framer-motion';
import Carousel from '../common/ImageCarousel';
import Skeleton from '@material-ui/lab/Skeleton';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';
import Image from 'next/image';

const CakesEntryWrapper = styled(Card)`
    position: relative;
    display: flex;
    flex-direction: column;
`;

const ImageCarousel = styled(Carousel)`
    height: 200px;
`;

const PurchaseButton = styled(Button)`
    justify-self: flex-end;
    align-self: flex-end;
    background: ${getGradient()};
    width: 100%;
    color: ${getCommonColor('white')};
    font-size: 1.2rem;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    padding: 12px 16px;
`;

const ProductTitle = styled(Typography).attrs(() => ({
    variant: 'h4',
}))`
    text-align: center;
`;

const ProductDescription = styled(Typography).attrs(() => ({
    variant: 'subtitle1',
}))`
    height: 7rem;
    overflow: auto;
`;

const ProductPrice = styled(Typography).attrs(() => ({
    variant: 'subtitle1',
}))`
    text-align: center;
    margin-block-start: 10px;
`;

const InfoChip = styled.div`
    border-radius: 2px;
    font-size: 1rem;
    background-color: ${(props) => props.backgroundColor};
    color: ${getCommonColor('white')};
    padding: 3px 6px;
    font-family: ${getFontFamily()};
`;

const CardContent = styled(MuiCardContent)`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ChipsWrapper = styled.div`
    z-index: 1;
    display: flex;
    position: absolute;
    top: 0;
`;

export default function CakesEntry(props) {
    const { cake } = props;

    const {
        id,
        nameHe,
        nameEn,
        descriptionHe,
        descriptionEn,
        price,
        isDairy,
        isGlutenFree,
        images,
    } = cake ?? {};

    const router = useRouter();
    const { locale } = router;

    const { t } = useI18n();

    const [ref, isInView] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const name = locale === 'he' ? nameHe : nameEn;
    const description = locale === 'he' ? descriptionHe : descriptionEn;

    if (!cake) {
        return (
            <Card>
                <Skeleton variant={'rect'} height={200} />

                <CardContent>
                    <Grid container direction={'column'} alignItems={'center'}>
                        <ProductTitle variant={'h3'}>
                            <Skeleton width={200} />
                        </ProductTitle>

                        <ProductDescription variant={'subtitle1'}>
                            <Skeleton width={270} />
                            <Skeleton width={270} />
                            <Skeleton width={270} />
                        </ProductDescription>

                        <ProductPrice variant={'subtitle1'}>
                            <Skeleton width={100} />
                        </ProductPrice>
                    </Grid>
                </CardContent>

                <Skeleton variant={'rect'} height={50} width={'100%'} />
            </Card>
        );
    }

    return (
        <CakesEntryWrapper
            innerRef={ref}
            component={motion.div}
            variants={{
                hidden: { y: -50, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
            }}
            initial={'hidden'}
            animate={isInView ? 'visible' : 'hidden'}
        >
            <ChipsWrapper>
                <InfoChip backgroundColor={isDairy ? '#119ebe' : '#d40000'}>
                    {t(isDairy ? 'products.dairy' : 'products.parve')}
                </InfoChip>

                {isGlutenFree && (
                    <Grid item>
                        <InfoChip backgroundColor={'#8da100'}>{t('products.glutenFree')}</InfoChip>
                    </Grid>
                )}
            </ChipsWrapper>

            <ImageCarousel>
                {images.map((url, index) => (
                    <Image
                        key={`${id}-${index}`}
                        alt={`product-${index}`}
                        src={url}
                        height={200}
                        width={200}
                        objectFit={'contain'}
                    />
                ))}
            </ImageCarousel>

            <CardContent>
                <ProductTitle>{name}</ProductTitle>

                <ProductDescription>{description}</ProductDescription>

                <ProductPrice>{`${price} ${t('products.shekels')}`}</ProductPrice>
            </CardContent>

            <PurchaseButton
                variant="contained"
                onClick={() => router.push(`/products/cakes/${cake.id}`)}
            >
                {t('products.purchase')}
            </PurchaseButton>
        </CakesEntryWrapper>
    );
}

CakesEntry.propTypes = {
    cake: PropTypes.object,
};
