export const getPrimaryColor = () => props => props.theme.palette.primary.main;
export const getSecondaryColor = () => props => props.theme.palette.secondary.main;

export const getCommonColor = colorName => props => props.theme.palette.common[colorName];

export const getBreakpointAndDown = breakpoint => props => props.theme.breakpoints.down(breakpoint);
export const getBreakpointAndUp = breakpoint => props => props.theme.breakpoints.up(breakpoint);

export const getFontFamily = () => props => props.theme.typography.fontFamily;

export const getBackgroundColor = () => props => props.theme.palette.background.default;

export const getGradient = () => props =>
    `linear-gradient(135deg, ${props.theme.palette.primary.main}, ${props.theme.palette.secondary.main})`;