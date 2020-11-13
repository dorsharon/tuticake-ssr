import React from 'react';
import {
    Button as MuiButton,
    Dialog,
    DialogContent,
    Grid,
    Typography,
    CircularProgress,
} from '@material-ui/core';
import styled from 'styled-components';
import CupcakeSvg from '../../public/logo-cupcake.svg';
import {
    getCommonColor,
    getGradient,
    getPrimaryColor,
    getSecondaryColor,
} from '../../utils/ThemeSelectors';
import { FaSadTear } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';

const CupcakeIcon = styled(CupcakeSvg)`
    fill: ${getSecondaryColor()};
    width: 100px;
    height: 100px;
`;

const Message = styled(Typography)`
    color: ${getPrimaryColor()};
    text-align: center;
`;

const Button = styled(MuiButton)`
    background: ${getGradient()};
    color: ${getCommonColor('white')};
`;

export default function OrderSentDialog(props) {
    const { isOpen, isProcessing, hasError, children } = props;

    const { t } = useI18n();

    const router = useRouter();

    const renderErrorMessage = () => (
        <>
            <Grid item>
                <FaSadTear size={50} />
            </Grid>

            <Grid item>
                <Message variant={'h5'}>{t('order.orderError.sorry')}</Message>
                <Message variant={'h5'}>{t('order.orderError.unableToReceive')}</Message>
                <Message variant={'h5'}>{t('order.orderError.contact')}</Message>
            </Grid>
        </>
    );

    const renderProcessingMessage = () => (
        <>
            <Grid item>
                <CircularProgress />
            </Grid>

            <Grid item>
                <Message variant={'h5'}>{t('order.orderProcessing.justAMoment')}</Message>
                <Message variant={'h5'}>{t('order.orderProcessing.processing')}</Message>
            </Grid>
        </>
    );

    const renderSuccessMessage = () => (
        <>
            <Grid item>
                <CupcakeIcon />
            </Grid>

            <Grid item>
                <Message variant={'h5'}>{t('order.orderSuccess.submitted')}</Message>
                <Message variant={'h5'}>{t('order.orderSuccess.payment')} </Message>
                <Message variant={'h5'}>{t('order.orderSuccess.thankYou')}</Message>
            </Grid>
        </>
    );

    return (
        <Dialog open={isOpen}>
            <DialogContent>
                <Grid container direction={'column'} alignItems={'center'} spacing={4}>
                    {hasError
                        ? renderErrorMessage()
                        : isProcessing
                        ? renderProcessingMessage()
                        : renderSuccessMessage()}

                    {children}

                    <Grid item>
                        <Button onClick={() => router.push('/')}>
                            {t('order.orderSuccess.backToMainPage')}
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}
