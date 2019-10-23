import React from 'react';
import { Button } from 'antd';
import styles from './index.less';

interface ButtonProps {
    visible?: boolean;
    children?: any;
    type?: any;
    color?:string;
    disabled?:boolean;
    loading?:boolean;
    onClick?:any;
    rest?:any
}

export default function({ visible, children, type, color, disabled, loading, ...rest }: ButtonProps) {
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
