import React from 'react';
import * as PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { getBackgroundColor, getPrimaryColor } from '../../utils/ThemeSelectors';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { IconButton } from '@material-ui/core';

const Carousel = styled(ReactCarousel)`
    direction: initial;

    .control-dots {
        padding: 0;
    }
`;

const iconStyles = css`
    fill: ${getPrimaryColor()};
    width: 25px;
    height: 25px;
`;

const PrevIcon = styled(MdKeyboardArrowLeft)`
    ${iconStyles}
`;

const NextIcon = styled(MdKeyboardArrowRight)`
    ${iconStyles}
`;

const ArrowButton = styled(IconButton)`
    border-radius: 30px;
    padding: 5px;
    display: flex;
    border: none;
    background-color: transparent;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;

    :first-child {
        left: 0;
    }

    :nth-child(2) {
        right: 0;
    }
`;

const ImageWrapper = styled.div`
    display: flex;
    background: ${getBackgroundColor()};
    padding: 10px;
    max-height: ${props => props.maxHeight}px;
    height: 100%;
`;

const Image = styled.img`
    object-fit: contain;
    filter: drop-shadow(3px 3px 2px);
`;

export default function ImageCarousel(props) {
    const { images, maxHeight, ...otherProps } = props;

    const hasMultipleImages = images.length > 1;

    return (
        <Carousel
            showArrows={hasMultipleImages}
            showIndicators={hasMultipleImages}
            showStatus={false}
            showThumbs={false}
            renderArrowPrev={(onClick, hasPrev) =>
                hasPrev && (
                    <ArrowButton onClick={onClick}>
                        <PrevIcon />
                    </ArrowButton>
                )
            }
            renderArrowNext={(onClick, hasNext) =>
                hasNext && (
                    <ArrowButton onClick={onClick}>
                        <NextIcon />
                    </ArrowButton>
                )
            }
            {...otherProps}
        >
            {images.map(image => (
                <ImageWrapper key={image} maxHeight={maxHeight}>
                    <Image src={image} alt={'product'} />
                </ImageWrapper>
            ))}
        </Carousel>
    );
}

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    maxHeight: PropTypes.number.isRequired,
};
