// @flow
import {
    CHANGE_LAYOUT,
    CHANGE_LAYOUT_WIDTH,
    CHANGE_SIDEBAR_THEME,
    CHANGE_SIDEBAR_TYPE,
} from './constants';


export const changeLayout = (layout) => ({
    type: CHANGE_LAYOUT,
    payload: layout,
});

export const changeLayoutWidth = (width) => ({
    type: CHANGE_LAYOUT_WIDTH,
    payload: width,
});

export const changeSidebarTheme = (theme) => ({
    type: CHANGE_SIDEBAR_THEME,
    payload: theme,
});

export const changeSidebarType = (sidebarType) => ({
    type: CHANGE_SIDEBAR_TYPE,
    payload: sidebarType,
});

;
