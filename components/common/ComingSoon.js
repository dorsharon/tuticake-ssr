import React from 'react';
import styled from 'styled-components';
import { IoIosConstruct } from 'react-icons/io';
import { Grid, Typography } from '@material-ui/core';
import { I18n } from 'react-redux-i18n';
import { getBreakpointAndDown, getPrimaryColor } from '../../utils/ThemeSelectors';

const ComingSoonWrapper = styled.div`
    ${getBreakpointAndDown('sm')} {
        max-width: 90%;
    }
`;

const ConstructionIcon = styled(IoIosConstruct)`
    height: 5rem;
    width: 5rem;
    fill: ${getPrimaryColor()};
`;

const Message = styled(Typography).attrs(() => ({
    variant: 'h4',
    align: 'center',
}))`
    color: ${getPrimaryColor()};
`;

export default function ComingSoon() {
    return (
        <Grid
            component={ComingSoonWrapper}
            container
            direction={'column'}
            alignItems={'center'}
            justify={'center'}
        >
            <Grid item>
                <ConstructionIcon />
            </Grid>

            <Grid item>
                <Message>{I18n.t('comingSoon.construction')}</Message>
                <Message>{I18n.t('comingSoon.socialMedia')}</Message>
                <Message>{I18n.t('comingSoon.whenItComes')}</Message>
            </Grid>
        </Grid>
    );
}
