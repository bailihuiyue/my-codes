import React, { PureComponent } from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

export default class Ones_RadioGroup extends PureComponent {

    render() {
        const { useSpan, options, selectedId, ...rest } = this.props;
        return (
            useSpan ?
                options.map(({ label, value }) => value === selectedId ? label : "") :
                <RadioGroup options={options} {...rest} />
        );
    }
}