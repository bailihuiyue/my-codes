import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

export default class Ones_DatePicker extends PureComponent {
    static propTypes = {
        rangePicker: PropTypes.bool
    };

    static defaultProps = {
        rangePicker: false
    };

    render() {
        const { rangePicker, ...rest } = this.props;
        return rangePicker ?
            <RangePicker {...rest} /> :
            <DatePicker {...rest} />;
    }
}