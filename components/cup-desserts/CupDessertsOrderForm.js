import React, { useState } from 'react';
import styled from 'styled-components';
import { Button as MuiButton, IconButton, Typography } from '@material-ui/core';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import GeneralError from '../common/errors/GeneralError';
import {
    getBreakpointAndDown,
    getBreakpointAndUp,
    getCommonColor,
    getGradient,
    getPrimaryColor,
} from '../../utils/ThemeSelectors';
import { I18n, Translate } from 'react-redux-i18n';
import Grid from '@material-ui/core/Grid';
import { AnimatePresence, motion } from 'framer-motion';
import { CUP_DESSERTS, CUP_DESSERTS_BOX_SETS } from '../../utils/query';
import { Skeleton } from '@material-ui/lab';
import { FiMinus as MinusIcon, FiPlus as PlusIcon } from 'react-icons/fi';
import { useImmer } from 'use-immer';
import OrderFormCustomerDetails from '../common/OrderFormCustomerDetails';
import { sendNewOrder } from '../../utils/Email';
import Order from '../../utils/orders/Order';
import CupDessertsBoxSetOrderItem from '../../utils/orders/CupDessertsBoxSetOrderItem';
import OrderSentDialog from '../common/OrderSentDialog';
import { useSelector } from 'react-redux';
import { selectI18nLocale } from '../../redux/i18n/i18nSelectors';
import { DateTime } from 'luxon';

const customFlavorId = '5fc6ff34-2315-480a-b436-d01e9dcc89c5';

const Form = styled.form`
    width: 100%;
`;

const QuantityOption = styled.button`
    border: 2px solid ${getPrimaryColor()};
    border-radius: 3px;
    background-color: ${getCommonColor('white')};
    outline: none;
    cursor: pointer;
    transition: all 300ms ease;
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-block-end: 15px;

    :hover {
        background-color: ${getPrimaryColor()};
        color: ${getCommonColor('white')};
        transform: scale(1.2);
    }
`;

const QuantityPickerWrapper = styled.div`
    display: grid;
    margin-block-start: 20px;
    margin-block-end: 20px;

    ${getBreakpointAndUp('sm')} {
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 50px;
    }

    ${getBreakpointAndDown('xs')} {
        grid-template-columns: 1fr;
        row-gap: 30px;
    }
`;

const FlavorOption = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid ${getPrimaryColor()};
    border-radius: 3px;
    background-color: ${getCommonColor('white')};
    outline: none;
    transition: all 300ms ease;
    justify-content: center;

    & > * {
        margin-block-start: 10px;
    }
`;

const FlavorName = styled(Typography)`
    max-width: 80%;
`;

const FlavorsPickerWrapper = styled.div`
    display: grid;
    margin-block-start: 20px;
    margin-block-end: 20px;

    ${getBreakpointAndUp('sm')} {
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 30px;
        row-gap: 30px;
    }

    ${getBreakpointAndDown('xs')} {
        grid-template-columns: 1fr 1fr;
        row-gap: 30px;
        column-gap: 10px;
    }
`;

const FlavorImage = styled.img`
    max-width: 100px;
    max-height: 135px;
`;

const QuantityButton = styled(IconButton)`
    & svg {
        color: ${getPrimaryColor()};
    }

    &.tc-disabled svg {
        color: #cccccc;
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

const CustomFlavorNotice = styled(Typography)`
    color: ${getPrimaryColor()};
    font-weight: bold;
    text-align: center;
    font-style: italic;
    font-size: 1.2rem;
`;

export default function CupDessertsOrderForm() {
    const [{ formStep, step1Values, step2Values }, setFormState] = useImmer({
        formStep: 1,
        step1Values: null,
        step2Values: null,
    });
    const [isOrderSentDialogOpen, setIsOrderSentDialogOpen] = useState(false);

    const { data: boxSets, isLoading: isLoadingBoxSets, isError: isErrorInBoxSets } = useQuery(
        CUP_DESSERTS_BOX_SETS,
    );

    const {
        data: cupDesserts,
        isLoading: isLoadingCupDesserts,
        isError: isErrorInCupDesserts,
    } = useQuery(CUP_DESSERTS);

    const formMethods = useForm({
        defaultValues: {
            boxSetQuantity: 0,
            flavors: cupDesserts?.reduce((result, { id }) => ({ ...result, [id]: 0 }), {}) ?? {},
        },
    });
    const {
        handleSubmit,
        control,
        watch,
        formState: { isSubmitting },
    } = formMethods;
    const flavors = watch('flavors');
    const totalFlavorsCount = Object.values(flavors ?? {}).reduce(
        (result, quantity) => result + quantity,
        0,
    );

    const locale = useSelector(selectI18nLocale);

    const handleBack = () => {
        setFormState(state => {
            state.formStep = Math.max(state.formStep - 1, 1);
        });
    };

    const submitForm = async values => {
        if (formStep === 1) {
            setFormState(state => {
                state.step1Values = values;
                state.formStep = 2;
            });
        } else if (formStep === 2) {
            setFormState(state => {
                state.step2Values = values;
                state.formStep = 3;
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
                        new CupDessertsBoxSetOrderItem(
                            step1Values?.boxSetQuantity,
                            Object.entries(step2Values?.flavors)
                                .filter(([_, quantity]) => quantity > 0)
                                .map(([id, quantity]) => ({
                                    name: cupDesserts?.find(cd => cd.id === id)?.nameHe,
                                    quantity,
                                })),
                        ),
                    ],
                    values.orderNotes,
                ),
            );
        }
    };

    const renderStep1 = () => (
        <Grid container direction={'column'} alignItems={'center'}>
            <Typography variant={'h5'}>
                <Translate value={'cupDesserts.pickQuantity'} />
            </Typography>

            <Controller
                name={'boxSetQuantity'}
                control={control}
                defaultValue={null}
                render={({ onChange }) => (
                    <QuantityPickerWrapper>
                        {isLoadingBoxSets
                            ? Array.from({ length: 3 }, (_, index) => (
                                  <Skeleton
                                      key={`box-set-skeleton-${index}`}
                                      variant={'rect'}
                                      height={120}
                                      width={120}
                                  />
                              ))
                            : boxSets.map(({ quantity, price }) => (
                                  <Grid
                                      key={quantity}
                                      container
                                      direction={'column'}
                                      alignItems={'center'}
                                  >
                                      <QuantityOption
                                          key={quantity}
                                          type={'submit'}
                                          onClick={() => onChange(quantity)}
                                      >
                                          <Typography variant={'h2'}>{quantity}</Typography>
                                      </QuantityOption>

                                      <Typography variant={'h5'}>
                                          {price} {I18n.t('products.shekels')}
                                      </Typography>
                                  </Grid>
                              ))}
                    </QuantityPickerWrapper>
                )}
            />
        </Grid>
    );

    const renderStep2 = () => (
        <Grid container direction={'column'} alignItems={'center'}>
            <Typography variant={'h5'}>
                <Translate value={'cupDesserts.pickflavors'} />
            </Typography>

            <Controller
                name={'flavors'}
                control={control}
                render={({ value, onChange }) => (
                    <FlavorsPickerWrapper>
                        {isLoadingCupDesserts
                            ? Array.from({ length: 3 }, (_, index) => (
                                  <Skeleton
                                      key={`cup-skeleton-${index}`}
                                      variant={'rect'}
                                      height={120}
                                      width={120}
                                  />
                              ))
                            : cupDesserts
                                  .sort(({ id: id1 }, { id: id2 }) =>
                                      id1 === customFlavorId
                                          ? 1
                                          : id2 === customFlavorId
                                          ? -1
                                          : id1.localeCompare(id2),
                                  )
                                  .map(({ id, images, nameHe, nameEn }) => (
                                      <FlavorOption key={id}>
                                          <FlavorImage alt={'cup-dessert'} src={images[0]} />

                                          <FlavorName variant={'h6'} align={'center'}>
                                              {locale === 'he' ? nameHe : nameEn}
                                          </FlavorName>

                                          <Grid
                                              container
                                              justify={'space-evenly'}
                                              alignItems={'center'}
                                          >
                                              <QuantityButton
                                                  classes={{ disabled: 'tc-disabled' }}
                                                  disabled={(flavors?.[id] ?? 0) <= 0}
                                                  onClick={() =>
                                                      (flavors?.[id] ?? 0) > 0 &&
                                                      onChange({
                                                          ...flavors,
                                                          [id]: (flavors?.[id] ?? 0) - 1,
                                                      })
                                                  }
                                              >
                                                  <MinusIcon />
                                              </QuantityButton>

                                              <Typography variant={'h5'}>
                                                  {value?.[id] ?? 0}
                                              </Typography>

                                              <QuantityButton
                                                  classes={{ disabled: 'tc-disabled' }}
                                                  disabled={
                                                      totalFlavorsCount >=
                                                      step1Values?.boxSetQuantity
                                                  }
                                                  onClick={() =>
                                                      totalFlavorsCount <
                                                          step1Values?.boxSetQuantity &&
                                                      onChange({
                                                          ...flavors,
                                                          [id]: (flavors?.[id] ?? 0) + 1,
                                                      })
                                                  }
                                              >
                                                  <PlusIcon />
                                              </QuantityButton>
                                          </Grid>
                                      </FlavorOption>
                                  ))}
                    </FlavorsPickerWrapper>
                )}
            />

            <Grid container justify={'space-between'}>
                <BackButton variant={'outlined'} onClick={handleBack}>
                    {I18n.t('common.back')}
                </BackButton>

                <Button
                    classes={{ disabled: 'tc-disabled' }}
                    disabled={totalFlavorsCount !== step1Values?.boxSetQuantity}
                    type={'submit'}
                >
                    {I18n.t('common.next')}
                </Button>
            </Grid>
        </Grid>
    );

    const renderStep3 = () => (
        <>
            <OrderFormCustomerDetails />

            <Grid container justify={'space-between'}>
                <BackButton variant={'outlined'} onClick={handleBack}>
                    {I18n.t('common.back')}
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
            case 3:
                return renderStep3();
            default:
                return null;
        }
    };

    if (isErrorInBoxSets || isErrorInCupDesserts) {
        return <GeneralError />;
    }

    return (
        <>
            <FormProvider {...formMethods}>
                <Form onSubmit={handleSubmit(submitForm)}>
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
                </Form>
            </FormProvider>

            <OrderSentDialog isOpen={isOrderSentDialogOpen} isProcessing={isSubmitting}>
                {!isSubmitting && step2Values?.flavors?.[customFlavorId] > 0 && (
                    <CustomFlavorNotice>
                        <Translate value={'cupDesserts.customFlavorNotice'} />
                    </CustomFlavorNotice>
                )}
            </OrderSentDialog>
        </>
    );
}
