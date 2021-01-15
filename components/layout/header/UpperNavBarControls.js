import React, { useState } from 'react';
import { List, ListItem, ListItemText, Tooltip as MuiTooltip } from '@material-ui/core';
import { FaWhatsapp } from 'react-icons/fa';
import { VscGlobe } from 'react-icons/vsc';
import styled, { css } from 'styled-components';
import {
    getBreakpointAndDown,
    getBreakpointAndUp,
    getCommonColor,
    getPrimaryColor,
    getSecondaryColor,
} from '../../../utils/ThemeSelectors';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';
import Link from 'next/link';

const phoneNumber = '054-6629179';

const languages = [
    { locale: 'he', name: 'עברית' },
    { locale: 'en', name: 'English' },
];

const commonIconStyles = css`
    fill: ${getCommonColor('black')};
`;

const WhatsappIcon = styled(FaWhatsapp)`
    ${commonIconStyles}
`;

const GlobeIcon = styled(VscGlobe)`
    ${commonIconStyles}
`;

const Tooltip = styled(MuiTooltip)`
    background-color: ${getCommonColor('white')};
    color: rgba(0, 0, 0, 0.87);
    font-size: 11px;
    &.tc-tooltip {
        background-color: ${getCommonColor('white')};
        color: rgba(0, 0, 0, 0.87);
        font-size: 11px;
    }
`;

const ControlWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    cursor: pointer;

    svg {
        transition: all 400ms ease;
        fill: ${({ selected, theme }) => (selected ? getPrimaryColor()({ theme }) : '')};
    }
    :hover svg {
        fill: ${getSecondaryColor()};
    }

    ${getBreakpointAndUp('md')} {
        padding: 0 1rem;

        svg {
            width: 2.5rem;
            height: 2.5rem;
        }
    }

    ${getBreakpointAndDown('sm')} {
        padding: 0 0.6rem;

        svg {
            width: 2rem;
            height: 2rem;
        }
    }
`;

export default function UpperNavBarControls() {
    const [visibleTooltip, setVisibleTooltip] = useState(null);

    const router = useRouter();
    const { locale: currentLocale, asPath } = router;

    const { t } = useI18n();

    const handleWhatsappClick = () => {
        window.open(
            `https://api.whatsapp.com/send?phone=+972${phoneNumber.replace(
                '-',
                '',
            )}&text=%20היי שלום`,
        );
    };

    const handlePhoneClick = () => {
        window.open(`tel:${phoneNumber.replace('-', '')}`);
    };

    const renderContactMenu = () => (
        <List aria-label="contact-options">
            <ListItem button onClick={handleWhatsappClick}>
                <ListItemText primary={t('contactActions.sendWhatsappMessage')} />
            </ListItem>
            <ListItem button onClick={handlePhoneClick}>
                <ListItemText primary={`${t('contactActions.dial')} ${phoneNumber}`} />
            </ListItem>
        </List>
    );

    const renderLanguageMenu = () => (
        <List aria-label="language-options">
            {languages.map(({ locale, name }) => (
                <ListItem
                    selected={currentLocale === locale}
                    disabled={currentLocale === locale}
                    key={locale}
                    button
                >
                    <Link href={asPath} locale={locale}>
                        <ListItemText primary={name} />
                    </Link>
                </ListItem>
            ))}
        </List>
    );

    const controlList = [
        {
            name: 'language-menu',
            tooltipContent: renderLanguageMenu(),
            isTooltipVisible: visibleTooltip === 'language-menu',
            icon: <GlobeIcon />,
        },
        {
            name: 'contact-us',
            tooltipContent: renderContactMenu(),
            isTooltipVisible: visibleTooltip === 'contact-us',
            icon: <WhatsappIcon />,
        },
    ];

    const showTooltip = (tooltipName) => {
        setVisibleTooltip(visibleTooltip !== tooltipName ? tooltipName : null);
    };

    return controlList.map(({ name, tooltipContent, isTooltipVisible, icon }) => (
        <Tooltip
            key={name}
            classes={{ tooltip: 'tc-tooltip' }}
            title={tooltipContent}
            arrow
            placement={'bottom'}
            open={isTooltipVisible}
            onClose={() => setVisibleTooltip(null)}
            interactive
        >
            <ControlWrapper
                aria-controls={name}
                aria-haspopup={'true'}
                onClick={() => showTooltip(name)}
                selected={name === visibleTooltip}
            >
                {icon}
            </ControlWrapper>
        </Tooltip>
    ));
}
