import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { FaFacebook as FacebookIcon, FaInstagram as InstagramIcon } from 'react-icons/fa';
import {
    getBreakpointAndDown,
    getCommonColor,
    getFontFamily,
    getGradient,
} from '../../../utils/ThemeSelectors';
// import { Translate } from 'react-redux-i18n';

const FooterWrapper = styled.footer`
    display: flex;
    flex-direction: column;
    font-family: ${getFontFamily()};
    color: ${getCommonColor('white')};
    background: ${getGradient()};

    ${getBreakpointAndDown('md')} {
        margin-block-end: 3.3rem;
    }
`;

const SocialMediaSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20rem;
    height: 3rem;

    ${getBreakpointAndDown('md')} {
        padding: 0 10rem;
    }

    ${getBreakpointAndDown('sm')} {
        padding: 0 5rem;
    }

    ${getBreakpointAndDown('xs')} {
        padding: 0 1rem;
    }
`;

const socialNetworkIcons = [
    { icon: <FacebookIcon />, url: 'https://www.facebook.com/Tutiscake-100395921353017/' },
    { icon: <InstagramIcon />, url: 'https://www.instagram.com/tuti_cake/' },
];

export default function Footer() {
    return (
        <FooterWrapper>
            <SocialMediaSection>
                <Translate value={'footer.followUs'} />

                <div>
                    {socialNetworkIcons.map(({ icon, url }) => (
                        <IconButton
                            key={url}
                            component={'a'}
                            color={'inherit'}
                            href={url}
                            target={'_blank'}
                        >
                            {icon}
                        </IconButton>
                    ))}
                </div>
            </SocialMediaSection>
        </FooterWrapper>
    );
}
