import React from 'react';
import styled from 'styled-components';
import { getCommonColor, getPrimaryColor } from '../../utils/ThemeSelectors';
import { ReactComponent as LogoCupcakeSvg } from '../../public/logo-cupcake.svg';

const DividerLine = styled.div`
    content: '';
    position: relative;
    margin: 25px 0;
    width: 90%;
    height: 1px;
    background-image: linear-gradient(to right, transparent, ${getPrimaryColor()}, transparent);
`;

const Circle = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    position: absolute;
    bottom: 100%;
    margin-bottom: -25px;
    left: 50%;
    margin-left: -25px;
    border-radius: 100%;
    box-shadow: 0 1px 2px ${getPrimaryColor()};
    background: ${getCommonColor('white')};
`;

const Cupcake = styled(LogoCupcakeSvg)`
    fill: ${getPrimaryColor()};
    height: 35px;
`;

export default function ProductsDivider() {
    return (
        <DividerLine>
            <Circle>
                <Cupcake />
            </Circle>
        </DividerLine>
    );
}
