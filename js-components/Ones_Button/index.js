import React, { PureComponent } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class Ones_Button extends PureComponent {

    static propTypes = {
        visible: PropTypes.bool,
        loading: PropTypes.bool
    };

    static defaultProps = {
        visible: true,
        loading: false
    };

    render() {
        const { visible, children, type, color, disabled, loading, ...rest } = this.props;
        return (
            <Button
                className={visible ? styles.show : styles.hide}
                type={type}
                disabled={disabled}
                loading={loading}
                {...rest}
            >
                {children}
            </Button>
        );
    }
}
