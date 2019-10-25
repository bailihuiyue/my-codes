import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

export default class Ones_Input extends PureComponent {
    static propTypes = {
        useSpan: PropTypes.bool,
    };

    static defaultProps = {
        useSpan: false,
    };

    render() {
        const { useSpan, ...rest } = this.props;
        return (
            useSpan ?
                <span>{rest.value}</span> :
                <Input {...rest} />
        );
    }
}
