import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import {
    Grid,
    TextField as MuiTextField,
    Typography,
    Button as MuiButton,
} from '@material-ui/core';
import { FormProvider, useForm } from 'react-hook-form';
import { Translate, I18n } from 'react-redux-i18n';
import { getCommonColor, getGradient, getBreakpointAndDown } from '../../utils/ThemeSelectors';
import { useParams } from 'react-router-dom';
import useProducts from '../common/hooks/useProducts';
import GeneralError from '../common/errors/GeneralError';
import Skeleton from '@material-ui/lab/Skeleton';
import { sendNewOrder } from '../../utils/Email';
import { motion, AnimatePresence } from 'framer-motion';
import OrderFormCustomerDetails from '../common/OrderFormCustomerDetails';
import OrderSentDialog from '../common/OrderSentDialog';
import { useImmer } from 'use-immer';
import CakeOrderItem from '../../utils/orders/CakeOrderItem';
import Order from '../../utils/orders/Order';
import { DateTime } from 'luxon';

const Step1Wrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(4, 25px 50px);
`;

const TextField = styled(MuiTextField).attrs(() => ({
    InputLabelProps: {
        classes: {
            root: 'text-field-label',
            shrink: 'text-field-label-shrink',
        },
    },
}))`
    // RTL fix
    .text-field-label {
        right: ${({ theme }) => (theme.direction === 'rtl' ? 0 : 'auto')};
    }

    .text-field-label-shrink {
        transform-origin: ${({ theme }) => (theme.direction === 'rtl' ? 'top right' : 'top left')};
    }
`;

const BackButton = styled(MuiButton)`
    padding: 12px;
    font-size: 1.5rem;
    width: 200px;
    margin-block-start: 20px;
    margin-block-end: 20px;

    ${getBreakpointAndDown('xs')} {
        width: 150px;
    }
`;

const Button = styled(MuiButton)`
    background: ${getGradient()};
    color: ${getCommonColor('white')};
    padding: 12px;
    font-size: 1.5rem;
    width: 200px;
    margin-block-start: 20px;
    margin-block-end: 20px;

    &.tc-disabled {
        background: #a5a5a5;
    }

    ${getBreakpointAndDown('xs')} {
        width: 150px;
    }
`;

const TotalPrice = styled(Typography)`
    margin-block-start: 10px;
`;

const productDetailsKeys = ['topping', 'flavors', 'writing', 'productNotes'];

export default function CakeFormOrder() {
    const { productId } = useParams();

    const [{ formStep, step1Values }, setFormState] = useImmer({
        formStep: 1,
        step1Values: null,
    });
    const [isOrderSentDialogOpen, setIsOrderSentDialogOpen] = useState(false);

    const {
        data: { [productId]: product = {} },
        isLoading,
        hasError,
    } = useProducts({
        asObject: true,
        productType: 'cake',
    });

    const { nameHe = '', price } = product;

    const formMethods = useForm();
    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = formMethods;
    const deliveryMethod = watch('deliveryMethod', 'pickup');
    const totalPrice = price + (deliveryMethod === 'delivery' ? 30 : 0);

    const handleBack = () => {
        setFormState(state => {
            state.formStep = Math.max(state.formStep - 1, 0);
        });
    };

    const submitForm = async values => {
        if (formStep === 1) {
            setFormState(state => {
                state.step1Values = values;
                state.formStep = 2;
            });
        } else {
            setIsOrderSentDialogOpen(true);

            await sendNewOrder(
                new Order(
                    { fullName: values.fullName, phoneNumber: values.phoneNumber },
                    {
                        method: values.deliveryMethod,
                        dateTime: DateTime.fromFormat(values.deliveryDateTime, 'dd/MM/yyyy, hh:mm'),
                        city: values.deliveryCity,
                        address: values.deliveryAddress,
                    },
                    [
                        new CakeOrderItem(
                            nameHe,
                            {
                                topping: step1Values.topping,
                                flavors: step1Values.flavors,
                                writing: step1Values.writing,
                            },
                            step1Values.productNotes,
                        ),
                    ],
                    values.orderNotes,
                    totalPrice,
                ),
            );
        }
    };

    const renderStep1 = () => (
        <>
            <Step1Wrapper>
                {productDetailsKeys.map(key => (
                    <Fragment key={key}>
                        <Typography variant={'subtitle1'}>
                            <Translate value={`cakes.questions.${key}.question`} />
                        </Typography>

                        <TextField
                            name={key}
                            disabled={isLoading}
                            inputRef={register}
                            placeholder={I18n.t(`cakes.questions.${key}.example`)}
                            fullWidth
                        />
                    </Fragment>
                ))}
            </Step1Wrapper>

            <Grid container justify={'flex-end'}>
                <Button type={'submit'} onClick={handleSubmit}>
                    <Translate value={`common.next`} />
                </Button>
            </Grid>
        </>
    );

    const renderStep2 = () => (
        <>
            <OrderFormCustomerDetails />

            {isLoading ? (
                <Skeleton variant={'text'} />
            ) : (
                <TotalPrice variant={'h5'}>
                    <Translate value={'order.finalPrice'} />: {totalPrice}{' '}
                    <Translate value={'products.shekels'} />
                </TotalPrice>
            )}

            <Grid container justify={'space-between'}>
                <BackButton variant={'outlined'} onClick={handleBack}>
                    <Translate value={`common.back`} />
                </BackButton>

                <Button type={'submit'}>{I18n.t('order.purchase')}</Button>
            </Grid>
        </>
    );

    const renderStep = () => {
        switch (formStep) {
            case 1:
                return renderStep1();
            case 2:
                return renderStep2();
            default:
                return null;
        }
    };

    if (!productId) {
        return null;
    }

    if (hasError) {
        return <GeneralError />;
    }

    return (
        <>
            <FormProvider {...formMethods}>
                <form onSubmit={handleSubmit(submitForm)}>
                    <AnimatePresence initial={false} exitBeforeEnter>
                        <Grid
                            container
                            direction={'column'}
                            component={motion.div}
                            key={formStep}
                            initial={{ opacity: 0, y: 200 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -200 }}
                        >
                            {renderStep()}
                        </Grid>
                    </AnimatePresence>
                </form>
            </FormProvider>

            <OrderSentDialog isOpen={isOrderSentDialogOpen} isProcessing={isSubmitting} />
        </>
    );
}
