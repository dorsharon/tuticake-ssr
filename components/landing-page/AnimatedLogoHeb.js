import React from 'react';
import styled, { keyframes } from 'styled-components';
import Logo from '../../public/logo-heb.svg';
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

const PunctuationAnimation = keyframes`
    0% { opacity: 0;; fill: transparent; }
    70% { opacity: 1;  fill: transparent; }
    100% { opacity: 1;  fill: white; }
`;

const DividerAnimation = keyframes`
    from {
        opacity: 1;
        stroke-dasharray: 0 253px;
        stroke-dashoffset: -83;
    }
    
    to {
        opacity: 1;
        stroke-dasharray: 157px 253px;
        stroke-dashoffset: 0;
    }
`;

const SubtitleAnimation = keyframes`
    0% { 
        clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
        transform: matrix(0.487453, 0, 0, 0.487453, 300.477173, 71.754044) translateY(-31px);
    }
    
   70% {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); 
    }
    
    100% {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); 
        transform: matrix(0.487453, 0, 0, 0.487453, 300.477173, 71.754044) translateY(0);
    }
`;

const AnimatedLogo = styled(Logo)`
    ${getBreakpointAndUp('md')} {
        height: 140px;
    }

    ${getBreakpointAndDown('sm')} {
        height: 140px;
    }

    ${getBreakpointAndDown('xs')} {
        height: 90px;
    }

    margin-block-start: 30px;

    .logo-cake,
    .logo-tuti {
        fill: transparent;
        stroke-dasharray: 0;
        stroke-width: 1px;
        stroke: ${getCommonColor('white')};
        animation: ${LetterAnimation} 3s forwards;

        &.punctuation {
            stroke-width: 1px;
            opacity: 0;
            animation: ${PunctuationAnimation} 2s 1s linear forwards;
        }
    }

    .logo-divider {
        fill: transparent;
        opacity: 0;
        stroke: ${getCommonColor('white')};
        stroke-width: 2px;
        stroke-linecap: round;
        animation: ${DividerAnimation} 500ms 2.5s linear forwards;
    }

    .logo-subtitle-group {
        clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
        animation: ${SubtitleAnimation} 1s 3s forwards;
        fill: ${getCommonColor('white')};
    }
`;

export default function AnimatedLogoHeb() {
    return <AnimatedLogo />;
}
