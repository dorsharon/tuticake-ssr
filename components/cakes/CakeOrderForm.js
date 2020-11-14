import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import {
    Grid,
    TextField as MuiTextField,
    Typography,
    Button as MuiButton,
} from '@material-ui/core';
import { FormProvider, useForm } from 'react-hook-form';
import { getCommonColor, getGradient, getBreakpointAndDown } from '../../utils/ThemeSelectors';
import { motion, AnimatePresence } from 'framer-motion';
import OrderFormCustomerDetails from '../common/OrderFormCustomerDetails';
import OrderSentDialog from '../common/OrderSentDialog';
import { useImmer } from 'use-immer';
import { DateTime } from 'luxon';
import { useI18n } from 'next-localization';
import http from '../../utils/http';

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

export default function CakeFormOrder({ product }) {
    const { t } = useI18n();

    const [{ formStep, step1Values }, setFormState] = useImmer({
        formStep: 1,
        step1Values: null,
    });
    const [isOrderSentDialogOpen, setIsOrderSentDialogOpen] = useState(false);

    const { nameHe = '', price } = product ?? {};

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
        setFormState((state) => {
            state.formStep = Math.max(state.formStep - 1, 0);
        });
    };

    const submitForm = async (values) => {
        if (formStep === 1) {
            setFormState((state) => {
                state.step1Values = values;
                state.formStep = 2;
            });
        } else {
            // setIsOrderSentDialogOpen(true);

            const result = await http.post(`/api/orders`, {
                customer: { fullName: values.fullName, phoneNumber: values.phoneNumber },
                delivery: {
                    method: values.deliveryMethod,
                    dateTime: DateTime.fromFormat(values.deliveryDateTime, 'dd/MM/yyyy, hh:mm').toISO(),
                    city: values.deliveryCity,
                    address: values.deliveryAddress,
                },
                products: [
                    {
                        type: 'cake',
                        name: nameHe,
                        extras: {
                            topping: step1Values.topping,
                            flavors: step1Values.flavors,
                            writing: step1Values.writing,
                        },
                        notes: step1Values.productNotes,
                    },
                ],
                orderNotes: values.orderNotes,
                totalPrice,
            });

            console.log(result)
        }
    };

    const renderStep1 = () => (
        <>
            <Step1Wrapper>
                {productDetailsKeys.map((key) => (
                    <Fragment key={key}>
                        <Typography variant={'subtitle1'}>
                            {t(`cakes.questions.${key}.question`)}
                        </Typography>

                        <TextField
                            name={key}
                            inputRef={register}
                            placeholder={t(`cakes.questions.${key}.example`)}
                            fullWidth
                        />
                    </Fragment>
                ))}
            </Step1Wrapper>

            <Grid container justify={'flex-end'}>
                <Button type={'submit'} onClick={handleSubmit}>
                    {t(`common.next`)}
                </Button>
            </Grid>
        </>
    );

    const renderStep2 = () => (
        <>
            <OrderFormCustomerDetails />

            <TotalPrice variant={'h5'}>
                {t('order.finalPrice')}: {totalPrice} {t('products.shekels')}
            </TotalPrice>

            <Grid container justify={'space-between'}>
                <BackButton variant={'outlined'} onClick={handleBack}>
                    {t('common.back')}
                </BackButton>

                <Button type={'submit'}>{t('order.purchase')}</Button>
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

    if (!product) {
        return null;
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
