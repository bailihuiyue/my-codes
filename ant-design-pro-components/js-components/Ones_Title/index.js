import React, { PureComponent } from 'react';
import styles from './index.less';
import { wordsFormat } from '@/utils/publicWord';

export default class Ones_Title extends PureComponent {

    render() {
        const { title, center, noWordsFormat, noMarginBottom, children, ...rest } = this.props;
        const pageHeader = (
            <div
                className={[
                    styles.headerWrap,
                    center ? styles.center : "",
                    noMarginBottom ? styles.noMarginBottom : ""
                ].join(" ")}
                {...rest}
            >
                {
                    (typeof title === 'string' ? [title] : title).map((item, index) => <div className={styles.headerItem} key={index}>{noWordsFormat ? item : wordsFormat(item)}</div>)
                }
                <span style={{ marginRight: "5px" }}>{children}</span>
            </div>
        )
        return pageHeader;
    }
}