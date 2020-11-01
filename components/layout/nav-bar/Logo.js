import React from 'react';
import styled from 'styled-components';
import CupcakeIcon from '../../../assets/logo-cupcake.svg';
import HebrewLogo from '../../../assets/logo-heb.svg';
import EnglishLogo from '../../../assets/logo-eng.svg';
import {
    getBreakpointAndDown,
    getBreakpointAndUp,
    getPrimaryColor,
    getSecondaryColor,
} from '../../../utils/ThemeSelectors';
import { useRouter } from 'next/router';

const Cupcake = styled(CupcakeIcon)`
    height: 70%;
    overflow: visible;
    fill: ${getPrimaryColor()};

    ${getBreakpointAndUp('lg')} {
        margin: 0 1rem;
    }

    ${getBreakpointAndDown('md')} {
        margin: 0 0.5rem;
    }

    ${getBreakpointAndDown('sm')} {
        margin: 0 0.5rem;
    }
`;

const LogoTitle = styled.svg`
    height: 70%;
    overflow: visible;

    .logo-tuti,
    .logo-subtitle,
    .logo-divider {
        fill: ${getPrimaryColor()};
    }

    .logo-cake {
        fill: ${getSecondaryColor()};
    }
`;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
`;

export default function Logo(props) {
    const { locale } = useRouter();

    return (
        <LogoWrapper {...props}>
            <Cupcake />
            <LogoTitle as={locale === 'he' ? HebrewLogo : EnglishLogo} />
        </LogoWrapper>
    );
}
