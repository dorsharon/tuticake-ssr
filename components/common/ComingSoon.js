import React from 'react';
import styled from 'styled-components';
import { IoIosConstruct } from 'react-icons/io';
import { Grid, Typography } from '@material-ui/core';
import { getBreakpointAndDown, getPrimaryColor } from '../../utils/ThemeSelectors';
import { useI18n } from 'next-localization';

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
    const { t } = useI18n();

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
                <Message>{t('comingSoon.construction')}</Message>
                <Message>{t('comingSoon.socialMedia')}</Message>
                <Message>{t('comingSoon.whenItComes')}</Message>
            </Grid>
        </Grid>
    );
}
