import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import {
    getBackgroundColor,
    getBreakpointAndDown,
    getBreakpointAndUp,
    getGradient,
} from '../../utils/ThemeSelectors';
import AnimatedLogoHeb from './AnimatedLogoHeb';
import AnimatedLogoEng from './AnimatedLogoEng';
import { ReactComponent as LogoCupcakeSvg } from '../../public/logo-cupcake.svg';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { selectI18nLocale } from '../../redux/i18n/i18nSelectors';
import { useQuery, useQueryCache } from 'react-query';
import { CAKES, CUP_DESSERTS_BOX_SETS, PROFILE_IMAGE } from '../../utils/query';
import Skeleton from '@material-ui/lab/Skeleton';

const HeaderSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-image: ${getGradient()};

    ${getBreakpointAndUp('sm')} {
        min-height: 400px;
    }

    ${getBreakpointAndDown('xs')} {
        min-height: 250px;
    }
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

const LandingPageWrapper = styled.div`
    position: relative;
    min-height: 600px;
    width: 100%;
`;

const SectionDivider = styled.div`
    width: 100%;
    overflow: hidden;

    svg {
        position: relative;
        display: block;
        width: calc(100% + 1.3px);
        transform: rotateY(180deg);

        ${getBreakpointAndUp('sm')} {
            height: 180px;
        }

        ${getBreakpointAndDown('xs')} {
            height: 100px;
        }
    }

    path {
        fill: ${getBackgroundColor()};
    }

    ${getBreakpointAndUp('lg')} {
        bottom: 30%;
    }

    ${getBreakpointAndDown('md')} {
        bottom: 45%;
    }

    ${getBreakpointAndDown('sm')} {
        bottom: 55%;
    }
`;

const ProfileAndIntroductionWrapper = styled.div`
    position: absolute;

    ${getBreakpointAndUp('sm')} {
        top: 200px;
    }

    ${getBreakpointAndDown('xs')} {
        top: 140px;
    }
`;

const ProfileImageCard = styled(Card)``;

const ProfileImageCardContent = styled(CardContent)`
    && {
        padding: 10px;
    }
`;

const ProfileImage = styled.img.attrs(() => ({
    alt: 'profile',
}))`
    ${getBreakpointAndUp('sm')} {
        height: 250px;
    }

    ${getBreakpointAndDown('xs')} {
        height: 200px;
    }
`;

const ProfileImageSkeleton = styled(Skeleton).attrs(() => ({
    variant: 'rect',
}))`
    ${getBreakpointAndUp('sm')} {
        height: 250px;
        width: 180px;
    }

    ${getBreakpointAndDown('xs')} {
        height: 200px;
        width: 145px;
    }
`;

export default function LandingPage() {
    const locale = useSelector(selectI18nLocale);

    const AnimatedLogo = locale === 'he' ? AnimatedLogoHeb : AnimatedLogoEng;

    const { data: profileImageUrl, isLoading } = useQuery(PROFILE_IMAGE);

    const cache = useQueryCache();

    console.log('profileImageUrl:', profileImageUrl);

    const prefetchData = useCallback(async () => {
        await Promise.all([cache.prefetchQuery(CAKES), cache.prefetchQuery(CUP_DESSERTS_BOX_SETS)]);
    }, [cache]);

    useEffect(() => {
        prefetchData();
    }, [prefetchData]);

    return (
        <LandingPageWrapper>
            <HeaderSection>
                <AnimatedLogo />

                <LogoCupcake1 />
                <LogoCupcake2 />

                <SectionDivider>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" />
                    </svg>
                </SectionDivider>
            </HeaderSection>

            <Grid
                container
                direction={'column'}
                alignItems={'center'}
                component={ProfileAndIntroductionWrapper}
            >
                <Grid item>
                    <ProfileImageCard>
                        <ProfileImageCardContent>
                            {!profileImageUrl || isLoading ? (
                                <ProfileImageSkeleton />
                            ) : (
                                <ProfileImage src={profileImageUrl} />
                            )}
                        </ProfileImageCardContent>
                    </ProfileImageCard>
                </Grid>

                <Grid item xs={9}>
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
