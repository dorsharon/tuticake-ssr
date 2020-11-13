import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
import { FaSadTear } from 'react-icons/fa';
import { getBreakpointAndDown, getBreakpointAndUp } from '../utils/ThemeSelectors';
import { useI18n } from 'next-localization';

const ErrorWrapper = styled.div`
    text-align: center;

    ${getBreakpointAndUp('lg')} {
        width: 100%;
    }

    ${getBreakpointAndUp('md')} {
        width: 80%;
    }

    ${getBreakpointAndDown('sm')} {
        width: 70%;
    }
`;

export default function GeneralError() {
    const { t } = useI18n();

    return (
        <Grid
            container
            direction={'column'}
            alignItems={'center'}
            justify={'center'}
            component={ErrorWrapper}
        >
            <Grid item>
                <FaSadTear size={50} />
            </Grid>

            <Grid item>
                <Typography variant={'h5'}>{t('error.404')}</Typography>
            </Grid>
        </Grid>
    );
}
