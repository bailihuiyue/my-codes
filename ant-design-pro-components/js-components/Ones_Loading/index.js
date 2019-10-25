import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';


export default class Ones_Loading extends PureComponent {
    static propTypes = {
        show: PropTypes.bool,
        size: PropTypes.string
    };

    static defaultProps = {
        show: false,
        size: "large"
    };

    render() {
        const { show, children, ...rest } = this.props;
        return (
            <Spin spinning={show} {...rest}>
                {children}
            </Spin>
        )
    }
}