import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
    getBreakpointAndDown,
    getBreakpointAndUp,
    getCommonColor,
    getGradient,
} from '../../utils/ThemeSelectors';
import LogoCupcakeSvg from '../../public/logo-cupcake.svg';
import { useRouter } from 'next/router';
import Image from 'next/image';
import LogoHebSvg from '../../public/logo-heb.svg';
import LogoEngSvg from '../../public/logo-eng.svg';
import Grid from '@material-ui/core/Grid';

const LandingPageWrapper = styled.div`
    display: grid;
    row-gap: 30px;
    margin-block-end: 40px;

    ${getBreakpointAndUp('md')} {
        grid-template-rows: 350px 1fr;
    }

    ${getBreakpointAndDown('sm')} {
        grid-template-rows: 250px 1fr;
    }

    ${getBreakpointAndDown('xs')} {
        grid-template-rows: 200px 1fr;
    }
`;

const logoCommonStyles = css`
    ${getBreakpointAndUp('md')} {
        height: 140px;
    }

    ${getBreakpointAndDown('sm')} {
        height: 120px;
    }

    ${getBreakpointAndDown('xs')} {
        height: 90px;
    }

    fill: ${getCommonColor('white')};
    margin-block-start: 30px;
`;

const LogoHeb = styled(LogoHebSvg)`
    ${logoCommonStyles}
`;

const LogoEng = styled(LogoEngSvg)`
    ${logoCommonStyles}
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
        top: 100px;
        left: 150px;
    }

    ${getBreakpointAndDown('md')} {
        height: 250px;
        top: 150px;
        left: 80px;
    }

    ${getBreakpointAndDown('sm')} {
        height: 220px;
        top: 80px;
        left: 50px;
    }

    ${getBreakpointAndDown('xs')} {
        height: 150px;
        top: 100px;
        left: 20px;
    }
`;

const LogoCupcake2 = styled(LogoCupcakeSvg)`
    position: absolute;
    fill: white;
    opacity: 0.5;
    transform: rotate(15deg);

    ${getBreakpointAndUp('lg')} {
        height: 200px;
        top: 80px;
        right: 250px;
    }

    ${getBreakpointAndDown('md')} {
        height: 180px;
        top: 80px;
        right: 80px;
    }

    ${getBreakpointAndDown('sm')} {
        height: 160px;
        top: 50px;
        right: 60px;
    }

    ${getBreakpointAndDown('xs')} {
        height: 100px;
        top: 50px;
        right: 15px;
    }
`;

const IntroductionWrapper = styled.div`
    //display: flex;
    align-self: flex-start;
    justify-self: center;
    align-items: center;

    ${getBreakpointAndUp('lg')} {
        //flex-direction: row;
        width: 70%;
        //grid-template-columns: 240px 1fr;
        //grid-template-rows: 295px;
        //column-gap: 40px;
    }

    ${getBreakpointAndDown('md')} {
        width: 85%;
        place-items: center;
    }

    ${getBreakpointAndDown('sm')} {
        width: 90%;
        place-items: center;
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

const ProfileImageWrapper = styled.div`
    display: flex;
    justify-content: center;

    & > div {
        border: 10px solid ${getCommonColor('white')};
        filter: drop-shadow(2px 4px 6px black);
        box-sizing: border-box;
    }
`;

export default function LandingPage() {
    const { locale } = useRouter();

    const Logo = locale === 'he' ? LogoHeb : LogoEng;

    return (
        <LandingPageWrapper>
            <HeaderSection>
                <Logo />

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

            <Grid container component={IntroductionWrapper} spacing={4}>
                <Grid item xs={12} sm={3}>
                    <ProfileImageWrapper>
                        <Image
                            alt={'profile'}
                            src={'website-assets/profile/profile.webp'}
                            height={352}
                            width={256}
                            objectFit={'contain'}
                        />
                    </ProfileImageWrapper>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    </p>
                </Grid>
            </Grid>
        </LandingPageWrapper>
    );
}
