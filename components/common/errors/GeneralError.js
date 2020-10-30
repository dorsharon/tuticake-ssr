import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
import { FaSadTear } from 'react-icons/fa';
import { Translate } from 'react-redux-i18n';
import { getBreakpointAndDown, getBreakpointAndUp } from '../../../utils/ThemeSelectors';

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
                <Typography variant={'h5'}>
                    <Translate value={'error.generalErrorMessage'} />
                </Typography>
            </Grid>
        </Grid>
    );
}
