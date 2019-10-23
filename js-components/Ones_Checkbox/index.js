import React, { PureComponent } from 'react';
import { Checkbox } from 'antd';

export default class Ones_Checkbox extends PureComponent {

    render() {
        const { children, ...rest } = this.props;
        return (
            <Checkbox
                {...rest}
            >
                {children}
            </Checkbox>
        )
    }
}