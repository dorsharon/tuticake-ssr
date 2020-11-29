import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
    getBackgroundColor,
    getBreakpointAndDown,
    getBreakpointAndUp,
    getCommonColor,
    getGradient,
} from '../../utils/ThemeSelectors';
import AnimatedLogoHeb from './AnimatedLogoHeb';
import AnimatedLogoEng from './AnimatedLogoEng';
import LogoCupcakeSvg from '../../public/logo-cupcake.svg';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Container } from '@material-ui/core';

const LandingPageWrapper = styled.div`
    display: grid;
    row-gap: 30px;

    ${getBreakpointAndUp('lg')} {
        grid-template-rows: 350px 1fr;
    }

    ${getBreakpointAndDown('sm')} {
        grid-template-rows: 250px 1fr;
    }

    ${getBreakpointAndDown('xs')} {
        grid-template-rows: 200px 1fr;
    }
`;

const HeaderSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-image: ${getGradient()};
`;

const LogoCupcake1 = styled(LogoCupcakeSvg)`
    position: absolute;
    fill: white;
    opacity: 0.5;
    transform: rotate(-15deg);

    ${getBreakpointAndUp('lg')} {
        height: 300px;
        top: 70px;
        left: 150px;
    }

    ${getBreakpointAndDown('md')} {
        height: 250px;
        top: 100px;
        left: 100px;
    }

    ${getBreakpointAndDown('sm')} {
        height: 220px;
        top: 110px;
        left: 80px;
    }

    ${getBreakpointAndDown('xs')} {
        height: 150px;
        top: 60px;
        left: 15px;
    }
`;

const LogoCupcake2 = styled(LogoCupcakeSvg)`
    position: absolute;
    fill: white;
    opacity: 0.5;
    transform: rotate(15deg);

    ${getBreakpointAndUp('lg')} {
        height: 200px;
        top: 10px;
        right: 250px;
    }

    ${getBreakpointAndDown('md')} {
        height: 200px;
        top: 10px;
        right: 140px;
    }

    ${getBreakpointAndDown('sm')} {
        height: 160px;
        top: 30px;
        right: 60px;
    }

    ${getBreakpointAndDown('xs')} {
        height: 100px;
        top: 40px;
        right: 20px;
    }
`;

const IntroductionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-self: center;

    & > *:not(:last-child) {
        margin-inline-end: 20px;
    }

    ${getBreakpointAndUp('lg')} {
        width: 70%;
    }

    ${getBreakpointAndDown('md')} {
        width: 85%;
        flex-direction: column;
    }

    ${getBreakpointAndDown('sm')} {
        width: 90%;
        flex-direction: column;
    }
`;

const Waves = styled.svg`
    position: relative;
    width: 100%;
    height: 15vh;
    margin-bottom: -7px; /*Fix for safari gap*/
    min-height: 100px;
    max-height: 150px;

    ${getBreakpointAndDown('sm')} {
        height: 50px;
        min-height: 50px;
    }
`;

const ParallaxAnimation = keyframes`
    0% {
        transform: translate3d(-90px, 0, 0);
    }
    100% {
        transform: translate3d(85px, 0, 0);
    }
`;

const Parallax = styled.g`
    & > use {
        animation: ${ParallaxAnimation} 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
    }

    & > use:nth-child(1) {
        animation-delay: -2s;
        animation-duration: 7s;
    }

    & > use:nth-child(2) {
        animation-delay: -3s;
        animation-duration: 10s;
    }

    & > use:nth-child(3) {
        animation-delay: -4s;
        animation-duration: 13s;
    }

    & > use:nth-child(4) {
        animation-delay: -5s;
        animation-duration: 20s;
    }
`;

const ProfileImage = styled(Image)`
    border: 10px solid ${getCommonColor('white')};
    filter: drop-shadow(2px 4px 6px black);
`;

export default function LandingPage() {
    const { locale } = useRouter();

    const AnimatedLogo = locale === 'he' ? AnimatedLogoHeb : AnimatedLogoEng;

    return (
        <LandingPageWrapper>
            <HeaderSection>
                <AnimatedLogo />

                <LogoCupcake1 />
                <LogoCupcake2 />

                <Waves viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path
                            id="gentle-wave"
                            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                        />
                    </defs>

                    <Parallax>
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                    </Parallax>
                </Waves>
            </HeaderSection>

            <IntroductionWrapper>
                <ProfileImage alt={'profile'} src={'/profile.jpeg'} height={220.5} width={160} />

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                </p>
            </IntroductionWrapper>
        </LandingPageWrapper>
    );
}
