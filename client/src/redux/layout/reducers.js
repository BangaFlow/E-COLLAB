// @flow
import {
    CHANGE_LAYOUT,
    CHANGE_LAYOUT_WIDTH,
    CHANGE_SIDEBAR_THEME,
    CHANGE_SIDEBAR_TYPE,
} from './constants';

import * as layoutConstants from '../../constants/layout';

const INIT_STATE = {
    layoutType: layoutConstants.LAYOUT_VERTICAL,
    layoutWidth: layoutConstants.LAYOUT_WIDTH_FLUID,
    leftSideBarTheme: layoutConstants.LEFT_SIDEBAR_THEME_DEFAULT,
    leftSideBarType: layoutConstants.LEFT_SIDEBAR_TYPE_FIXED,
};


const Layout = (state = INIT_STATE, action) => {
    switch (action.type) {
        case CHANGE_LAYOUT:
            return {
                ...state,
                layoutType: action.payload,
            };
        case CHANGE_LAYOUT_WIDTH:
            return {
                ...state,
                layoutWidth: action.payload,
            };
        case CHANGE_SIDEBAR_THEME:
            return {
                ...state,
                leftSideBarTheme: action.payload,
            };
        case CHANGE_SIDEBAR_TYPE:
            return {
                ...state,
                leftSideBarType: action.payload,
            };
        default:
            return state;
    }
};

export default Layout;
