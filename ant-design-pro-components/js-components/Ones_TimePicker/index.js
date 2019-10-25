import { TimePicker } from 'antd';
import moment from 'moment';

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
                    title.map((item, index) => <div className={styles.headerItem} key={index}>{noWordsFormat ? item : wordsFormat(item)}</div>)
                }
                {children}
            </div>
        )
        return pageHeader;
    }
}