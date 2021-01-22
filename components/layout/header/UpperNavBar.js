import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Grid, Hidden, SvgIcon, Tab, Tabs, Typography, useScrollTrigger } from '@material-ui/core';
import UpperNavBarControls from './UpperNavBarControls';
import Logo from './Logo';
import {
    getBreakpointAndDown,
    getBreakpointAndUp,
    getCommonColor,
    getSecondaryColor,
} from '../../../utils/ThemeSelectors';
import navigationItems from './NavBarNavigationItems';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useI18n } from 'next-localization';

const LinkTabIcon = styled(SvgIcon)`
    &&& {
        margin-bottom: 0;
        transition: all 400ms ease;
    }
`;

const LinkTabLabel = styled(Typography).attrs({
    variant: 'h6',
})`
    transition: all 400ms ease;
    font-size: 1.4rem;
`;

const LinkTabA = forwardRef(({ url, ...otherProps }, ref) => (
    <Link href={url} passHref>
        <a ref={ref} {...otherProps} />
    </Link>
));

const LinkTab = styled(Tab).attrs(() => ({
    component: LinkTabA,
}))`
    :hover {
        ${LinkTabIcon}, ${LinkTabLabel} {
            color: ${getSecondaryColor()};
        }
    }
`;

const LogoWrapper = styled.a.attrs(() => ({
    'aria-label': 'homepage',
}))`
    height: 100%;
    display: flex;
    align-items: flex-start;
`;

const NavBar = styled(({ isShrinked, isBordered, ...otherProps }) => <header {...otherProps} />)`
    position: sticky;
    top: 0;
    z-index: 5;
    transition: all 400ms ease;
    background-color: ${getCommonColor('white')};
    overflow: hidden;
    box-shadow: ${({ isBordered }) => (isBordered ? `#ccc 0px 1px 2px` : '')};

    ${getBreakpointAndUp('lg')} {
        height: ${({ isShrinked }) => (isShrinked ? `4.5rem` : `5.5rem`)};
    }

    ${getBreakpointAndDown('md')} {
        height: ${({ isShrinked }) => (isShrinked ? `3.5rem` : `5.5rem`)};
    }

    ${getBreakpointAndDown('sm')} {
        height: ${({ isShrinked }) => (isShrinked ? `3.5rem` : `4rem`)};
    }

    ${LinkTabIcon} {
        width: ${({ isShrinked }) => (isShrinked ? '3rem' : '2.5rem')};
        height: ${({ isShrinked }) => (isShrinked ? '3rem' : '2.5rem')};
    }

    ${LinkTabLabel} {
        transform: translateY(${({ isShrinked }) => (isShrinked ? '100px' : '0px')});
        opacity: ${({ isShrinked }) => (isShrinked ? '0' : '1')};
    }

    :hover {
        ${getBreakpointAndUp('md')} {
            height: 5.5rem;
        }

        ${getBreakpointAndDown('sm')} {
            height: 4rem;
        }

        ${LinkTabIcon} {
            width: 2.5rem;
            height: 2.5rem;
        }

        ${LinkTabLabel} {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

const NavBarControlsWrapper = styled.div`
    height: 100%;
`;

const TabsWrapper = styled.div`
    height: 100%;
`;

const NavBarAdditionalControlsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export default function UpperNavBar() {
    const { t } = useI18n();

    const isScrolled = useScrollTrigger({ threshold: 0, disableHysteresis: true });

    const router = useRouter();
    const { pathname } = router;

    const tab = navigationItems.find(({ url }) => pathname.startsWith(url))?.url ?? false;

    return (
        <NavBar isShrinked={isScrolled} isBordered={isScrolled}>
            <Grid container component={NavBarControlsWrapper}>
                <Link key={'/'} href={'/'} passHref>
                    <Grid item xs component={LogoWrapper}>
                        <Logo alt={'logo'} />
                    </Grid>
                </Link>

                <Hidden mdDown>
                    <Grid item xs={6} component={TabsWrapper}>
                        <Tabs
                            value={tab}
                            onChange={(e, url) => router.push(url)}
                            indicatorColor={'primary'}
                            textColor={'primary'}
                            centered
                        >
                            {navigationItems.map(({ i18nKey, icon: Icon, url }, index) => (
                                <LinkTab
                                    key={url}
                                    label={<LinkTabLabel>{t(i18nKey)}</LinkTabLabel>}
                                    icon={
                                        <LinkTabIcon>
                                            <Icon />
                                        </LinkTabIcon>
                                    }
                                    url={url}
                                    value={url}
                                    aria-controls={`nav-tabpanel-${index}`}
                                />
                            ))}
                        </Tabs>
                    </Grid>
                </Hidden>

                <Grid item xs component={NavBarAdditionalControlsWrapper}>
                    <UpperNavBarControls />
                </Grid>
            </Grid>
        </NavBar>
    );
}
