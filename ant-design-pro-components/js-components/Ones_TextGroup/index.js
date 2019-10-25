import React, { PureComponent } from 'react';
import { wordsFormat } from '@/utils/publicWord';
import { Ones_Row } from '@/components/Ones_Components';
import styles from './index.less'

export default class Ones_TextGroup extends PureComponent {
    render() {
        const { title, value, onClick, children, smallMargin, style, col, className, rowStyle, ...rest } = this.props;
        const colObj = col || (title ? [{ lg: 8 }, { lg: 16 }] : {});
        const css = style || {};
        return (
            <Ones_Row {...rest} col={colObj} style={rowStyle}>
                {
                    title &&
                    <div style={{ textAlign: "right", ...css }} className={[styles.textGroup, smallMargin ? styles.smallMargin : styles.largeStyle, className].join(" ")}>
                        {
                            onClick ?
                                <a onClick={onClick}>{wordsFormat(title)}</a> :
                                wordsFormat(title)
                        }
                    </div>
                }
                {children || <div className={[styles.textGroup, smallMargin ? styles.smallMargin : styles.largeStyle].join(" ")} style={css}>{value}</div>}
            </Ones_Row>
        )
    }
}
