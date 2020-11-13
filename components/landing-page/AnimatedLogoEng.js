import React from 'react';
import styled, { keyframes } from 'styled-components';
import Logo from '../../public/logo-eng.svg';
import {
    getBreakpointAndDown,
    getBreakpointAndUp,
    getCommonColor,
} from '../../utils/ThemeSelectors';

const LetterAnimation = keyframes`
    0% { stroke-dasharray: 0; fill: transparent; }
    70% {  stroke-dasharray: 230px; fill: transparent; }
    100% { stroke-dasharray: 230px; fill: white; }
`;

const DividerAnimation = keyframes`
    from {
        opacity: 1;
        stroke-dasharray: 0 523px;
        stroke-dashoffset: -155px;
    }
    
    to {
        opacity: 1;
        stroke-dasharray: 318px 523px;
        stroke-dashoffset: 0;
    }
`;

const SubtitleAnimation = keyframes`
    0% { 
        clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
        transform: matrix(1, 0, 0, 1, 333.103978, 255.655109) translateY(-38px);
    }
    
   50% {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); 
    }
    
    100% {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); 
        transform: matrix(1, 0, 0, 1, 333.103978, 255.655109) translateY(0);
    }
`;

export default styled(Logo)`
    margin-block-start: 30px;

    ${getBreakpointAndUp('md')} {
        height: 140px;
    }

    ${getBreakpointAndDown('sm')} {
        height: 140px;
    }

    ${getBreakpointAndDown('xs')} {
        height: 90px;
    }

    .logo-eng_svg__logo-cake,
    .logo-eng_svg__logo-tuti {
        fill: transparent;
        stroke-dasharray: 0;
        stroke-width: 1px;
        stroke: ${getCommonColor('white')};
        animation: ${LetterAnimation} 3s forwards;
    }

    .logo-eng_svg__logo-divider {
        fill: transparent;
        opacity: 0;
        stroke: ${getCommonColor('white')};
        stroke-width: 4px;
        stroke-linecap: round;
        animation: ${DividerAnimation} 500ms 2.5s linear forwards;
    }

    .logo-eng_svg__logo-subtitle-group {
        clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
        animation: ${SubtitleAnimation} 1s 3s forwards;
        fill: ${getCommonColor('white')};
    }
`;

// export default function AnimatedLogoHeb() {
//     return <AnimatedLogo />;
// }
