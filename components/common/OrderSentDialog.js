import React from 'react';
import { Button as MuiButton, Dialog, DialogContent, Grid, Typography } from '@material-ui/core';
import { I18n, Translate } from 'react-redux-i18n';
import styled from 'styled-components';
import { ReactComponent as CupcakeSvg } from '../../public/logo-cupcake.svg';
import {
    getCommonColor,
    getGradient,
    getPrimaryColor,
    getSecondaryColor,
} from '../../utils/ThemeSelectors';
import { useHistory } from 'react-router-dom';
import { FaSadTear } from 'react-icons/fa';
import CircularProgress from '@material-ui/core/CircularProgress';

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

    const history = useHistory();

    const renderErrorMessage = () => (
        <>
            <Grid item>
                <FaSadTear size={50} />
            </Grid>

            <Grid item>
                <Message variant={'h5'}>{I18n.t('order.orderError.sorry')}</Message>
                <Message variant={'h5'}>{I18n.t('order.orderError.unableToReceive')}</Message>
                <Message variant={'h5'}>{I18n.t('order.orderError.contact')}</Message>
            </Grid>
        </>
    );

    const renderProcessingMessage = () => (
        <>
            <Grid item>
                <CircularProgress />
            </Grid>

            <Grid item>
                <Message variant={'h5'}>{I18n.t('order.orderProcessing.justAMoment')}</Message>
                <Message variant={'h5'}>{I18n.t('order.orderProcessing.processing')}</Message>
            </Grid>
        </>
    );

    const renderSuccessMessage = () => (
        <>
            <Grid item>
                <CupcakeIcon />
            </Grid>

            <Grid item>
                <Message variant={'h5'}>
                    <Translate value={'order.orderSuccess.submitted'} />
                </Message>
                <Message variant={'h5'}>
                    <Translate value={'order.orderSuccess.payment'} />
                </Message>
                <Message variant={'h5'}>
                    <Translate value={'order.orderSuccess.thankYou'} />
                </Message>
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
                        <Button onClick={() => history.push('/')}>
                            <Translate value={'order.orderSuccess.backToMainPage'} />
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}
