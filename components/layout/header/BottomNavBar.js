import React from 'react';
import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    Hidden,
    SvgIcon,
} from '@material-ui/core';
import styled from 'styled-components';
import navigationItems from './NavBarNavigationItems';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';

const IconWrapper = styled(SvgIcon)`
    width: 2rem;
    height: 2rem;
`;

const BottomNavigationWrapper = styled(AppBar)`
    top: auto;
    bottom: 0;
`;

export default function BottomNavBar() {
    const router = useRouter();
    const { pathname } = router;

    const { t } = useI18n();

    const handleChange = (event, url) => {
        router.push(url);
    };

    return (
        <Hidden lgUp>
            <BottomNavigationWrapper position={'fixed'}>
                <BottomNavigation value={pathname} onChange={handleChange} showLabels>
                    {navigationItems.map(({ i18nKey, icon: Icon, url }) => (
                        <BottomNavigationAction
                            key={url}
                            label={t(i18nKey)}
                            icon={
                                <IconWrapper>
                                    <Icon />
                                </IconWrapper>
                            }
                            value={url}
                        />
                    ))}
                </BottomNavigation>
            </BottomNavigationWrapper>
        </Hidden>
    );
}
