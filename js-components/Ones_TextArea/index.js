import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const { TextArea } = Input;
const style = { display: "inline-block", borderRadius: "4px", border: "1px solid #d9d9d9", width: "100%", minHeight: "50px" };
export default class Ones_Textarea extends PureComponent {
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
                <span style={style}>{rest.value}</span> :
                <TextArea {...rest} />
        );
    }
}
