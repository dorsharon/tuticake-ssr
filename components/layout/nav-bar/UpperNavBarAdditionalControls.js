import React, { Fragment, useState } from 'react';
// import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css';
// import 'tippy.js/themes/light-border.css';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { GoGlobe as GlobeIcon } from 'react-icons/go';
import { FaWhatsapp as WhatsappIcon } from 'react-icons/fa';
import styled from 'styled-components';
import {
    getBreakpointAndDown,
    getBreakpointAndUp,
    getPrimaryColor,
    getSecondaryColor,
} from '../../../utils/ThemeSelectors';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectI18nLocale } from '../../redux/i18n/i18nSelectors';
// import { setLocale } from '../../redux/i18n/i18nActions';
// import { Translate } from 'react-redux-i18n';

const phoneNumber = '054-6629179';

const languages = [
    { locale: 'he', name: 'עברית' },
    { locale: 'en', name: 'English' },
];

const AdditionalControlWrapper = styled.div`
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

export default function UpperNavBarAdditionalControls() {
    const [visibleTooltip, setVisibleTooltip] = useState(null);

    const dispatch = useDispatch();

    const i18nLocale = useSelector(selectI18nLocale);

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
                <ListItemText
                    primary={<Translate value={'contactActions.sendWhatsappMessage'} />}
                />
            </ListItem>
            <ListItem button onClick={handlePhoneClick}>
                <ListItemText
                    primary={
                        <>
                            <Translate value={'contactActions.dial'} /> {phoneNumber}
                        </>
                    }
                />
            </ListItem>
        </List>
    );

    const handleLanguageChange = locale => {
        dispatch(setLocale(locale));
        setVisibleTooltip(null);
    };

    const renderLanguageMenu = () => (
        <List aria-label="language-options">
            {languages.map(({ locale, name }) => (
                <ListItem
                    selected={i18nLocale === locale}
                    disabled={i18nLocale === locale}
                    key={locale}
                    button
                    onClick={() => handleLanguageChange(locale)}
                >
                    <ListItemText primary={name} />
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

    const showTooltip = tooltipName => {
        setVisibleTooltip(visibleTooltip !== tooltipName ? tooltipName : null);
    };

    return controlList.map(({ name, tooltipContent, isTooltipVisible, icon }) => (
        <Fragment key={name}>
            <Tippy
                content={tooltipContent}
                theme={'light-border'}
                interactive
                appendTo={document.body}
                placement={'bottom'}
                arrow
                visible={isTooltipVisible}
                onHide={() => setVisibleTooltip(null)}
            >
                <AdditionalControlWrapper
                    aria-controls={name}
                    aria-haspopup={'true'}
                    onClick={() => showTooltip(name)}
                    selected={name === visibleTooltip}
                >
                    {icon}
                </AdditionalControlWrapper>
            </Tippy>
        </Fragment>
    ));
}
