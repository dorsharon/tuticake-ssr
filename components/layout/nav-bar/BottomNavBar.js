import React from 'react';
import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    Hidden,
    SvgIcon,
} from '@material-ui/core';
// import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import navigationItems from './NavBarNavigationItems';
// import { Translate } from 'react-redux-i18n';

const IconWrapper = styled(SvgIcon)`
    width: 2rem;
    height: 2rem;
`;

const BottomNavigationWrapper = styled(AppBar)`
    top: auto;
    bottom: 0;
`;

export default function BottomNavBar() {
    const location = useLocation();
    const history = useHistory();

    const handleChange = (event, url) => {
        history.push(url);
    };

    return (
        <Hidden lgUp>
            <BottomNavigationWrapper position={'fixed'}>
                <BottomNavigation value={location.pathname} onChange={handleChange} showLabels>
                    {navigationItems.map(({ i18nKey, icon: Icon, url }) => (
                        <BottomNavigationAction
                            key={url}
                            label={<Translate value={`pageNames.${i18nKey}`} />}
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
