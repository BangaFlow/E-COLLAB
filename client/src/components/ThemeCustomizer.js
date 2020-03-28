import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    changeLayout,
    changeLayoutWidth,
    changeSidebarTheme,
    changeSidebarType,
} from '../redux/actions';

import * as layoutConstants from '../constants/layout';


class ThemeCustomizer extends Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.changeLayout = this.changeLayout.bind(this);
        this.changeWidthMode = this.changeWidthMode.bind(this);
        this.changeTheme = this.changeTheme.bind(this);
        this.changeLeftSiderbarType = this.changeLeftSiderbarType.bind(this);

        this.state = {
            isHorizontalLayout: false,
            isBoxed: false,
            isSidebarScrollable: false,
            isCondensed: false,
            isLight: false,
            isDark: false,
        };
    }

    /**
     *  component did mount hook
     */
    componentDidMount = () => {
        this._loadStateFromProps();
    };

    /**
     * component did update hook
     */
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps !== this.props) {
            this._loadStateFromProps();
        }
    };


    /**
     * change state based on props changes
     */
    _loadStateFromProps() {
        this.setState({
            isHorizontalLayout: this.props.layoutType === layoutConstants.LAYOUT_HORIZONTAL,
            isBoxed: this.props.layoutWidth === layoutConstants.LAYOUT_WIDTH_BOXED,
            isSidebarScrollable: this.props.leftSideBarType === layoutConstants.LEFT_SIDEBAR_TYPE_SCROLLABLE,
            isCondensed: this.props.leftSideBarType === layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED,
            isDark: this.props.leftSideBarTheme === layoutConstants.LEFT_SIDEBAR_THEME_DARK,
        });
    }

    /**
     * On layout change
     */
    changeLayout = e => {
        var layout = e.currentTarget.value;
        switch (layout) {
            case 'horizontal':
                this.setState({
                    isHorizontalLayout: !this.state.isHorizontalLayout,
                    isCondensed: false,
                    isDetachedLayout: false,
                });
                this.props.changeLayout(layoutConstants.LAYOUT_HORIZONTAL);
                break;
            default:
                this.setState({
                    isHorizontalLayout: false,
                    isCondensed: false,
                    isDetachedLayout: false,
                });
                this.props.changeLayout(layoutConstants.LAYOUT_VERTICAL);
                break;
        }
    };

    /**
     * Change the width mode
     */
    changeWidthMode = e => {
        var mode = e.currentTarget.value;
        switch (mode) {
            case 'boxed':
                this.setState({ isBoxed: true });
                this.props.changeLayoutWidth(layoutConstants.LAYOUT_WIDTH_BOXED);
                break;
            default:
                this.setState({ isBoxed: false });
                this.props.changeLayoutWidth(layoutConstants.LAYOUT_WIDTH_FLUID);
                break;
        }
    };

    /**
     * Changes the theme
     */
    changeTheme = e => {
        var theme = e.currentTarget.value;
        switch (theme) {
            case 'dark':
                this.setState({ isLight: false, isDark: true });
                this.props.changeSidebarTheme(layoutConstants.LEFT_SIDEBAR_THEME_DARK);
                break;
            default:
                this.setState({ isLight: true, isDark: false });
                this.props.changeSidebarTheme(layoutConstants.LEFT_SIDEBAR_THEME_DEFAULT);
                break;
        }
    };

    /**
     * Change the type
     */
    changeLeftSiderbarType = e => {
        var type = e.currentTarget.value;
        switch (type) {
            case 'condensed':
                this.setState({ isCondensed: true, isSidebarScrollable: false, isLight: false, isDark: false });
                this.props.changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED);
                break;
            case 'scrollable':
                this.setState({ isCondensed: false, isSidebarScrollable: true });
                this.props.changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_SCROLLABLE);
                break;
            default:
                this.setState({ isCondensed: false, isSidebarScrollable: false });
                this.props.changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_FIXED);
                break;
        }
    };

    render() {
        return (
            <div>tets</div>
         );
    }
}

const mapStateToProps = state => {
    return {
        layoutType: state.Layout.layoutType,
        layoutWidth: state.Layout.layoutWidth,
        leftSideBarTheme: state.Layout.leftSideBarTheme,
        leftSideBarType: state.Layout.leftSideBarType,
    };
};
export default connect(
    mapStateToProps,
    { changeLayout, changeLayoutWidth, changeSidebarType, changeSidebarTheme }
)(ThemeCustomizer);
