import React from 'react';
import { TextField as MuiTextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { Controller, useFormContext } from 'react-hook-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DateTimePicker } from '@material-ui/pickers';
import { getBreakpointAndDown } from '../../utils/ThemeSelectors';
import styled from 'styled-components';
import { DevTool } from '@hookform/devtools';
import { useI18n } from 'next-localization';

const FormWrapper = styled.div`
    align-self: center;
    display: grid;
    grid-template-rows: repeat(${(props) => (props.$deliveryMode ? '4' : '3')}, 50px);
    grid-template-columns: repeat(2, 200px);
    column-gap: 35px;

    & .orderNotes {
        grid-column: 1 / span 2;
    }

    ${getBreakpointAndDown('xs')} {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 20px;
    }
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

const deliveryCitiesKeys = [
    'telAviv',
    'ramatGan',
    'givatayim',
    'rishonLezion',
    'holon',
    'petahTikva',
    'kiryatOno',
    'raanana',
    'orYehuda',
    'yahud',
];

export default function OrderFormCustomerDetails() {
    const { t } = useI18n();

    const { register, watch, control, errors } = useFormContext();

    const deliveryMethod = watch('deliveryMethod');

    const textFieldProps = (name) => ({
        className: name,
        name,
        label: t(`order.${name}`),
        inputRef: register({ required: t('form.required') }),
        fullWidth: true,
        error: !!errors?.[name],
        helperText: errors?.[name]?.message,
    });

    return (
        <FormWrapper $deliveryMode={deliveryMethod === 'delivery'}>
            <DevTool control={control} />
            <TextField {...textFieldProps('fullName')} />

            <Controller
                name={'phoneNumber'}
                defaultValue={''}
                rules={{
                    required: t('form.required'),
                    minLength: 10,
                }}
                render={({ onChange }) => (
                    <NumberFormat
                        {...textFieldProps('phoneNumber')}
                        customInput={TextField}
                        format="###-#######"
                        allowLeadingZeros
                        onValueChange={({ formattedValue }) => onChange(formattedValue)}
                    />
                )}
            />

            <Controller
                name={'deliveryMethod'}
                defaultValue={'pickup'}
                rules={{ required: t('form.required') }}
                render={({ onChange, onBlur }) => (
                    <Autocomplete
                        options={['pickup', 'delivery']}
                        getOptionLabel={(opt) =>
                            opt === 'pickup'
                                ? t('order.pickup')
                                : `${t('order.delivery')} ${t('order.deliveryExtraPayment')}`
                        }
                        onBlur={onBlur}
                        onChange={(e, value) => {
                            onChange(value);
                        }}
                        disableClearable
                        defaultValue={'pickup'}
                        renderInput={(params) => (
                            <TextField {...params} label={t('order.deliveryMethod')} />
                        )}
                    />
                )}
            />

            <Controller
                name={'deliveryDateTime'}
                defaultValue={null}
                rules={{ required: t('form.required') }}
                render={({ onChange, onBlur, value }) => (
                    <DateTimePicker
                        {...textFieldProps('deliveryDateTime')}
                        label={t(
                            deliveryMethod === 'pickup'
                                ? 'order.pickupDateTime'
                                : 'order.deliveryDateTime',
                        )}
                        value={value}
                        TextFieldComponent={TextField}
                        onBlur={onBlur}
                        onChange={onChange}
                        ampm={false}
                        disablePast
                        cancelLabel={t('common.cancel')}
                        okLabel={t('common.ok')}
                        format={'dd/MM/yyyy, hh:mm'}
                    />
                )}
            />

            {deliveryMethod === 'delivery' && (
                <>
                    <Controller
                        name={'deliveryCity'}
                        defaultValue={null}
                        rules={{ required: t('form.required') }}
                        render={({ onChange, onBlur }) => (
                            <Autocomplete
                                options={deliveryCitiesKeys}
                                getOptionLabel={(opt) => t(`deliveryCities.${opt}`)}
                                onBlur={onBlur}
                                onChange={(e, value) => {
                                    onChange(value);
                                }}
                                defaultValue={null}
                                renderInput={(params) => (
                                    <TextField {...textFieldProps('deliveryCity')} {...params} />
                                )}
                            />
                        )}
                    />

                    <TextField {...textFieldProps('deliveryAddress')} />
                </>
            )}

            <TextField {...textFieldProps('orderNotes')} inputRef={register} />
        </FormWrapper>
    );
}
