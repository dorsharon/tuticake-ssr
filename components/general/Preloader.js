import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as CupcakeSvg } from '../../public/logo-cupcake.svg';
import { getSecondaryColor } from '../../utils/ThemeSelectors';

const bounceAnimation = keyframes`
    0% {
        transform: scale(1, 1) translateY(0);
    }
    10% {
        transform: scale(1.1, 0.9) translateY(0);
    }
    30% {
        transform: scale(0.9, 1.1) translateY(-50px);
    }
    50% {
        transform: scale(1.05, 0.95) translateY(0);
    }
    57% {
        transform: scale(1, 1) translateY(-7px);
    }
    64% {
        transform: scale(1, 1) translateY(0);
    }
    100% {
        transform: scale(1, 1) translateY(0);
    }
`;

const Cupcake = styled(CupcakeSvg)`
    animation: ${bounceAnimation} 2s infinite;
    animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
    fill: ${getSecondaryColor()};
    height: 5rem;
`;

const PreloaderWrapper = styled.div`
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;
`;

export default function Preloader(props) {
    return (
        <PreloaderWrapper>
            <Cupcake />
        </PreloaderWrapper>
    );
}
