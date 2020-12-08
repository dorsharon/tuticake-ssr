import React from 'react';
import * as PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { getBackgroundColor, getPrimaryColor } from '../../utils/ThemeSelectors';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { IconButton } from '@material-ui/core';
import Image from 'next/image';

const Carousel = styled(ReactCarousel)`
    direction: initial;
    height: 100%;

    .control-dots {
        padding: 0;
    }

    .carousel,
    .slider-wrapper,
    .slider {
        height: 100%;
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

    &.prev-button {
        left: 0;
    }

    &.next-button {
        right: 0;
    }
`;

const ImageWrapper = styled.div`
    display: flex;
    background: ${getBackgroundColor()};
    padding: 10px;
    height: 100%;
`;

export default function ImageCarousel(props) {
    const { images, ...otherProps } = props;

    if (!images) {
        return null;
    }

    const hasMultipleImages = images.length > 1;

    return (
        <Carousel
            showArrows={hasMultipleImages}
            showIndicators={hasMultipleImages}
            showStatus={false}
            showThumbs={false}
            renderArrowPrev={(onClick, hasPrev) =>
                hasPrev && (
                    <ArrowButton className={'prev-button'} onClick={onClick}>
                        <PrevIcon />
                    </ArrowButton>
                )
            }
            renderArrowNext={(onClick, hasNext) =>
                hasNext && (
                    <ArrowButton className={'next-button'} onClick={onClick}>
                        <NextIcon />
                    </ArrowButton>
                )
            }
            {...otherProps}
        >
            {images.map((image) => (
                <ImageWrapper key={image}>
                    <Image src={image} alt={'product'} layout={'fill'} objectFit={'contain'} />
                </ImageWrapper>
            ))}
        </Carousel>
    );
}

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
